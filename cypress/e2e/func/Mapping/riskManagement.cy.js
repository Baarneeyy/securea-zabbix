describe.skip('Asset Browser', () => {
    it('Prep Mapping Asset', () => {
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'tomas_workflow_tests', 'Management', 'Risk Management', 'Asset Browser')
        cy.wait(500)

        cy.get('.list__body-elem').last().click({force:true})

        //PreCreation
        cy.contains('Add').should('exist').click()
        cy.wait(750)
        cy.get('.field--hidden > .p-inputtext').click().type('testingMapping')
        cy.get(':nth-child(2) > .p-inputtextarea').click().type('testing description')
        //cy.get('.p-dropdown').first().click()
        cy.wait(500)
        //cy.get('.p-dropdown-item').first().click()
        cy.get('.p-inputnumber > .p-inputtext').click().type('3')
        cy.get(':nth-child(5) > .p-inputtextarea').click().type('testing detail')

        for (let i = 6; i < 11; i++) {
            cy.get(`:nth-child(${i}) > .dropdown > .dropdown-toggle > .dropdown-text`)
                .click()
            cy.wait(250)
            cy.get('.option-item').first().click()
            cy.wait(250)
        }
        cy.get('[data-cy="assetBrowser_create"]').click({force:true})
        cy.get('.Vue-Toastification__toast').should('exist', {timeout:8000})
        cy.wait(250)

        //PostCreate assertions
        cy.get('.field--hidden > .field__value').should('contain', 'testingMapping')
        cy.get(':nth-child(2) > .field__value').should('contain', 'testing description')
        cy.get(':nth-child(3) > .field__value').should('contain', '3')
        cy.get(':nth-child(4) > .field__value').should('contain', 'testing detail')
    })

    it('Asset-BP mapping', () => {
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'tomas_workflow_tests', 'Management', 'Risk Management', 'Asset Browser')
        cy.wait(500)

        cy.get('.list__body-elem').last().click({force:true})
        cy.wait(500)
        cy.get(':nth-child(1) > .wrapper__header > a').click()

        cy.get('.mt-4').should('exist')
        cy.get('.mt-4').should('not.exist', {timeout:6000})

        for (let i = 1; i < 3; i++) {
            cy.get(`:nth-child(${i}) > :nth-child(3) > .flex > .checkbox-style`).click()
            cy.get(`:nth-child(${i}) > :nth-child(4) > .relative > .custom-spinner`).click()
                .type('{selectAll}{del}10')
            cy.get(`:nth-child(${i}) > :nth-child(5) > .w-full`).click().type('testing description')
            cy.wait(250)
        }

        cy.get('.primary-btn').click()
        cy.get('.Vue-Toastification__toast-body').should('exist')

        cy.wait(500)
        cy.go(-1)
        cy.get('.list__body').eq(1).children().should('have.length', 2)
    })

    it('Asset-Threat mapping', () => {
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'tomas_workflow_tests', 'Management', 'Risk Management', 'Asset Browser')
        cy.wait(500)

        cy.get('.list__body-elem').last().click({force:true})
        cy.wait(500)
        cy.get(':nth-child(3) > .wrapper__header > a').click()
        
        cy.get('.mt-4').should('exist')
        cy.get('.mt-4', {timeout:8000}).should('not.be.visible')

        for (let i = 1; i < 11; i++) {
            cy.get(`:nth-child(${i}) > :nth-child(4) > .flex > .checkbox-style`).click()
        }

        cy.get('.primary-btn').click()
        cy.get('.Vue-Toastification__toast-body').should('exist')

        cy.go(-1)
        cy.wait(500)

        cy.get('.list__body').eq(3).children().should('have.length', 10)
    })

    it('Asset-Control mapping', () => {
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'tomas_workflow_tests', 'Management', 'Risk Management', 'Asset Browser')
        cy.wait(500)

        cy.get('.list__body-elem').last().click({force:true})
        cy.wait(500)
        cy.get(':nth-child(2) > .wrapper__header > a').click()
        
        cy.get('.mt-4').should('exist')
        cy.get('.mt-4', {timeout:8000}).should('not.be.visible')

        for (let i = 1; i < 10; i++) {
            cy.get(`:nth-child(${i}) > :nth-child(5) > .gap-x-1 > .checkbox-style`).click()
        }

        cy.get('.primary-btn').click()
        cy.get('.Vue-Toastification__toast-body').should('exist')

        cy.go(-1)
        cy.wait(500)

        cy.get('.list__body').eq(2).children().should('have.length', 9)
    })

    it('Asset Cleanup', () => {
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'tomas_workflow_tests', 'Management', 'Risk Management', 'Asset Browser')
        cy.wait(500)

        cy.deleteDataEntry('testingMapping')
    })
})

describe.skip('Threat Browser', () => {
    it('Prep Mapping Threat', () => {
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'tomas_workflow_tests', 'Management', 'Risk Management', 'Threat Browser')
        cy.wait(500)

        //Creation
        
        //////////////IMPORTANT
        cy.get('.wrapper__header > ', {timeout:8000}).should('have.length', '4')
        //////////////////
        cy.contains('Add').should('exist').click()
        cy.wait(250)
        cy.get('.field--hidden > .p-inputtext').click().type('testingMapping')
        cy.get('.\\!grid > :nth-child(2) > .p-inputtext').click().type('testing type')
        cy.get('.p-inputtextarea').click().type('testing description')
        cy.get('.p-inputnumber > .p-inputtext').click().type('3')

        cy.get('[data-cy="assetBrowser_create"]').click({force:true})
        cy.get('.Vue-Toastification__toast').should('exist', {timeout:8000})
        cy.wait(250)

        //PostCreate assertions
        cy.get('.field--hidden > .field__value').should('contain', 'testingMapping')
        cy.get(':nth-child(2) > .field__value').should('contain', 'testing type')
        cy.get(':nth-child(3) > .field__value').should('contain', 'testing description')
        cy.get('[style="grid-column: span 1 / auto;"] > .field__value').should('contain', '3')
    })

    it('Threat-Asset Mapping', () => {
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'tomas_workflow_tests', 'Management', 'Risk Management', 'Threat Browser')
        cy.wait(500)

        cy.get('.list__body-elem').last().click({force:true})
        cy.wait(250)
        cy.get(':nth-child(1) > .wrapper__header > a > .p-button').click()

        cy.get('.mt-4').should('exist')
        cy.get('.mt-4', {timeout:8000}).should('not.exist')

        for (let i = 1; i < 11; i++) {
            cy.get(`:nth-child(${i}) > :nth-child(10) > .flex > .checkbox-style`).click()
        }

        cy.get('.primary-btn').click()
        cy.get('.Vue-Toastification__toast-body').should('exist')

        cy.go(-1)
        cy.wait(500)

        cy.get('.list__body').first().children().should('have.length', 10)

    })

    it('Threat-AssetClasses Mapping', () => {
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'tomas_workflow_tests', 'Management', 'Risk Management', 'Threat Browser')
        cy.wait(500)

        cy.get('.list__body-elem').last().click({force:true})
        cy.wait(250)
        cy.get(':nth-child(2) > .wrapper__header > a > .p-button').click()

        cy.get('.mt-4').should('exist')
        cy.get('.mt-4', {timeout:8000}).should('not.exist')

        for (let i = 1; i < 11; i++) {
            cy.get(`:nth-child(${i}) > :nth-child(3) > .flex > .checkbox-style`).click()
        }

        cy.get('.primary-btn').click()
        cy.get('.Vue-Toastification__toast-body').should('exist')

        cy.go(-1)
        cy.wait(1500)

        cy.get('.list__body').eq(2).children().should('have.length', 10)
    })

    it('Threat-Control Mapping', () => {
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'tomas_workflow_tests', 'Management', 'Risk Management', 'Threat Browser')
        cy.wait(500)

        cy.get('.list__body-elem').last().click({force:true})
        cy.wait(250)

        cy.get(':nth-child(3) > .wrapper__header > a > .p-button').click()

        cy.get('.mt-4').should('exist')
        cy.get('.mt-4', {timeout:8000}).should('not.exist')

        for (let i = 1; i < 11; i++) {
            cy.get(`:nth-child(${i}) > :nth-child(5) > .flex > .checkbox-style`).click()
        }

        cy.get('.primary-btn').click()

        cy.get('.Vue-Toastification__toast-body').should('exist')

        cy.go(-1)
        cy.wait(500)

        cy.get('.list__body').eq(3).children().should('have.length', 10)


    })

    it('Threat Cleanup', () => {
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'tomas_workflow_tests', 'Management', 'Risk Management', 'Threat Browser')
        cy.wait(500)
        
        cy.deleteDataEntry('testingMapping')
    })
})

describe('Control Browser', () => {
    it.skip('Prep Mapping Control', () => {
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'tomas_workflow_tests', 'Management', 'Risk Management', 'Control Browser')
        cy.wait(500)
        cy.get('.wrapper__header >', {timeout:18000}).should('have.length', 4)

        cy.contains('Add').should('exist').click()
        cy.wait(250)
        cy.get('.field--hidden > .p-inputtext').click().type('testingMapping')
        cy.get('.p-inputtextarea').click().type('testing description')
        cy.get('.p-inputnumber > .p-inputtext').click().type('3')

        cy.get('[data-cy="assetBrowser_create"] > .p-button-label').click()
        cy.get('.Vue-Toastification__toast').should('exist', {timeout:8000})
        cy.wait(250)

        //PostCreation assertions
        cy.get('.field--hidden > .field__value').should('contain', 'testingMapping')
        cy.get(':nth-child(2) > .field__value').should('contain', 'testing description')
        cy.get(':nth-child(3) > .field__value').should('contain', '3')
    })

    it.skip('Control-Asset Mapping', () => {
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'tomas_workflow_tests', 'Management', 'Risk Management', 'Control Browser')
        cy.wait(500)
        cy.get('.wrapper__header >', {timeout:18000}).should('have.length', 4)
        
        cy.get('.list__body-elem').last().click({force:true})
        cy.wait(500)

        cy.get(':nth-child(1) > .wrapper__header > a > .p-button').click()
        cy.get('.mt-4').should('exist')
        cy.get('.mt-4', {timeout:12000}).should('not.exist')

        for (let i = 1; i < 11; i++) {
            cy.get(`:nth-child(${i}) > :nth-child(10) > .gap-x-1 > .checkbox-style`).click()
        }

        cy.get('.primary-btn').click()
        cy.get('.Vue-Toastification__toast-body').should('exist')

        cy.go(-1)
        cy.wait(500)
        cy.get('.wrapper__header').first().children({timeout:20000}).should('have.length', 4)
        //cy.wait(1500)

        cy.get('.list__body').eq(1).children().should('have.length', 10)

    })

    it.skip('Control-Asset Class Mapping', () => {
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'tomas_workflow_tests', 'Management', 'Risk Management', 'Control Browser')
        cy.wait(500)
        cy.get('.wrapper__header >', {timeout:18000}).should('have.length', 4)

        cy.get('.list__body-elem').last().click({force:true})
        cy.wait(500)

        cy.get(':nth-child(2) > .wrapper__header > a > .p-button').click()
        cy.get('.mt-4').should('exist')
        cy.get('.mt-4', {timeout:20000}).should('not.exist')

        for (let i = 1; i < 11; i++) {
            cy.get(`:nth-child(${i}) > :nth-child(3) > .flex > .checkbox-style`).click()
        }

        cy.get('.primary-btn').click()
        cy.get('.Vue-Toastification__toast-body').should('exist')

        cy.go(-1)
        cy.wait(1500)
        cy.get('.wrapper__header').first().children({ timeout:24000 }).should('have.length', 4)

        cy.get('.list__body').eq(2).children().should('have.length', 10)
    })

    it.skip('Control-Requirements Mapping', () => {
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'tomas_workflow_tests', 'Management', 'Risk Management', 'Control Browser')
        cy.wait(500)
        cy.get('.wrapper__header >', {timeout:18000}).should('have.length', 4)

        cy.get('.list__body-elem').last().click({force:true})
        cy.wait(500)

        cy.get(':nth-child(3) > .wrapper__header > a > .p-button').click()
        cy.get('.mt-4').should('exist')
        cy.get('.mt-4', {timeout:20000}).should('not.exist')

        for (let i = 1; i < 11; i++) {
            cy.get(`:nth-child(${i}) > :nth-child(3) > .flex > .checkbox-style`).click()
        }

        cy.get('.primary-btn').click()
        cy.get('.Vue-Toastification__toast-body').should('exist')

        cy.go(-1)
        cy.get('.wrapper__header').first().children({timeout:24000}).should('have.length', 4)

        cy.get('.list__body').eq(3).children().should('have.length', 10)
    })

    it.skip('Control-Threats Mapping', () => {
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'tomas_workflow_tests', 'Management', 'Risk Management', 'Control Browser')
        cy.wait(500)
        cy.get('.wrapper__header >', {timeout:18000}).should('have.length', 4)

        cy.get('.list__body-elem').last().click({force:true})
        cy.wait(500)

        cy.get(':nth-child(4) > .wrapper__header > a > .p-button').click()
        cy.get('.mt-4').should('exist')
        cy.get('.mt-4', {timeout:24000}).should('not.exist')

        for (let i = 1; i < 11; i++) {
            cy.get(`:nth-child(${i}) > :nth-child(4) > .flex > .checkbox-style`).click()
        }

        cy.get('.primary-btn').click()
        cy.get('.Vue-Toastification__toast-body').should('exist')

        cy.go(-1)
        cy.get('.wrapper__header').first().children({timeout:24000}).should('have.length', 4)

        cy.get('.list__body').eq(4).children().should('have.length', 10)
    })

    it.skip('Control Cleanup', () => {
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'tomas_workflow_tests', 'Management', 'Risk Management', 'Control Browser')
        cy.wait(500)
        cy.get('.wrapper__header >', {timeout:20000}).should('have.length', 4)

        cy.deleteDataEntry('testingMapping')
    })


})