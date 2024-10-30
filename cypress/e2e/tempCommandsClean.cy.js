describe('Adding new asset and populating the data', () => {
    it('adds a new asset with pre-made data', () => {
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'tomas_workflow_tests', 'Management', 'Risk Management', 'Asset Browser')
        cy.wait(250)
        cy.get('.transition', {timeout:8000}).should('not.exist')
        cy.get('.wrapper__header >', {timeout:8000}).should('have.length', 4)

        cy.get('.list__body >').its('length').then((length) => {
            cy.get('.text-base').should('contain', length)
        })

        cy.fillDataEntry('ZebyFunguje')

    })
})