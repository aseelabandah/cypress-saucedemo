class CheckoutPage {
  fillInfo(first, last, zip) {
    cy.get('[data-test="firstName"]').clear().type(first)
    cy.get('[data-test="lastName"]').clear().type(last)
    cy.get('[data-test="postalCode"]').clear().type(zip)
  }

  continue() {
    cy.get('[data-test="continue"]').click()
  }

  finish() {
    cy.get('[data-test="finish"]').click()
  }

  backHome() {
    cy.get('[data-test="back-to-products"]').click()
  }

  overviewTotals() {
    return {
      itemTotal: cy.get('.summary_subtotal_label'),
      tax: cy.get('.summary_tax_label'),
      total: cy.get('.summary_total_label')
    }
  }

  completeHeader() {
    return cy.get('.complete-header')
  }
}

export default new CheckoutPage()
