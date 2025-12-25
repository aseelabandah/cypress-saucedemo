class CartPage {
  items() { return cy.get('.cart_item') }
  itemNames() { return cy.get('.inventory_item_name') }
  itemPrices() { return cy.get('.inventory_item_price') }
  checkout() { cy.get('[data-test="checkout"]').click() }
}
export default new CartPage()
