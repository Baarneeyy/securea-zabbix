describe('Security Posture', () => {
    it('Creates test requirement', () => {
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'tomas_workflow_tests', 'Tenant', 'Configuration', 'Security Requirements Catalogue')
        cy.wait(250)
        cy.get('.wrapper__header >', {timeout:8000}).should('have.length', 4)

        //Creation
        cy.get('[data-cy="assetBrowser_add"]').click()
        cy.wait(250)
        cy.get('.wrapper__header >').should('have.length', 4)
        cy.get('.field--hidden > .p-inputtext').click().type('testing mapping')
        cy.get(':nth-child(2) > .p-inputtextarea').click().type('testing source')
        cy.get(':nth-child(3) > .p-inputtextarea').click().type('testing description')
        cy.get('[data-cy="assetBrowser_create"]').click()

        //PostCreate asssertions
        cy.get('.Vue-Toastification__toast-body', {timeout:8000}).should('exist')
        cy.get('.field--hidden > .field__value').should('contain', 'testing mapping')
        cy.get(':nth-child(2) > .field__value').should('contain', 'testing source')
        cy.get(':nth-child(3) > .field__value').should('contain', 'testing description')
    })

    it('Requirement-control mapping', () => {
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'tomas_workflow_tests', 'Security Posture', 'Configuration', 'Security Requirements Catalogue')
        cy.wait(250)
        cy.get('.wrapper__header >', {timeout:12000}).should('have.length', 4)

        cy.get('.list__body-elem').last().click({force:true})
        cy.get('.wrapper__header').eq(1).children().last().click()

        cy.get('.mt-4').should('exist')
        cy.get('.mt-4', {timeout:10000}).should('not.exist')

        for (let i = 0; i < 5; i++) {
            cy.get(`:nth-child(${i+1}) > :nth-child(5) > .flex > .checkbox-style`)
                .click()

            cy.get(`:nth-child(${i+1}) > :nth-child(6) > .w-full`).click().type('testing mapping description')
        }
        
        cy.get('.primary-btn').click()
        cy.get('.Vue-Toastification__toast-body', {timeout:8000}).should('exist')



        cy.go(-1)
        cy.wait(1000)
        cy.get('.list__body').eq(1).children().should('have.length', 5)
    })

    it('Requirement-GovDoc mapping', () => {
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'tomas_workflow_tests', 'Security Posture', 'Configuration', 'Security Requirements Catalogue')
        cy.wait(250)
        cy.get('.wrapper__header >', {timeout:12000}).should('have.length', 4)

        cy.get('.list__body-elem').last().click({force:true})
        cy.wait(500)
        cy.get('.wrapper__header').eq(4).children().last().click()
        
        cy.get('.mt-4').should('exist')
        cy.get('.mt-4', {timeout:8000}).should('not.exist')

        cy.get(':nth-child(1) > .text-center > .flex > .checkbox-style').click()

        cy.get('.primary-btn').click()
        cy.get('.Vue-Toastification__toast-body', {timeout:8000}).should('exist')

        cy.go(-1)
        cy.wait(1000)
        cy.get('.list__body').eq(4).children().should('have.length', 1)

    })

    it('Clause-Requirement mapping', () => {
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'tomas_workflow_tests', 'Tenant', 'Configuration', 'Regulation Catalogue')
        cy.wait(250)
        cy.get('.wrapper__header >', {timeout:12000}).should('have.length', 4)

        cy.get('.list__body-elem').first().click()
        cy.get('.list__body').should('have.length', 2)

        cy.get('.list__body').last().children().first().click()
        cy.get('.transition').should('exist')
        cy.get('.transition').should('not.exist', {timeout:8000})

        cy.get('.list__body').first().children().last().children().eq(4).click({force:true})
        cy.get('.list__body-elem--select > :nth-child(5) > .checkbox-style').click({force:true})

        cy.get('.primary-btn').click()

        cy.openManagement('Security Posture', 'bum', 'bum')
        
        cy.get('.transition').should('exist')
        cy.get('.transition', {timeout:16000}).should('not.exist')
        cy.get('.list__body-elem').last().click({force:true})
        cy.wait(500)

        cy.get('.list__body').eq(3).children().should('have.length', 1)

    })

    it('Requirement Cleanup', () => {
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'tomas_workflow_tests', 'Tenant', 'Configuration', 'Security Requirements Catalogue')
        cy.wait(250)
        cy.get('.wrapper__header >', {timeout:8000}).should('have.length', 4)

        cy.deleteDataEntry('testing mapping')
    })
})