import InventoryPage from '../pages/InventoryPage.js'
import CartPage from '../pages/CartPage.js'

describe('Cart operations (TC04–TC06)', () => {
  beforeEach(() => {
    // login as standard user
    cy.fixture('users').then(({ valid }) => {
      cy.login(valid.username, valid.password)
    })
    cy.url().should('include', '/inventory.html')
  })

  it('TC04: Add to Cart single item + verify cart', () => {
    const item = 'Sauce Labs Backpack'
    InventoryPage.addToCartByName(item)
    InventoryPage.cartBadge().should('have.text', '1')

    InventoryPage.goToCart()
    cy.url().should('include', '/cart.html')
    CartPage.itemNames().should('contain.text', item)

    // Back, ensure button toggled to Remove
    cy.go('back')
    cy.contains('.inventory_item', item).within(() => {
      cy.contains('button', 'Remove').should('be.visible')
    })
  })

  it('TC05: Remove Item from Cart', () => {
    const item = 'Sauce Labs Backpack'
    InventoryPage.addToCartByName(item)
    InventoryPage.removeByName(item)

    // badge disappears when 0 items
    InventoryPage.cartBadge().should('not.exist')

    InventoryPage.goToCart()
    CartPage.items().should('have.length', 0)

    // back on inventory, button returns to Add to cart
    cy.go('back')
    cy.contains('.inventory_item', item).within(() => {
      cy.contains('button', 'Add to cart').should('be.visible')
    })
  })

  it('TC06: Add multiple items + verify counts', () => {
    const items = ['Sauce Labs Backpack', 'Sauce Labs Bike Light', 'Sauce Labs Bolt T-Shirt']
    items.forEach((name) => InventoryPage.addToCartByName(name))
    InventoryPage.cartBadge().should('have.text', String(items.length))

    InventoryPage.goToCart()
    CartPage.itemNames().then(($names) => {
      const texts = [...$names].map(n => n.innerText.trim())
      items.forEach((i) => expect(texts).to.include(i))
      expect(texts).to.have.length(items.length)
    })
  })
})
