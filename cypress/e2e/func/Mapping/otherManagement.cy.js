describe.skip('Governing Documentation mapping', () => {
    it('Prep Mapping Gov Doc' , () => {
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'tomas_workflow_tests', 'Management', 'Compliance Management', 'Governing Documentation')
        cy.wait(500)
        cy.get('.wrapper__header >').should('have.length', 4)

        //Creation
        cy.contains('Add').should('exist').click()
        cy.wait(750)
        cy.get('.field--hidden > .p-inputtext').click().type('testingMapping')
        cy.get('.p-inputtextarea').click().type('testing description')
        cy.get('.dropdown-toggle:visible').click() 
        cy.wait(250)
        cy.get('.option-item').first().click()
        cy.get('.p-calendar').click()
        cy.wait(250)
        cy.get('[aria-label="23"]').click()
        cy.get('.p-inputnumber > .p-inputtext').click().type('3')

        cy.get('[data-cy="assetBrowser_create"] > .p-button-label').click()
        cy.get('.Vue-Toastification__toast-body').should('exist')

        //PostCreation assertions
        cy.get('.field--hidden > .field__value').should('contain', 'testingMapping')
        cy.get(':nth-child(2) > .field__value').should('contain', 'testing description')
        cy.get('[style="grid-column: span 1 / auto;"] > .field__value').should('contain', 'Jane Doe')
        cy.get(':nth-child(4) > .field__value').should('contain', '23')
        cy.get(':nth-child(5) > .field__value').should('contain', '90')
    })

    it('GovDoc-Requirement Mapping', () => {
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'tomas_workflow_tests', 'Management', 'Compliance Management', 'Governing Documentation')
        cy.wait(500)
        cy.get('.wrapper__header >').should('have.length', 4)

        cy.get('.list__body-elem').last().click()
        cy.wait(250)
        cy.get('a > .p-button').click()

        cy.get('.mt-4').should('exist')
        cy.get('.mt-4', {timeout:8000}).should('not.exist')

        for (let i = 1; i < 11; i++) {
            cy.get(`:nth-child(${i}) > :nth-child(3) > .flex > .checkbox-style`).click()
        }

        cy.get('.primary-btn').click()

        cy.get('.Vue-Toastification__toast-body').should('exist')

        cy.go(-1)
        cy.get('.wrapper__header').first().children().should('have.length', 4)

        cy.get('.list__body').last().children().should('have.length', 10)
    })

    it('Gov Doc cleanup', () => {
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'tomas_workflow_tests', 'Management', 'Compliance Management', 'Governing Documentation')
        cy.wait(500)
        cy.get('.wrapper__header >').should('have.length', 4)

        cy.deleteDataEntry('testingMapping')
    })
})

describe.skip('SoA mapping', () => {
    it('Prep Mapping Clause', () => {
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'tomas_workflow_tests', 'Tenant', 'Configuration', 'Regulation Catalogue')
        cy.wait(500)
        cy.get('.list__body-elem').first().click()
        cy.wait(750)
        cy.get('.list__body').should('have.length', '2', {timeout:8000})
        cy.get('.wrapper > .wrapper__header > .ml-auto >')
            .eq(3).click() //ADD BUTTON
        
        //Creation
        cy.get(':nth-child(1) > .p-inputtext').click().type('testingMapping')
        cy.get(':nth-child(2) > .p-inputtextarea').click().type('testing area')
        cy.get(':nth-child(3) > .p-inputtextarea').click().type('testing statement')
        cy.get(':nth-child(4) > .p-inputtextarea').click().type('testing assessment points')
        cy.get('.primary-btn').click()
        cy.wait(750)

        //PostCreate assertions
        cy.get(':nth-child(2) > .whitespace-pre-wrap').invoke('text')
            .then((text) => {
                let cleanedText = text.replace(/[\s\x00-\x1F\x7F-\uFFFF]+/g, '');
                expect(cleanedText).to.eq('testingMapping')
            })
        cy.get(':nth-child(3) > .whitespace-pre-wrap').invoke('text')
            .then((text) => {
                let cleanedText = text.replace(/[\s\x00-\x1F\x7F-\uFFFF]+/g, '');
                expect(cleanedText).to.eq('testingarea')
            })
        cy.get(':nth-child(4) > .whitespace-pre-wrap').invoke('text')
            .then((text) => {
                let cleanedText = text.replace(/[\s\x00-\x1F\x7F-\uFFFF]+/g, '');
                expect(cleanedText).to.eq('testingstatement')
            })
        cy.get(':nth-child(5) > .whitespace-pre-wrap').invoke('text')
            .then((text) => {
                let cleanedText = text.replace(/[\s\x00-\x1F\x7F-\uFFFF]+/g, '');
                expect(cleanedText).to.eq('testingassessmentpoints')
            })
    })

    it('Clause-Requirement Mapping', () => {
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'tomas_workflow_tests', 'Management', 'Compliance Management', 'Regulations')
        cy.wait(500)
        cy.get('.list__body-elem').first().click()
        cy.get('.list__body').should('have.length', 2)
        cy.get('.list__body').last().children().last().click({force:true})

        cy.wait(750)
        cy.get(':nth-child(1) > .splitpanes > :nth-child(3) > .wrapper > .wrapper__header >')
            .eq(1).click()

        cy.get('.transition').should('exist')
        cy.get('.transition', {timeout:8000}).should('not.exist')

        for (let i = 1; i < 11; i++) {
            cy.get(`:nth-child(${i}) > :nth-child(5) > .checkbox-style`).click()
        }

        cy.get('.primary-btn').click()
        
        cy.openManagement('Management', 'Compliance Management', 'Regulation')
        cy.wait(500)
        
        cy.get('.list__body-elem').first().click()
        cy.get('.list__body', {timeout:8000}).should('have.length', 2)
        cy.get('.list__body').last().children().last().click({force:true})
        cy.wait(750)
        cy.get('.transition').should('have.length', 3)
        cy.get('.transition', {timeout:8000}).should('not.exist')

        cy.get('.list__body').eq(1).children().should('have.length', 10)


    })

    it('Clause Cleanup', () => {
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'tomas_workflow_tests', 'Tenant', 'Configuration', 'Regulation Catalogue')
        cy.get('.wrapper__header >').should('have.length', 4)
        cy.get('.list__body-elem').first().click()
        
        cy.get('.list__body', {timeout:8000}).should('have.length', 2)
        
        cy.get('.wrapper > .wrapper__header > .mr-1 >').last().invoke('text').then((text) => {
            //cy.log(text)

            cy.get('.list__body').last().children().last().click({force:true})

            cy.wait(500)
            cy.get('.clause__detail__content__header >').should('have.length', 3)
            cy.get('.clause__detail__content__header__actions >').eq(2).click()
            cy.wait(250)
            cy.get('.p-confirm-popup-accept').click()

            cy.get('.flex-wrap > :nth-child(3) > .flex').click()

            cy.get('.transition').should('exist')
            cy.get('.transition').should('not.exist')

            cy.get('.wrapper > .wrapper__header > .mr-1 >').last().invoke('text').then((secondText) => {
                let oldNum = parseInt(text)
                let newNum = parseInt(secondText)
                expect(newNum).to.eq(oldNum - 1)
            })
        })
    })
})

describe.skip('Business Process mapping', () => {
    it('Prep Mapping Business Process', () => {
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'tomas_workflow_tests', 'Management', 'BCM', 'Business Process')
        cy.wait(250)
        cy.get('.wrapper__header >').should('have.length', 4)

        //Creation
        cy.get('[data-cy="assetBrowser_add"]').click()
        cy.wait(250)
        cy.get('.field--hidden > .p-inputtext').click().type('testingMapping')
        cy.get('.p-inputtextarea').click().type('testing description')
        cy.get('[data-cy="assetBrowser_create"]').click()

        //PostCreate asssertions
        cy.get('.Vue-Toastification__toast-body', {timeout:8000})
        cy.get('.field--hidden > .field__value').should('contain', 'testingMapping')
        cy.get('.field--view > .field__value').should('contain', 'testing description')
        
    })

    it('BP-Asset Mapping', () => {
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'tomas_workflow_tests', 'Management', 'BCM', 'Business Process')
        cy.wait(250)
        cy.get('.wrapper__header >').should('have.length', 4)

        cy.get('.list__body-elem').last().click()
        cy.wait(250)
        cy.get(':nth-child(1) > .wrapper__header > a > .p-button').click()

        cy.get('.mt-4').should('exist')
        cy.get('.mt-4', {timeout:8000}).should('not.exist')

        for (let i = 1; i < 11; i++) {
            cy.get(`:nth-child(${i}) > :nth-child(10) > .flex > .checkbox-style`).click()
        }

        cy.get('.primary-btn').click()
        cy.get('.Vue-Toastification__toast-body', {timeout:8000}).should('exist')

        cy.go(-1)
        cy.get('.wrapper__header').first().children().should('have.length', 4)

        cy.get('.list__body').eq(1).children().should('have.length', 10)
    })

    it('BP-Impact Mapping', () => {
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'tomas_workflow_tests', 'Management', 'BCM', 'Business Process')
        cy.wait(250)
        cy.get('.wrapper__header >').should('have.length', 4)

        cy.get('.list__body-elem').last().click()
        cy.wait(250)
        cy.get(':nth-child(2) > .wrapper__header > a > .p-button').click()

        cy.get('.mt-4').should('exist')
        cy.get('.mt-4', {timeout:8000}).should('not.exist')

        for (let i = 1; i < 3; i++) {
            cy.get(`:nth-child(${i}) > :nth-child(3) > .flex > .checkbox-style`).click()
        }

        cy.get('.primary-btn').click()
        cy.get('.Vue-Toastification__toast-body', {timeout:8000}).should('exist')

        cy.go(-1)
        cy.get('.wrapper__header').first().children().should('have.length', 4)

        cy.get('.list__body').eq(2).children().should('have.length', 2)
    })

    it('BP Cleanup', () => {
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'tomas_workflow_tests', 'Management', 'BCM', 'Business Process')
        cy.wait(250)
        cy.get('.wrapper__header >').should('have.length', 4)

        cy.deleteDataEntry('testingMapping')
    })


})

