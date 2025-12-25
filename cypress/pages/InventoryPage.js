class InventoryPage {
  title() { return cy.get('.title') }
  productGrid() { return cy.get('.inventory_list') }
  sortSelect() { return cy.get('[data-test="product-sort-container"]') }

  // cart helpers
  addToCartByName(name) {
    cy.contains('.inventory_item', name).within(() => {
      cy.contains('button', 'Add to cart').click()
    })
  }
  removeByName(name) {
    cy.contains('.inventory_item', name).within(() => {
      cy.contains('button', 'Remove').click()
    })
  }
  cartBadge() { return cy.get('.shopping_cart_badge') }
  goToCart() { cy.get('.shopping_cart_link').click() }
}
export default new InventoryPage()
