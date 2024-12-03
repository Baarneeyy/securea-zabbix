const { describe } = require("mocha")

describe("Change the Table Setting Cookies Risk Management >> Asset Browser", { testIsolation: true }, () => {
    it("Setup test user and hide Threat Count column", () => {
        cy.setupUser('admin', 'TotoUrciteNiejeHesl0?!', 'tomas_workflow_tests', 'Management', 'Risk Management', 'Asset Browser')
        cy.get('.wrapper__header >', {timeout:8000}).should('have.length', 4)
        // Open column visibility menu
        cy.get(".sticky").click()
        // Click the Threat Count selector
        cy.get(':nth-child(3) > .px-3 > .w-full').click()
        // Refresh the page
        cy.reload()
        // Check that the Threat Count column is not visible
        // Open Asset Browser
        cy.get('[data-cy="menu_management"] > .flex').click()
        cy.wait(1000)
        cy.get('.bg-black-200').click()
        cy.get('.wrapper__header >', {timeout:8000}).should('have.length', 4)
        // Verify that the column 'TC' exists in the table
        cy.get('.wrapper').should('not.contain', 'TC')
    })
    it("Check table settings", () => {
        cy.clearCookies()
        cy.clearAllCookies()
        cy.setupUser('admin', 'TotoUrciteNiejeHesl0?!', 'tomas_workflow_tests', 'Management', 'Risk Management', 'Asset Browser')
        cy.get('.wrapper__header >', {timeout:8000}).should('have.length', 4)
        // Verify default settings restored
        cy.get(".wrapper").should("contain", "TC")
    })
})


describe("Change the Table Setting Cookies BCM >> Business Processes", { testIsolation: true }, () => {
    it("Setup test user and hide Asset Count column", () => {
        cy.login('admin', 'TotoUrciteNiejeHesl0?!')
        cy.switchTenant('tomas_workflow_tests')
        // Open Business Processes
        cy.get('[data-cy="menu_management"] > .flex').click()
        cy.wait(1000)
        cy.get('.dropdown__link-holder > [data-cy="menu_bcm"]').click()
        cy.wait(1000)
        cy.get('.dropdown__active').click()
        cy.get('.wrapper__header >', {timeout:8000}).should('have.length', 4)
        // Open column visibility menu
        cy.get(".sticky").click()
        // Click Asset Count selector
        cy.get(':nth-child(3) > .px-3').click()
        // Refresh the page
        cy.reload()
        // Check that the Asset Count column is not visible
        // Open Business Processes
        cy.get('[data-cy="menu_management"] > .flex').click()
        cy.wait(1000)
        cy.get('.dropdown__active').click()
        cy.wait(1000)
        cy.get('.bg-black-200').click()
        cy.get('.wrapper__header >', {timeout:8000}).should('have.length', 4)
        // Verify that the column 'AC' exists in the table
        cy.get('.wrapper').should('not.contain', 'AC')
    })
    it("Check table settings", () => {
        cy.clearCookies()
        cy.clearAllCookies()
        cy.login('admin', 'TotoUrciteNiejeHesl0?!')
        cy.switchTenant('tomas_workflow_tests')
        // Open Business Processes
        cy.get('[data-cy="menu_management"] > .flex').click()
        cy.wait(1000)
        cy.get('.dropdown__link-holder > [data-cy="menu_bcm"]').click()
        cy.wait(1000)
        cy.get('.dropdown__active').click()
        cy.get('.wrapper__header >', {timeout:8000}).should('have.length', 4)
        // Verify default settings restored
        cy.get(".wrapper").should("contain", "AC")
    })
})


describe("Change the Table Setting Risk Management >> Control Browser", { testIsolation: true }, () => {
    it("Setup test user and hide Threat Count column", () => {
        cy.setupUser('admin', 'TotoUrciteNiejeHesl0?!', 'tomas_workflow_tests', 'Management', 'Risk Management', 'Control Browser')
        cy.get('.wrapper__header >', {timeout:8000}).should('have.length', 4)
        // Open column visibility menu
        cy.get(".sticky").click()
        // Click Threat Count selector
        cy.get(':nth-child(3) > .px-3').click()
        // Refresh the page
        cy.reload()
        // Check that the Threat Count column is not visible
        // Open Control Browser
        cy.get('[data-cy="menu_management"] > .flex').click()
        cy.wait(1000)
        cy.get('[href="#/t/1/control-browser"] > p').click()
        cy.get('.wrapper__header >', {timeout:8000}).should('have.length', 4)
        // Verify that the column 'TC' exists in the table
        cy.get('.wrapper').should('not.contain', 'TC')
    })
    it("Check table settings", () => {
        cy.clearCookies()
        cy.clearAllCookies()
        cy.login('admin', 'TotoUrciteNiejeHesl0?!')
        cy.switchTenant('tomas_workflow_tests')
        // Open Control Browser
        cy.openManagement('Management', 'Risk Management', 'Control Browser')
        cy.get('.wrapper__header >', {timeout:8000}).should('have.length', 5)
        // Verify default settings restored
        cy.get(".wrapper").should("contain", "TC")
    })
})


describe("Change the Table Setting Risk Management >> Threat Browser", { testIsolation: true }, () => {
    it("Setup test user and hide Asset Count column", () => {
        cy.setupUser('admin', 'TotoUrciteNiejeHesl0?!', 'tomas_workflow_tests', 'Management', 'Risk Management', 'Threat Browser')
        cy.get('.wrapper__header >', {timeout:8000}).should('have.length', 4)
        // Open column visibility menu
        cy.get(".sticky").click()
        // Click Threat Count selector
        cy.get(':nth-child(3) > .px-3').click()
        // Refresh the page
        cy.reload()
        // Check that the Asset Count column is not visible
        // Open Threat Browser
        cy.get('[data-cy="menu_management"] > .flex').click()
        cy.wait(1000)
        cy.get('[href="#/t/1/threat-browser"] > p').click()
        cy.get('.wrapper__header >', {timeout:8000}).should('have.length', 4)
        // Verify that the column 'AC' exists in the table
        cy.get('.wrapper p') // Get all `<p>` elements in `.wrapper`
            .filter((index, el) => el.textContent.trim() === 'AC')
            .should('not.exist');

    })
    it("Check table settings", () => {
        cy.clearCookies()
        cy.clearAllCookies()
        cy.login('admin', 'TotoUrciteNiejeHesl0?!')
        cy.switchTenant('tomas_workflow_tests')
        // Open Threat Browser
        cy.openManagement('Management', 'Risk Management', 'Threat Browser')
        cy.get('.wrapper__header >', {timeout:8000}).should('have.length', 4)
        // Verify default settings restored
        cy.get(".wrapper").should("contain", "AC")
    })
})