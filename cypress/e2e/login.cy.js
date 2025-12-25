import LoginPage from '../pages/LoginPage.js'
import InventoryPage from '../pages/InventoryPage.js'

describe('Login', () => {
  beforeEach(() => {
    LoginPage.visit()
  })

  it('TC01: success with valid credentials', () => {
    cy.fixture('users').then(({ valid }) => {
      cy.login(valid.username, valid.password)

      cy.url().should('include', '/inventory.html')
      InventoryPage.productGrid().should('be.visible')
      InventoryPage.title().should('have.text', 'Products')
    })
  })

  it('TC02: failure with invalid credentials (negative)', () => {
    cy.fixture('users').then(({ invalid }) => {
      LoginPage.fillUsername(invalid.username)
      LoginPage.fillPassword(invalid.password)
      LoginPage.submit()

      LoginPage.getError().should('be.visible')
      cy.url().should('not.include', '/inventory.html')
      LoginPage.getError().should('contain.text', 'Username and password do not match')
    })
  })
})
