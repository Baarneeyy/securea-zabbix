const { describe } = require("mocha")

describe("Change the Table Setting Cookies", { testIsolation: false }, () => {
    it("Login", () => {
        cy.clearCookies()
        // Open preprod and login
        cy.login("admin", "TotoUrciteNiejeHesl0?!")
        cy.wait(1000)
    })
    it("Switch Tenant", () => {
        // Switch Tenant
        cy.get(":nth-child(2) > .dropdown > .dropdown-toggle").click()
        cy.get(".filter-input").type("tomas_workflow_tests")
        cy.get(".option-item > .flex").click()
        cy.wait(1000)
    })
    it("Open Asset Browser", () => {
        cy.get('[data-cy="menu_management"] > .flex').click()
        cy.get('.dropdown__link-holder > [data-cy="menu_riskmanagement"]').click()
        cy.get('[href="#/t/1/asset-browser"] > p > span').click()
    })
    it("Change Column Visibility", () => {
        // Open column visibility menu
        cy.get(".sticky").click()
        // Click the Threat Count selector
        cy.get(':nth-child(3) > .px-3 > .w-full').click()
        // Refresh the page
        cy.reload()
    })
})

describe('Verify Column Visibility via Wrapper', { testIsolation: false }, () => {
    it("Open Asset Browser", () => {
        cy.get('[data-cy="menu_management"] > .flex').click()
        cy.get('.dropdown__link-holder > [data-cy="menu_riskmanagement"]').click()
        cy.get('[href="#/t/1/asset-browser"] > p > span').click()
    })
    it('Check if ThCnt is hidden in the table', () => {
        // Verify that the column 'ThCnt' exists in the table
        cy.get('.wrapper').should('not.contain', 'ThCnt')
    })
})


describe('Clear cookies and check the table column settings', { testIsolation: true }, () => {
    it("Check table settings", () => {
        cy.clearCookies()
        // Open preprod and login
        cy.login("admin", "TotoUrciteNiejeHesl0?!", false)
        cy.wait(1000)
        // Switch Tenant
        cy.get(":nth-child(2) > .dropdown > .dropdown-toggle").click()
        cy.get(".filter-input").type("tomas_workflow_tests")
        cy.get(".option-item > .flex").click()
        cy.wait(1000)
        cy.get('[data-cy="menu_management"] > .flex').click()
        cy.get('.dropdown__link-holder > [data-cy="menu_riskmanagement"]').click()
        cy.get('[href="#/t/1/asset-browser"] > p > span').click()
        cy.wait(1000)
        // Verify default settings restored
        cy.get(".wrapper").should("contain", "ThCnt")
    })
})