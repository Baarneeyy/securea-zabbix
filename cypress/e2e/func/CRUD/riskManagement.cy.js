describe('Risk Management', () => {
    it('Asset Browser', () => {
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'tomas_workflow_tests', 'Management', 'Risk Management', 'Asset Browser')
        cy.wait(500)
        
        //PreCreation
        cy.contains('Add').should('exist').click()
        cy.wait(750)
        cy.get('.field--hidden > .p-inputtext').click().type('testingAddition')
        cy.get(':nth-child(2) > .p-inputtextarea').click().type('testing description')
        cy.get('.p-dropdown').first().click()
        cy.wait(500)
        cy.get('.p-dropdown-item').first().click()
        cy.get('.p-inputnumber > .p-inputtext').click().type('3')
        cy.get(':nth-child(5) > .p-inputtextarea').click().type('testing detail')

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
        cy.get('.field--hidden > .p-inputtext').click().type('++')
        cy.get(':nth-child(2) > .p-inputtextarea').click().type('++')
        cy.get('.p-dropdown').first().click()
        cy.wait(500)
        cy.get('.p-dropdown-item').eq(1).click()
        cy.get('.p-inputnumber > .p-inputtext').click().type('4')
        cy.get(':nth-child(5) > .p-inputtextarea').click().type('++')

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
        //cy.deleteDataEntry('testingAddition')

    })

    it('Threat Browser', () => {
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'tomas_workflow_tests', 'Management', 'Risk Management', 'Threat Browser')
        cy.wait(500)

        //Creation
        
        //////////////IMPORTANT
        cy.get('.wrapper__header > ').should('have.length', '4', {timeout:8000})
        //////////////////
        cy.contains('Add').should('exist').click()
        cy.wait(250)
        cy.get('.field--hidden > .p-inputtext').click().type('testingAddition')
        cy.get('.\\!grid > :nth-child(2) > .p-inputtext').click().type('testing type')
        cy.get('.p-inputtextarea').click().type('testing description')
        cy.get('.p-inputnumber > .p-inputtext').click().type('3')

        cy.get('[data-cy="assetBrowser_create"]').click({force:true})
        cy.get('.Vue-Toastification__toast').should('exist', {timeout:8000})
        cy.wait(250)

        //PostCreate assertions
        cy.get('.field--hidden > .field__value').should('contain', 'testingAddition')
        cy.get(':nth-child(2) > .field__value').should('contain', 'testing type')
        cy.get(':nth-child(3) > .field__value').should('contain', 'testing description')
        cy.get('[style="grid-column: span 1 / auto;"] > .field__value').should('contain', '3')

        //Edit test
        cy.get('.toolbar > :nth-child(1)').click({force:true})
        cy.get('.field--hidden > .p-inputtext').click().type('++')
        cy.get('.\\!grid > :nth-child(2) > .p-inputtext').click().type('++')
        cy.get('.p-inputtextarea').click().type('++')
        cy.get('.p-inputnumber > .p-inputtext').click().type('4')
        cy.contains('Save').click({force:true})
        cy.get('.Vue-Toastification__toast').should('exist', {timeout:8000})
        cy.wait(250)

        //PostEdit assertions
        cy.get('.field--hidden > .field__value').should('contain', '++')
        cy.get(':nth-child(2) > .field__value').should('contain', '++')
        cy.get(':nth-child(3) > .field__value').should('contain', '++')
        cy.get('[style="grid-column: span 1 / auto;"] > .field__value').should('contain', '4')

        //Deletion of Asset
        cy.deleteDataEntry('testingAddition')
    })

    it('Control Browser', () => {
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'tomas_workflow_tests', 'Management', 'Risk Management', 'Control Browser')
        cy.wait(500)
        //////////////IMPORTANT cy.get('.wrapper__header > ').should('have.length', '4')
        cy.waitUntil(() => Cypress.$('.wrapper__header').children().length === 4, {timeout:14000})
        ////////////////
        cy.contains('Add').should('exist').click()
        cy.wait(250)
        cy.get('.field--hidden > .p-inputtext').click().type('testingAddition')
        cy.get('.p-inputtextarea').click().type('testing description')
        cy.get('.p-inputnumber > .p-inputtext').click().type('3')
        cy.get('.p-inputtext').eq(4).click()
        cy.wait(750)
        cy.get('[aria-label="8"] > [draggable="false"]').click({force:true})
        cy.wait(250)

        cy.get('[data-cy="assetBrowser_create"] > .p-button-label').click()
        cy.get('.Vue-Toastification__toast').should('exist', {timeout:8000})
        cy.wait(250)

        //PostCreation assertions
        cy.get('.field--hidden > .field__value').should('contain', 'testingAddition')
        cy.get(':nth-child(2) > .field__value').should('contain', 'testing description')
        cy.get(':nth-child(3) > .field__value').should('contain', '3')
        cy.get(':nth-child(4) > .field__value').should('contain', '8')

        //Edit MISSING - review date
        cy.get('.toolbar > :nth-child(1)').click({force:true})
        cy.get('.field--hidden > .p-inputtext').click().type('++')
        cy.get('.p-inputtextarea').click().type('++')
        cy.get('.p-inputnumber > .p-inputtext').click().type('4')
        cy.contains('Save').click({force:true})
        cy.get('.Vue-Toastification__toast').should('exist', {timeout:8000})
        cy.wait(250)

        //PostEdit assertions
        cy.get('.field--hidden > .field__value').should('contain', '++')
        cy.get(':nth-child(2) > .field__value').should('contain', '++')
        cy.get(':nth-child(3) > .field__value').should('contain', '4')

        //Deletion of Asset
        cy.deleteDataEntry('testingAddition')
    })

    it('Risk Register', () => {
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'tomas_workflow_tests', 'Management', 'Risk Management', 'Risk Report')
        cy.wait(500)
        cy.get('.list__body-elem').last().click()
        cy.wait(500)

        //Risk Creation
        cy.get('.p-dropdown-label').click()
        cy.wait(750)
        cy.get('.p-dropdown-item-label').first().click()
        cy.get(':nth-child(2) > .p-inputtextarea').click().type('testing description')
        cy.get(':nth-child(3) > .p-inputtextarea').click().type('testing treatment strategy')
        cy.get(':nth-child(4) > .p-inputtextarea').click().type('testing detail')
        cy.get(':nth-child(5) > .p-inputtextarea').click().type('testing acceptance')
        
        cy.get('.splitpanes__pane.h-full > .flex > .p-button > .p-button-label').should('exist').click()
        cy.get('.Vue-Toastification__toast-body').should('exist', {timeout:8000})
        cy.get('header > button').first().click()

        cy.wait(250)
        cy.get('.list__body-elem').last().click()
        cy.wait(250)

        cy.get('.p-dropdown-label > span').should('contain', 'Jane Doe')
        cy.get(':nth-child(2) > .p-inputtextarea')
            .invoke('val').then((text) => {
                expect(text).to.contain('testing description')
            })
        
        cy.get(':nth-child(3) > .p-inputtextarea')
            .invoke('val').then((text) => {
                expect(text).to.contain('testing treatment strategy')
            })
        
        cy.get(':nth-child(4) > .p-inputtextarea')
            .invoke('val').then((text) => {
                expect(text).to.contain('testing detail')
            })

        cy.get(':nth-child(5) > .p-inputtextarea')
            .invoke('val').then((text) => {
                expect(text).to.contain('testing acceptance')
            })
        
    })

    it('Risk Register Cleanup', () => {
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'tomas_workflow_tests', 'Management', 'Risk Management', 'Asset Browser')
        cy.wait(500)
        cy.deleteDataEntry('testingAddition++')
    })
})