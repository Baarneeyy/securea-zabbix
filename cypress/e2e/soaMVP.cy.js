describe('opens SOA view', () => {
    it('detes matching; report generation', () => {
        cy.login('QA_user', 'zIaNuhpGz8uxZRazhSCU')
        cy.wait(750)
        cy.get('body').then($body => {
            if ($body.find('.Vue-Toastification__close-button').length > 0) {  // create a command out of this
                cy.get('.Vue-Toastification__close-button').click()
            }
        })
        cy.switchTenant('Demo Company')
        cy.wait(750)
        cy.openManagement('Compliance Management', 'Regulations')
        cy.wait(1500)
        cy.get(':nth-child(1) > :nth-child(3) > .overflow-hidden').invoke('text').then((text) => {
            cy.get(':nth-child(1) > :nth-child(2) > .overflow-hidden').click()
            cy.wait(1000)
            cy.contains('Generate Report').click()
            cy.wait(250)
            cy.get('.Vue-Toastification__toast-component-body > .flex > p').should('contain', 'Generated Successfully')
            cy.get('[data-v-81ad1337=""][data-v-0816b048=""] > .wrapper > .wrapper__header > .mr-1 > span').should('contain', text)
            cy.wait(250)
            cy.get('.Vue-Toastification__close-button').click()
            cy.wait(250)
            cy.contains('SOA View').click()
            cy.wait(1500)
            cy.contains('Clauses').click()
            cy.url().should('contain', 'soa')
        })
    })
})