describe('Checks mappings to and from Business Processes', () => {
    it('Creates process to test with; checks correct amount', () => {
        let bpCount = 0;
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'demoTestingZ', 'Management', 'BCM', 'Business Processes')
        cy.get('.wrapper__header >').should('have.length', '4', {timeout:8000})
        cy.get('.list__body-elem').its('length').then((length) => {
            bpCount += length;
        })

        cy.contains('Add').click()
        cy.get('.field--hidden > .p-inputtext').click().type('testingMVP') //name
        cy.get('.p-inputtextarea').click().type('testing description') //description
        cy.get('[data-cy="assetBrowser_create"]').click() //create bp
        cy.wait(250)

        //assert creation
        cy.get('.Vue-Toastification__toast-body', {timeout:80000}).should('exist')
        cy.get('.list__body-elem').its('length').then((count) => {
            expect(count).to.be.greaterThan(bpCount)
        }) //checks if amount of items is updated
        
        //Assert 3 windows exist on screen
        cy.get('.wrapper__header').its('length').should('eq', 3)
    })

    it('Maps Assets to new Business Process', () => {
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'demoTestingZ', 'Management', 'BCM', 'Business Processes')
        cy.get('.wrapper__header >').should('have.length', '4', {timeout:8000})
        
        //Mapping relink and loading check
        cy.get('.list__body-elem').last().click()
        cy.get('.wrapper__header').eq(1).children().last().click() //mapping window relink
        cy.wait(250)
        cy.get('.mt-4').should('not.exist')

        //Mapping
        for (let i = 1; i < 6; i++) {
            cy.get(`:nth-child(${i}) > :nth-child(10) > .flex > .checkbox-style`).click() //checkbox
            cy.get(`:nth-child(${i}) > :nth-child(11) > .relative > .custom-spinner`).click().type('00')
            cy.get('.list__body').eq(1).find('.list__body-elem').eq(i-1).children().first().invoke('text').then((text) => {
                cy.get(':nth-child(2) > .value').invoke('text').then((bp) => {
                    cy.get(`:nth-child(${i}) > :nth-child(12) > .w-full`).click().type(`asset ${text} mapping to ${bp}`)
                })
            })
            cy.wait(500)
        }

        cy.get('.primary-btn').click()
        cy.get('.Vue-Toastification__toast-body', {timeout:8000}).should('exist')
    })

    it('Checks BP-Asset mappings', () => {
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'demoTestingZ', 'Management', 'BCM', 'Business Processes')
        cy.get('.wrapper__header >').should('have.length', '4', {timeout:8000})
        
        //Mapping check
        cy.get('.list__body-elem').last().click()
        cy.get('.list__body').eq(1).children().should('have.length', '5')

        for (let i = 1; i < 6; i++) {
            cy.get(`:nth-child(${i}) > :nth-child(5) > .pl-3`).should('contain', '100')
            cy.get('.list__body').eq(1).children() //asset mappings
                .eq(i-1).children().first() //id of asset mapping
                    .invoke('text').then((id) => {
                        cy.get(`:nth-child(${i}) > :nth-child(6) > .pl-3`).should('contain', id)
                    })
                    //toAdd BP name
        }
    })

    it('Maps Assets to new Business Process', () => {
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'demoTestingZ', 'Management', 'BCM', 'Business Processes')
        cy.get('.wrapper__header >').should('have.length', '4', {timeout:8000})
        
        //Mapping relink and loading check
        cy.get('.list__body-elem').last().click()
        cy.get('.wrapper__header').eq(2).children().last().click() //mapping window relink
        cy.wait(250)
        cy.get('.mt-4').should('not.exist')

        //Mapping
        for (let i = 1; i < 3; i++) {
            cy.get(`:nth-child(${i}) > :nth-child(3) > .flex > .checkbox-style`).click() //checkbox
            cy.get(`:nth-child(${i}) > :nth-child(4) > .relative > .custom-spinner`).click().type('00')
            cy.get('.list__body').eq(1).find('.list__body-elem').eq(i-1).children().first().invoke('text').then((text) => {
                cy.get(':nth-child(2) > .value').invoke('text').then((bp) => {
                    cy.get(`:nth-child(${i}) > :nth-child(5) > .w-full`).click().type(`impact ${text} mapping to ${bp}`)
                })
            })
            cy.wait(500)
        }

        cy.get('.primary-btn').click()
        cy.get('.Vue-Toastification__toast-body', {timeout:8000}).should('exist')
    })

    it('Checks BP-Asset mappings', () => {
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'demoTestingZ', 'Management', 'BCM', 'Business Processes')
        cy.get('.wrapper__header >').should('have.length', '4', {timeout:8000})
        
        //Mapping check
        cy.get('.list__body-elem').last().click()
        cy.get('.list__body').eq(2).children().should('have.length', '2')

        
        for (let i = 1; i < 3; i++) {
            cy.get(`:nth-child(${i}) > :nth-child(4) > .pl-3`).should('contain', '100')
            cy.get('.list__body').eq(2).children() //asset mappings
                .eq(i-1).children().as('childEls')
            cy.get('@childEls').first().invoke('text').then((id) => { //id of asset mapping
                cy.get('@childEls').eq(-2).should('contain', id)
            })
            //toAdd BP name
        }
    })
    
    //it('relink-assets')
    //it('relink-impacts')

    it('Cleanup', () => {
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'demoTestingZ', 'Management', 'BCM', 'Business Processes')
        cy.get('.wrapper__header >').should('have.length', '4', {timeout:8000})

        cy.deleteDataEntry('testingMVP')
    })
})