const loremIpsum = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ut blandit velit. Phasellus suscipit nunc vel nisi 
congue, vitae pretium eros malesuada. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis 
egestas. Vivamus nec lacus vitae neque venenatis feugiat. Integer auctor augue vitae libero congue, ac pulvinar turpis 
ullamcorper. Vestibulum nec elementum nisi. Fusce ut mi ut nulla interdum eleifend.
`

describe('Governing Documentation', () => {
    it('Checks Fields shown in Gov Doc creation & creates a Governing Documentation record', () => {
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'tomas_workflow_tests', 'Management', 'Compliance Management', 'Governing Documentation')
        cy.get('.wrapper__header >').should('have.length', '4', {timeout:8000})
        cy.contains('Add').click({force:true})
    

        //Checks for fields
        cy.get('.field--hidden > .flex').should('contain', 'Name')
        cy.get('.field').eq(1)
            .children().first().should('contain', 'Description')
        cy.get('.field').eq(2)
            .children().first().should('contain', 'Owner')
        cy.get('.field').eq(3)
            .children().first().should('contain', 'Review Date')
        cy.get('.field').eq(4)
            .children().first().should('contain', 'Review Interval')
        cy.get('.gap-x-4 > .flex > .text-gray-450').should('contain', 'Link')

        //Creates a Governing Documentation
        cy.get('.field--hidden > .p-inputtext').click().type('testingMVP')
        cy.get('.p-inputtextarea').click().type(loremIpsum)
        cy.get('.dropdown-toggle:visible').click({force:true})
        cy.get(':nth-child(1) > .option-label').click()

        cy.get('.field').eq(3)
            .children().last().click()
        cy.get('.p-datepicker-next').click()
        cy.wait(250)
        cy.get('[aria-label="23"]').click()
        cy.get('.wrapper__header > .mr-1').click()

        cy.get('.p-inputnumber > .p-inputtext').type('5')

        cy.get('.flex > .p-inputtext').click().type('https://www.youtube.com/watch?v=dQw4w9WgXcQ')

        cy.get('[data-cy="assetBrowser_create"]').click()
        cy.get('.Vue-Toastification__toast-body').should('exist')

        //PostCreation assertions
        cy.get('.field--hidden > .field__value').should('contain', 'testingMVP')
        cy.get(':nth-child(2) > .field__value').invoke('text').then((text) => {
            let cleanedText = text.replace(/[\s\x00-\x1F\x7F-\uFFFF]+/g, '');
            let result = cleanedText.includes('vivamusneclacus')
            expect(cleanedText).to.contain('Vivamusneclacus')
            // /y.log(cleanedText)
        })
        cy.get('[style="grid-column: span 1 / auto;"] > .field__value').should('contain', 'Jane Doe')
        cy.get(':nth-child(4) > .field__value').should('contain', '23')
        cy.get(':nth-child(5) > .field__value').should('contain', '5')
        cy.get('.px-4 > .w-full > p').should('contain', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ')
    })

    it('Checks amount of mapping windows & maps requirements', () => {
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'tomas_workflow_tests', 'Management', 'Compliance Management', 'Governing Documentation')
        cy.get('.wrapper__header >').should('have.length', '4', {timeout:8000})
        cy.get('.list__body-elem').last().click({force:true})

        //Checks amount of windows
        cy.wait(250)
        cy.get('.list__body').should('have.length', '2')

        //Mapping
        cy.get('.list__body-elem--select > :nth-child(1) > .overflow-hidden').invoke('text').then((docID) => {
            //Enter
            cy.get('a > .p-button').click({force:true})
            cy.wait(250)
            cy.get('.mt-4', {timeout:8000}).should('not.exist')
            //Filling
            for (let i = 1; i < 6; i++) {
                cy.get(`:nth-child(${i}) > :nth-child(3) > .flex > .checkbox-style`).click()
                cy.get(`:nth-child(${i}) > :nth-child(4) > .w-full`).click().type(`mapping of req${i} to regulation${docID}`)
            }
        })
        
        cy.wait(250)
        cy.get('.primary-btn').click()
        cy.get('.Vue-Toastification__toast-body', {timeout:8000}).should('exist')
        

        cy.go(-1)
        cy.wait(500)
        cy.get('.wrapper__header').first().children().should('have.length', '4', {timeout:8000})
    })

    it('Checks if requirements were correctly mapped with valid inputs', () => {
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'tomas_workflow_tests', 'Management', 'Compliance Management', 'Governing Documentation')
        cy.get('.wrapper__header >').should('have.length', '4', {timeout:8000})

        cy.get('.list__body-elem').last().click({force:true})
        cy.wait(250)
        cy.get(':nth-child(1) > :nth-child(4) > .pl-3').invoke('text').then((text) => {
            cy.log(text)
        })
        
        cy.get('.list__body').last().children().as('mappings') //selects all mapped reqs
        cy.get('@mappings').each(($el, index, $list) => {
            cy.get($el).children().as('childEls')
            cy.get('@childEls').eq(-2).invoke('text').then((mainText) => {
                cy.get('@childEls').first().invoke('text').then((reqID) => {
                    if (reqID.includes('00')) {
                        reqID = reqID.replace('00', '')
                    }
                    cy.get('.list__body').first().children().last()
                        .children().first().invoke('text').then((docID) => {
                            
                            expect(mainText).to.contain(reqID)
                            expect(mainText).to.contain(docID)
                    })
                })
            })
        })

    })

    //One type of report: check diff between general report and 1-govdoc specific report
    it('Generates and checks newly made report', () => {
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'tomas_workflow_tests', 'Management', 'Compliance Management', 'Governing Documentation')
        cy.get('.wrapper__header >').should('have.length', '4', {timeout:8000})

        cy.get('.list__body-elem').last().click({force:true})
        
        //Generates General Report
        cy.contains('Generate Report').click({force:true})
        cy.get('.dropdown-toggle').last().click()
        cy.get('.option-item').click()
        cy.get('.modal__body > .flex > .p-button').click()

        //Generation/PostGeneration checks
        cy.get('.Vue-Toastification__toast', {timeout:8000}).should('exist')
        cy.get('.Vue-Toastification__toast-component-body > .flex > p').should('contain', 'queue...')
        cy.wait(500)
        cy.get('.Vue-Toastification__toast').should('exist')
        cy.get('.Vue-Toastification__toast-component-body > .flex > p').should('contain', 'Successfully')

        //Generates Report for 1 data_entry
        cy.contains('Generate Report').click({force:true})
        cy.get('.dropdown-toggle').first().click()
        cy.get('.options-list >').last().click()

        cy.get('.dropdown-toggle').last().click()
        cy.get('.option-item').contains('Gov Doc Clause').click()
        cy.get('.modal__body > .flex > .p-button').click()

        //Generation/PostGeneration checks
        cy.get('.Vue-Toastification__toast', {timeout:8000}).should('exist')
        cy.get('.Vue-Toastification__toast-component-body > .flex > p').should('contain', 'queue...')
        cy.wait(500)
        cy.get('.Vue-Toastification__toast').should('exist')
        cy.get('.Vue-Toastification__toast-component-body > .flex > p').should('contain', 'Successfully') //also add check if id is written in mess
        
    })
    

    it('Compares generated Reports', () => {
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'tomas_workflow_tests', 'Reports', 'Compliance Management', 'Governing Documentation')
        cy.get('.wrapper__header >').should('have.length', '3', {timeout:8000})

        cy.get('.list__body > :nth-child(1) > :nth-child(6)').click()
        cy.get('.overflow-auto.size-full').children()
            .children().last().children().its('length').should('eq', 1)
        
        cy.go(-1)
        cy.get('.wrapper__header >').should('have.length', '3', {timeout:8000})

        cy.get('.list__body > :nth-child(2) > :nth-child(6)').click()
        cy.get('.overflow-auto.size-full').children()
            .children().last().children().its('length').should('be.greaterThan', 1)


    })

    it('GovDoc cleanup', () => {
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'tomas_workflow_tests', 'Management', 'Compliance Management', 'Governing Documentation')
        cy.get('.wrapper__header >').should('have.length', '4', {timeout:8000})

        cy.deleteDataEntry('testingMVP')
    })
    //TODO
    
    //1st test -> Checks amount of fields; field names; creates entry -> DONE
    //2nd test -> Checks amount of mapping windows; maps reqs to docs -> DONE
    //3rd test -> Checks if correct text and amount of mappings were saved -> DONE | REMAINING -> Check report generation ->DONE
    //4th test -> Checks minor funcs -> owner relink; link relink; sorting; detail window
    //5th test -> Cleanup
})