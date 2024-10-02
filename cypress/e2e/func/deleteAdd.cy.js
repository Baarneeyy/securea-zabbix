describe('Checks CRUD ability ', () => {
    it('Management', () => {
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'tomas_workflow_tests', 'Management', 'Risk Management', 'Asset Browser')
        cy.wait(500)
        
        //Asset Browser
        cy.contains('Add').should('exist').click()
        cy.get('.field--hidden > .p-inputtext').type('testingAddition', {delay:100})
        cy.get(':nth-child(2) > .p-inputtextarea').type('testing description')
        cy.get('.p-dropdown').first().click()
        cy.wait(500)
        cy.get('.p-dropdown-item').first().click()
        cy.get('.p-inputnumber > .p-inputtext').type('3')
        cy.get(':nth-child(5) > .p-inputtextarea').type('testing detail')

        for (let i = 1; i < 6; i++) {
            cy.get('.p-dropdown').eq(i).click()
            cy.wait(250)
            cy.get('.p-dropdown-item').first().click()
            cy.wait(250)
        }
        cy.get('[data-cy="assetBrowser_create"]').click({force:true})
        cy.get('.Vue-Toastification__toast').should('exist', {timeout:8000})
        cy.wait(250)

        //PostCreate assertions
        cy.get('.field--hidden > .field__value').should('contain', 'testingAddition')
        cy.get(':nth-child(2) > .field__value').should('contain', 'testing description')
        cy.get(':nth-child(4) > .field__value').should('contain', '3')
        cy.get(':nth-child(5) > .field__value').should('contain', 'testing detail')
        
        //Edit test
        cy.get('.toolbar > :nth-child(1)').click({force:true})
        cy.get('.field--hidden > .p-inputtext').type('++')
        cy.get(':nth-child(2) > .p-inputtextarea').type('++')
        cy.get('.p-dropdown').first().click()
        cy.wait(500)
        cy.get('.p-dropdown-item').eq(1).click()
        cy.get('.p-inputnumber > .p-inputtext').type('4')
        cy.get(':nth-child(5) > .p-inputtextarea').type('++')

        for (let i = 1; i < 6; i++) {
            cy.get('.p-dropdown').eq(i).click()
            cy.wait(250)
            cy.get('.p-dropdown-item').eq(1).click()
            cy.wait(250)
        }

        cy.contains('Save').click({force:true})
        cy.get('.Vue-Toastification__toast').should('exist', {timeout:8000})
        cy.wait(250)

        //PostEdit assertions
        cy.get('.field--hidden > .field__value').should('contain', '++')
        cy.get(':nth-child(2) > .field__value').should('contain', '++')
        cy.get(':nth-child(4) > .field__value').should('contain', '34')
        cy.get(':nth-child(5) > .field__value').should('contain', '++')

        //Deletion of Asset
        cy.deleteDataEntry('testingAddition')

    })
})
