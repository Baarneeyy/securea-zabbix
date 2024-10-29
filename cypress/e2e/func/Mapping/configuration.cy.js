describe.skip('Asset Class Catalogue', () => {
    it('Prepares mapping asset class', () => {
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'tomas_workflow_tests', 'Tenant', 'Configuration', 'Asset Class Catalogue')
        cy.wait(250)
        cy.get('.transition', {timeout:8000}).should('not.exist')
        cy.get('.wrapper__header >', {timeout:8000}).should('have.length', 4)

        cy.get('[data-cy="assetBrowser_add"]').click()
        cy.wait(250)
        cy.get('.field--hidden > .p-inputtext').click().type('testingMapping')
        cy.get('.p-inputtextarea').click().type('testing description')

        cy.get('[data-cy="assetBrowser_create"] > .p-button-label').click()
        cy.get('.Vue-Toastification__toast-body', {timeout:8000}).should('exist')
    })
    it('Asset-Control mapping', () => {
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'tomas_workflow_tests', 'Tenant', 'Configuration', 'Asset Class Catalogue')
        cy.wait(250)
        cy.get('.transition', {timeout:8000}).should('not.exist')
        cy.get('.wrapper__header >', {timeout:8000}).should('have.length', 4)

        cy.get('.list__body-elem').last().click()

        cy.get(':nth-child(2) > .wrapper__header > a > .p-button').click()
        cy.get('.flex-col > .mt-4').should('exist')
        cy.get('.flex-col > .mt-4', { timeout:8000 }).should('not.exist')
        //cy.get('p.ml-auto', { timeout:8000 }).should('not.exist')
        cy.get('.splitpanes__pane > .wrapper > .wrapper__header >', {timeout:8000}).should('have.length', 4)

        for (let i = 0; i < 5; i++) {
            cy.get(`:nth-child(${i+1}) > :nth-child(5) > .flex > .checkbox-style`).click()
            cy.wait(250)

            cy.get('.list__body').eq(1).children().eq(i) //selects control I
                .children().first().invoke('text').then((text) => {
                    cy.get(`:nth-child(${i+1}) > :nth-child(6) > .w-full`).click().type(text)
                })
        }
        cy.get('.primary-btn').click()
        cy.get('.Vue-Toastification__toast-body').should('exist')
        cy.get('.p-checkbox-input').click()
        cy.wait(250)
        cy.get('.list__body').eq(1).children().should('have.length', 5)
        
        
        cy.get('header.flex > .justify-between >').last().click()
        cy.get('.mt-4').should('exist')
        cy.get('.mt-4', {timeout:6000}).should('not.exist')

        cy.get('.list__body').eq(2).children() //asset-controls mapping window
            .each(($el, index) => { //for each
                cy.wrap($el).children().first().invoke('text').then((mapID) => { //gets id of control
                    cy.wrap($el).children().eq(4).invoke('text').then((descrip) => {
                        expect(descrip).to.contain(mapID)
                    })
                })
            })
    })
    it('Asset-Threat mapping', () => {
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'tomas_workflow_tests', 'Tenant', 'Configuration', 'Asset Class Catalogue')
        cy.wait(250)
        cy.get('.transition', {timeout:8000}).should('not.exist')
        cy.get('.wrapper__header >', {timeout:8000}).should('have.length', 4)

        cy.get('.list__body-elem').last().click()

        cy.get(':nth-child(3) > .wrapper__header > a > .p-button').click()
        cy.get('.flex-col > .mt-4').should('exist')
        cy.get('.flex-col > .mt-4', { timeout:8000 }).should('not.exist')

        //.get('.list__body').eq(1)

        for (let i = 0; i < 5; i++) {
            cy.get(`:nth-child(${i+1}) > :nth-child(4) > .flex > .checkbox-style`).click()
            cy.get(`:nth-child(${i+1}) > :nth-child(5) > .relative > .custom-spinner`).click().type('{selectAll}{del}23')
            cy.get(`:nth-child(${i+1}) > :nth-child(6) > .relative > .custom-spinner`).click().type('{selectAll}{del}32')
            cy.get('.list__body').eq(1).children().eq(i) //current threat
                .children().first().invoke('text').then((text) => {
                    cy.get(`:nth-child(${i+1}) > :nth-child(7) > .w-full`).click().type(text)
                })
        }

        cy.wait(500)
        cy.get('.primary-btn').click()
        cy.get('.Vue-Toastification__toast-body').should('exist')
        cy.get('.p-checkbox-input').click()
        cy.wait(250)
        cy.get('.list__body').eq(1).children().should('have.length', 5)

        cy.get('header.flex > .justify-between >').last().click()
        cy.get('.mt-4').should('exist')
        cy.get('.mt-4', {timeout:6000}).should('not.exist')
        
        cy.get('.list__body').eq(3).children() //asset-controls mapping window
            .each(($el, index) => { //for each
                cy.wrap($el).children().eq(2).should('contain', 23)
                cy.wrap($el).children().eq(3).should('contain', 32)
                
                cy.wrap($el).children().first().invoke('text').then((mapID) => { //gets id of control
                    cy.wrap($el).children().eq(4).invoke('text').then((descrip) => {
                        expect(descrip).to.contain(mapID)
                    })
                })
            })
    })
    it('Asset Class cleanup', () => {
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'tomas_workflow_tests', 'Tenant', 'Configuration', 'Asset Class Catalogue')
        cy.wait(250)
        cy.get('.transition', {timeout:8000}).should('not.exist')
        cy.get('.wrapper__header >', {timeout:8000}).should('have.length', 4)
        
        cy.deleteDataEntry('testingMapping')
    })
})

describe.skip('Regulation Catalogue', () => {
    it('Prepares mapping Regulation', () => {
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'tomas_workflow_tests', 'Tenant', 'Configuration', 'Regulation Catalogue')
        cy.wait(250)
        cy.get('.wrapper__header >').should('have.length', 4)
        cy.get('.ml-auto > .p-button').click()
        cy.get('#name').click().type('testingMapping prep Reg')
        cy.get('.justify-end > .primary-btn').click()
       
        cy.wait(500)
        cy.get('.wrapper__header').first().children().should('have.length', 4)
        cy.get('.Vue-Toastification__toast-body').should('exist')
        cy.get('.list__body').first().children() //gets regulations table
            .last().children().eq(1).invoke('text').then((text) => {
                let cleanText = text.replace(/[^\x20-\x7E]/g, '')
                
                expect(cleanText).to.contain('testingMapping prep Reg')
            })
        
    })

    it('creates clause for mapping', () => {
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'tomas_workflow_tests', 'Tenant', 'Configuration', 'Regulation Catalogue')
        cy.wait(250)
        cy.get('.wrapper__header >').should('have.length', 4)
        cy.get('.list__body-elem').last().click()
        cy.get('.wrapper__header').eq(1).children().should('have.length', 4)
        cy.get('.wrapper__header').eq(1).children().last() // + / fullscreen btns
            .children().first().click()
        cy.get(250)
        cy.get('.clause__requirements > .wrapper > .wrapper__header >').should('have.length', 4)
        cy.get('.clause__detail__content__grid >').should('have.length', 5)

        cy.get('.clause__detail__content__grid >').first().children()
            .last().click().type('testingClause for mapping')
        
        cy.get('.clause__detail__content__grid >').eq(1).children()
            .last().click().type('testing Area')
            
        cy.get('.clause__detail__content__grid >').eq(2).children()
            .last().click().type('testing Statement')

        cy.get('.clause__detail__content__grid >').eq(3).children()
            .last().click().type('testing Assessment Points')

        cy.get('.primary-btn').click()

        cy.get('.Vue-Toastification__toast-body')

        cy.get('.list__body-elem').last().click()
        cy.get(':nth-child(2) > .whitespace-pre-wrap').invoke('text').then((text) => {
            let cleanText = text.replace(/[^\x20-\x7E]/g, '')
            expect(cleanText).to.contain('testingClause for mapping')
        })

        cy.get(':nth-child(3) > .whitespace-pre-wrap').invoke('text').then((text) => {
            let cleanText = text.replace(/[^\x20-\x7E]/g, '')
            expect(cleanText).to.contain('testing Area')
        })


        cy.get(':nth-child(4) > .whitespace-pre-wrap').invoke('text').then((text) => {
            let cleanText = text.replace(/[^\x20-\x7E]/g, '')
            expect(cleanText).to.contain('testing Statement')
        })

        
        cy.get(':nth-child(5) > .whitespace-pre-wrap').invoke('text').then((text) => {
            let cleanText = text.replace(/[^\x20-\x7E]/g, '')
            expect(cleanText).to.contain('testing Assessment Points')
        })
    })
    
    it('Clause-Requirement mapping', () => {
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'tomas_workflow_tests', 'Tenant', 'Configuration', 'Regulation Catalogue')
        cy.wait(250)
        cy.get('.wrapper__header >').should('have.length', 4)
        cy.get('.list__body-elem').last().click()
        cy.get('.wrapper__header').eq(1).children().should('have.length', 4)

        cy.get('.list__body').last().children().first().click()
        cy.get('.transition').should('exist')
        cy.get('.transition').should('not.exist')

        /*for (let i = 1; i < 6; i++) { 
            cy.get(`:nth-child(${i}) > :nth-child(5) > .checkbox-style`).click()
            cy.get(`:nth-child(${i}) > :nth-child(6) > .custom-spinner`).dblclick().type(`{selectAll}{del}${i}`)
        }
        cy.get('.primary-btn').click()*/

        for (let i = 1; i < 6; i++) {
            cy.get(`:nth-child(${i}) > :nth-child(5) > .checkbox-style`).should('be.checked')
            cy.get(`:nth-child(${i}) > :nth-child(6) > .custom-spinner`).invoke('val').then((weight) => {
                expect(weight).to.contain(i)
            })
        }
        cy.get('.flex-wrap > :nth-child(3) > .flex').click()

        cy.get('.transition').should('exist')
        cy.get('.transition').should('not.exist')

        cy.get('.list__body').last().children() //clause
            .children().eq(1).invoke('text').then((text) => {
                let cleanText = text.replace(/[^\x20-\x7E]/g, '')
                expect(cleanText).to.contain('testingClause for mapping')
            })

        cy.get('.list__body').last().children() //clause
            .children().eq(2).invoke('text').then((text) => {
                let cleanText = text.replace(/[^\x20-\x7E]/g, '')
                expect(cleanText).to.contain('testing Area')
            })

        cy.get('.list__body').last().children() //clause
            .children().eq(3).invoke('text').then((text) => {
                let cleanText = text.replace(/[^\x20-\x7E]/g, '')
                expect(cleanText).to.contain('5')
            })

        cy.get('.list__body').last().children() //clause
            .children().eq(4).invoke('text').then((text) => {
                let cleanText = text.replace(/[^\x20-\x7E]/g, '')
                expect(cleanText).to.contain('null')
            })

        cy.get('.list__body').last().children() //clause
            .children().eq(5).invoke('text').then((text) => {
                let cleanText = text.replace(/[^\x20-\x7E]/g, '')
                expect(cleanText).to.contain('testing Statement')
            })

        cy.get('.list__body').last().children() //clause
            .children().eq(6).invoke('text').then((text) => {
                let cleanText = text.replace(/[^\x20-\x7E]/g, '')
                expect(cleanText).to.contain('testing Assessment Points')
            })
        
    })

    it('Deletes Regulation & Clause', () => {
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'tomas_workflow_tests', 'Tenant', 'Configuration', 'Regulation Catalogue')
        cy.wait(250)
        cy.get('.wrapper__header >').should('have.length', 4)
        cy.get('.list__body-elem').last().click()
        cy.get('.list__body').first().children().its('length').then((ogLength) => {
            cy.get(':nth-child(1) > .wrapper > .wrapper__header >').last()
                .children().eq(1).click()
            cy.get('.p-confirm-popup-accept').click()
            cy.get('.Vue-Toastification__toast-body').should('exist')
            cy.get('.list__body').first().children().its('length').then((newLength) => {
                expect(ogLength).to.be.greaterThan(newLength)
            })
        })
    })
})

describe('Requirement Catalogue', () => {
    it('Prepares mapping requirement', () => {
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'tomas_workflow_tests', 'Tenant', 'Configuration', 'Security Requirements Catalogue')
        cy.wait(250)
        cy.get('.wrapper__header >', {timeout:8000}).should('have.length', 4)

        //Creation
        cy.get('[data-cy="assetBrowser_add"]').click()
        cy.wait(250)
        cy.get('.wrapper__header >').should('have.length', 4)
        cy.get('.field--hidden > .p-inputtext').click().type('testingMapping')
        cy.get(':nth-child(2) > .p-inputtextarea').click().type('testing source')
        cy.get(':nth-child(3) > .p-inputtextarea').click().type('testing description')
        cy.get('[data-cy="assetBrowser_create"]').click()

        //PostCreate asssertions
        cy.get('.Vue-Toastification__toast-body', {timeout:8000})
        cy.get('.field--hidden > .field__value').should('contain', 'testingMapping')
        cy.get(':nth-child(2) > .field__value').should('contain', 'testing source')
        cy.get(':nth-child(3) > .field__value').should('contain', 'testing description')
    })

    it('Requirement-Controls mapping', () => {
        cy.clearAllCookies()
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'tomas_workflow_tests', 'Tenant', 'Configuration', 'Security Requirements Catalogue')
        cy.wait(250)
        cy.get('.wrapper__header >', {timeout:8000}).should('have.length', 4)
        cy.get('.list__body-elem').last().click({force:true})

        //Clicks on mapping relink
        cy.get('.mappings-wrapper > :nth-child(1) > .wrapper__header >').last().click()
        cy.wait(500)
        cy.get('.transition').should('not.exist')
        cy.get('.mt-4').should('not.exist')

        
        for (let i = 1; i < 6; i++) {
            cy.get(`:nth-child(${i}) > :nth-child(5) > .flex > .checkbox-style`).click()
            cy.wait(250)
            cy.get(`:nth-child(${i}) > :nth-child(6) > .w-full`).click().type('testing description')
            cy.wait(250)
            cy.get(`:nth-child(${i}) > :nth-child(7) > .relative > .custom-spinner`).click().type('{selectAll}{del}2')
        }

        cy.get('.primary-btn').click()
        cy.get('.Vue-Toastification__toast-body').should('exist')
    
        for (let i = 1; i < 6; i++) {
            cy.get(`:nth-child(${i}) > :nth-child(5) > .flex > .checkbox-style`).invoke('val').should('eq', 'on')
            cy.get(`:nth-child(${i}) > :nth-child(6) > .w-full`).invoke('val').should('contain', 'testing description')
            cy.wait(250)
            cy.get(`:nth-child(${i}) > :nth-child(7) > .relative > .custom-spinner`).invoke('val').should('contain', '2')
        }


        //Wait for browser to load
        cy.get('.flex-wrap > :nth-child(3) > .flex').click()
        cy.wait(500)
        cy.get('.browser-container__main-model-wrapper > .wrapper > .wrapper__header >', {timeout:16000}).should('have.length', 4)

        //Browser assertions
        cy.get('.list__body').eq(1).children().each(($el, index) => {
            cy.wrap($el).children().eq(4).invoke('text').then((text) => {
                let cleanText = text.replace(/[^\x20-\x7E]/g, '')
                expect(cleanText).to.contain('testing description')
            })

            cy.wrap($el).children().eq(5).invoke('text').then((text) => {
                let cleanText = text.replace(/[^\x20-\x7E]/g, '')
                expect(cleanText).to.contain('2')
            })
        })
    })

    it('Requirement cleanup', () => {
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'tomas_workflow_tests', 'Tenant', 'Configuration', 'Security Requirements Catalogue')
        cy.wait(250)
        cy.get('.wrapper__header >', {timeout:8000}).should('have.length', 4)
        cy.deleteDataEntry('testingMapping')
    })
    //Add checks for deprecated urls
})

describe('BCM/Impact', () => {
    let businessProcesses = []
    it('Impact Prep', () => {
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'tomas_workflow_tests', 'Tenant', 'Configuration', 'BCM')
        cy.wait(250)
        cy.get('.wrapper__header >').should('have.length', 4, {timeoout:8000})

        //Creation
        cy.get('[data-cy="assetBrowser_add"]').click()
        cy.wait(250)
        cy.get('.field--hidden > .p-inputtext').click().type('testing mapping')
        cy.get('.p-inputtextarea').click().type('testing description')
        cy.get('[data-cy="assetBrowser_create"]').click()

        //PostCreate asssertions
        cy.get('.Vue-Toastification__toast-body', {timeout:8000})
        cy.get('.field--hidden > .field__value').should('contain', 'testing mapping')
        cy.get('.field--view > .field__value').should('contain', 'testing description')
    })
    it('Impact-Business Process mapping', () => {
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'tomas_workflow_tests', 'Tenant', 'Configuration', 'BCM')
        cy.wait(250)
        cy.get('.wrapper__header >').should('have.length', 4, {timeoout:8000})

        cy.get('.list__body-elem').last().click()
        cy.wait(250)
        cy.get('a > .p-button').click()
        cy.get('.mt-4').should('exist')
        cy.get('.mt-4').should('not.exist')

        for (let i = 1; i < 3; i++) {
            cy.get(`:nth-child(${i}) > :nth-child(3) > .flex > .checkbox-style`).click()
            cy.get(`:nth-child(${i}) > :nth-child(4) > .relative > .custom-spinner`).click().type('{selectAll}{del}10')
            cy.get(`:nth-child(${i}) > :nth-child(5) > .w-full`).click().type('testing mapping description')
        }

        cy.get('.primary-btn').click()
        cy.get('.Vue-Toastification__toast-body').should('exist')

        for (let i = 1; i < 3; i++) {
            cy.get(`:nth-child(${i}) > :nth-child(3) > .flex > .checkbox-style`).invoke('val').then((checked) => {
                expect(checked).to.eq('on')
            })
            cy.get(`:nth-child(${i}) > :nth-child(4) > .relative > .custom-spinner`).invoke('val').then((value) => {
                expect(value).to.eq('10')
            })
            cy.get(`:nth-child(${i}) > :nth-child(5) > .w-full`).invoke('val').then((text) => {
                expect(text).to.eq('testing mapping description')
            })
        }


        cy.get('.flex-wrap > :nth-child(3) > .flex').click()
        cy.get('.wrapper__header').first().children().should('have.length', 4)

        cy.get('.list__body').last().children().each(($el, index) => {
            cy.wrap($el).children().eq(3).should('contain', '10')
            cy.wrap($el).children().eq(4).should('contain', 'testing mapping description')
            cy.wrap($el).children().eq(0).invoke('text').then((text) => {
                businessProcesses.push(text)
                cy.log(businessProcesses)
            })
        })
    })

    it('Business Process view', () => {
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'tomas_workflow_tests', 'Management', 'BCM', 'Business Process')
        cy.wait(250)
        cy.get('.wrapper__header >').should('have.length', 4, {timeoout:8000})
        
        for (let i = 0; i < businessProcesses.length; i++) {
            cy.get('.list__body').first().contains(businessProcesses[i]).click()
            cy.get('.list__body').last().contains('testing mapping').should('exist')
        }
    })

    it('Impact Cleanup', () => {
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'tomas_workflow_tests', 'Tenant', 'Configuration', 'BCM')
        cy.wait(250)
        cy.get('.wrapper__header >').should('have.length', 4, {timeoout:8000})

        cy.deleteDataEntry('testing mapping')
    })
})
