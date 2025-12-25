import InventoryPage from '../pages/InventoryPage.js'

describe('Inventory sorting (TC03)', () => {
  beforeEach(() => {
    cy.fixture('users').then(({ valid }) => {
      cy.login(valid.username, valid.password)
    })
    cy.url().should('include', '/inventory.html')
  })

  const assertSorted = (selector, comparator) => {
    cy.get(selector).then(($els) => {
      const values = [...$els].map(el => el.innerText.trim())
      const sorted = [...values].sort(comparator)
      expect(values, 'list is sorted as expected').to.deep.equal(sorted)
    })
  }

  it('Name (A to Z)', () => {
    InventoryPage.sortSelect().select('Name (A to Z)')
    assertSorted('.inventory_item_name', (a, b) => a.localeCompare(b))
  })

  it('Name (Z to A)', () => {
    InventoryPage.sortSelect().select('Name (Z to A)')
    assertSorted('.inventory_item_name', (a, b) => b.localeCompare(a))
  })

  it('Price (low to high)', () => {
    InventoryPage.sortSelect().select('Price (low to high)')
    cy.get('.inventory_item_price').then(($els) => {
      const nums = [...$els].map(el => Number(el.innerText.replace('$','')))
      const sorted = [...nums].sort((a,b) => a - b)
      expect(nums).to.deep.equal(sorted)
    })
  })

  it('Price (high to low)', () => {
    InventoryPage.sortSelect().select('Price (high to low)')
    cy.get('.inventory_item_price').then(($els) => {
      const nums = [...$els].map(el => Number(el.innerText.replace('$','')))
      const sorted = [...nums].sort((a,b) => b - a)
      expect(nums).to.deep.equal(sorted)
    })
  })
})
