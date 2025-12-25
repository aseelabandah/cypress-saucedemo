import InventoryPage from '../pages/InventoryPage.js'
import CartPage from '../pages/CartPage.js'
import CheckoutPage from '../pages/CheckoutPage.js'

describe('Checkout Flow (TC07–TC08)', () => {
  beforeEach(() => {
    // login
    cy.fixture('users').then(({ valid }) => {
      cy.login(valid.username, valid.password)
    })

    // add at least 1 item to the cart
    InventoryPage.addToCartByName('Sauce Labs Backpack')
    InventoryPage.goToCart()
  })

  it('TC07: Checkout information & overview page', () => {
    CartPage.checkout()

    CheckoutPage.fillInfo('Aseel', 'Abandah', '42103')
    CheckoutPage.continue()

    // Overview page
    cy.url().should('include', '/checkout-step-two.html')
    cy.get('.cart_item').should('have.length.greaterThan', 0)

    const totals = CheckoutPage.overviewTotals()
    totals.itemTotal.should('be.visible')
    totals.tax.should('be.visible')
    totals.total.should('be.visible')

    cy.get('[data-test="finish"]').should('be.visible')
  })

  it('TC08: Finish order successfully', () => {
    CartPage.checkout()

    CheckoutPage.fillInfo('Aseel', 'Abandah', '42103')
    CheckoutPage.continue()

    CheckoutPage.finish()

    CheckoutPage.completeHeader().should('contain.text', 'Thank you for your order!')
    cy.get('[data-test="back-to-products"]').should('be.visible')
  })
})
