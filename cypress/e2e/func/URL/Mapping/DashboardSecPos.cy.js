describe('Login and switch tenant', { testIsolation: false }, () =>{
    it('login', () => {
        cy.clearCookies()
// Open preprod and login
        cy.setupUser1(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'demoTestingZ', 'Dashboard')
        cy.wait(250)
        //cy.get('.wrapper__header >', {timeout:8000}).should('have.length', '4')
    })
})

describe('Check Dashboard Mapping', { testIsolation: false }, () => {
    it('Opens and checks Highest Risk Assets browser', () => {
// Open Dashboard
        let good_url = 't/51/dashboard'
        cy.url().should('contain', good_url)
// Open Highest Risk Assets browser
        cy.get('[gs-x="0"] > .grid-stack-item-content > .widget-wrapper > .widget-wrapper__header > .widget-wrapper__header__toolbar > :nth-child(2) > a').click()
        good_url = 't/51/asset-browser'
        cy.url().should('contain', good_url)
// Go back using cy.go('back')
        cy.go('back')
        good_url = 't/51/dashboard'
        cy.url().should('contain', good_url)
    })
    it('Checks Highest Threats browser', () => {
// Open Highest Threats browser
        cy.get('[gs-x="4"] > .grid-stack-item-content > .widget-wrapper > .widget-wrapper__header > .widget-wrapper__header__toolbar > :nth-child(2) > a').click()
        let good_url = 't/51/threat-browser'
        cy.url().should('contain', good_url)
// Go back using cy.go('back')
        cy.go('back')
        good_url = '/t/51/dashboard'
        cy.url().should('contain', good_url)
    })
})

describe('Check Security Posture Mapping', { testIsolation: false }, () => {
    it('Opens and checks Security Posture Controls', () => {
// Open Security Requirements Fulfillment browser
        cy.get('[data-cy="menu_securityposture"] > .flex').click()
        cy.get('.dropdown__sub-category-link').click()
        cy.wait(1500)
        cy.get('[data-v-88beb4b6=""] > .dropdown').click()
        let good_url = 't/51/requirement-fulfillment'
        cy.url().should('contain', good_url)
// Open one asset
        cy.get('.transition', {timeout:12000}).should('not.exist')
        cy.get(':nth-child(1) > :nth-child(2) > .overflow-hidden').click()
        good_url = 't/51/requirement-fulfillment/1'
        cy.url().should('contain', good_url)
// Open and check Controls browser
        cy.get(':nth-child(3) > .splitpanes > :nth-child(1) > :nth-child(1) > :nth-child(1)').children().last().click()
        good_url = 't/51/mapping/requirement-control/1'
        cy.url().should('contain', good_url)
// Go using cy.go('back')
        cy.go('back')
        good_url = 't/51/requirement-fulfillment/1'
        cy.url().should('contain', good_url)       
// Go back using breadcrubs
        cy.get('.flex-wrap > :nth-child(3) > .flex').click()
        good_url = 't/51/requirement-fulfillment/1'
        cy.url().should('contain', good_url)
    })
    it('Checks Security Posture Clauses', () => {
        cy.wait(1000)
// Open Clauses
        cy.get(':nth-child(3) > .wrapper > .wrapper__header').children().last().click()
        let good_url = 't/51/regulation'
        cy.url().should('contain', good_url)
// Go back using cy.go('back')
        cy.go('back')
        good_url = 't/51/requirement-fulfillment/1'
        cy.url().should('contain', good_url)
    })
    it('Security Posture Governing Documentation ', () => {
// Open Governing Documentation
        cy.get(':nth-child(5) > .wrapper > .wrapper__header > .p-button').click()
        let good_url = 't/51/mapping/requirement-governing_document/1'
        cy.url().should('contain', good_url)
// Go back using cy.go('back')
        cy.go('back')
        good_url = 't/51/requirement-fulfillment/1'
        cy.url().should('contain', good_url)
    })
})