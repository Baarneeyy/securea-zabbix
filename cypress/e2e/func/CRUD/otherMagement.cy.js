describe('Other Management CRUD', () => {
    it('Governing Documentation', () => {
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'tomas_workflow_tests', 'Management', 'Compliance Management', 'Governing Documentation')
        cy.wait(500)

        //Creation
        cy.contains('Add').should('exist').click()
        cy.wait(750)
        cy.get('.field--hidden > .p-inputtext').click().type('testing addition')
        cy.get('.p-inputtextarea').click().type('testing description')
        cy.get('.p-dropdown').first().click()
        cy.wait(250)
        cy.get('.p-dropdown-item').first().click()
        cy.get('.p-calendar').click()
        cy.wait(250)
        cy.get('[aria-label="23"]').click()
        cy.get('.p-inputnumber > .p-inputtext').click().type('3')

        cy.get('.flex > .p-inputtext').click().type('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
        cy.get('[data-cy="assetBrowser_create"] > .p-button-label').click()
        cy.get('.Vue-Toastification__toast-body').should('exist')

        //PostCreation assertions
        cy.get('.field--hidden > .field__value').should('contain', 'testing addition')
        cy.get(':nth-child(2) > .field__value').should('contain', 'testing description')
        cy.get('[style="grid-column: span 1 / auto;"] > .field__value').should('contain', 'Jane Doe')
        cy.get(':nth-child(4) > .field__value').should('contain', '23')
        cy.get(':nth-child(5) > .field__value').should('contain', '90')
        cy.get('.px-4 > .w-full > p').should('contain', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ')

        //Edit
        cy.wait(500)
        cy.get('.toolbar > :nth-child(1)').click()
        cy.get('.field--hidden > .p-inputtext').click().type('++')
        cy.get('.p-inputtextarea').click().type('++')
        cy.get('.p-dropdown').first().click()
        cy.wait(250)
        cy.get('.p-dropdown-item').eq(1).click()
        cy.get('.p-calendar').click()
        cy.wait(250)
        cy.get('[aria-label="24"]').click()
        cy.get('.p-inputnumber > .p-inputtext').click().type('{backspace}4')

        cy.get('.detail-toolbar__inner > .primary-btn').click()

        //PostEdit assertions
        cy.get('.field--hidden > .field__value').should('contain', '++')
        cy.get(':nth-child(2) > .field__value').should('contain', '++')
        cy.get('[style="grid-column: span 1 / auto;"] > .field__value').should('contain', 'Lisa Johnson')
        cy.get(':nth-child(4) > .field__value').should('contain', '24')
        cy.get(':nth-child(5) > .field__value').should('contain', '120')

        cy.deleteDataEntry('testing addition')
    })

    it('Clause for SoA creation', () => {
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'tomas_workflow_tests', 'Tenant', 'Configuration', 'Regulation Catalogue')
        cy.wait(500)
        cy.get('.list__body-elem').first().click()
        cy.wait(750)
        cy.get('.list__body').should('have.length', '2', {timeout:8000})
        cy.get('.wrapper > .wrapper__header > .ml-auto >')
            .eq(3).click() //ADD BUTTON
        
        //Creation
        cy.get(':nth-child(1) > .p-inputtext').click().type('testing addition')
        cy.get(':nth-child(2) > .p-inputtextarea').click().type('testing area')
        cy.get(':nth-child(3) > .p-inputtextarea').click().type('testing statement')
        cy.get(':nth-child(4) > .p-inputtextarea').click().type('testing assessment points')
        cy.get('.p-dropdown-label').click()
        cy.wait(500)
        cy.get('.p-dropdown-item').first().click()
        cy.get('.primary-btn').click()
        cy.wait(750)

        //PostCreate assertions
        cy.get(':nth-child(2) > .whitespace-pre-wrap').invoke('text')
            .then((text) => {
                let cleanedText = text.replace(/[\s\x00-\x1F\x7F-\uFFFF]+/g, '');
                expect(cleanedText).to.eq('testingaddition')
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
        cy.get(':nth-child(6) > .whitespace-pre-wrap').invoke('text')
            .then((text) => {
                let cleanedText = text.replace(/[\s\x00-\x1F\x7F-\uFFFF]+/g, '');
                expect(cleanedText).to.contain('5001')
            })
    })

    it('SoA edit', () => {
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'tomas_workflow_tests', 'Management', 'Compliance Management', 'Regulations')
        cy.wait(500)
        cy.get('.list__body-elem').first().click()
        cy.wait(750)
        cy.get('.list__body').should('have.length', '2', {timeout:8000})
        cy.get('.list__body').last()
            .find('.list__body-elem').last().click({force:true})
        cy.wait(250)
        cy.get('.flex > .transition').should('have.length', 3,{timeout:8000})
        cy.get('.flex > .transition').should('not.exist',{timeout:8000})
        cy.get(':nth-child(2) > .overflow-auto').invoke('text')
            .then((text) => {
                let cleanedText = text.replace(/[\s\x00-\x1F\x7F-\uFFFF]+/g, '');
                expect(cleanedText).to.contain('testingaddition')
            })
        //at soa view on last clause; before this it -> create new clause it statement; here edit checks
        
        //Edit
        cy.get('.primary-btn').click()
        cy.get(':nth-child(1) > .p-inputtextarea').click().type('testing applicable to')
        cy.get(':nth-child(2) > .p-inputtextarea').click().type('testing remediation')
        cy.get('.primary-btn').click()
        cy.get('.Vue-Toastification__toast-body').should('exist')
        cy.get(':nth-child(1) > .p-inputtextarea').invoke('val')
            .then((text) => {
                expect(text).to.contain('testing applicable to')
            })
        cy.get(':nth-child(2) > .p-inputtextarea').invoke('val')
            .then((text) => {
                expect(text).to.contain('testing remediation')
            })

    })

    it('Clause for SoA deletion', () => {
        let clauseName;
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'tomas_workflow_tests', 'Tenant', 'Configuration', 'Regulation Catalogue')
        cy.wait(500)
        cy.get('.list__body-elem').first().click()
        cy.wait(750)
        cy.get('.list__body').should('have.length', '2', {timeout:8000})
        cy.get('.list__body').last()
            .find('.list__body-elem').last().click({force:true})
        cy.wait(750)
        cy.get('.whitespace-pre-wrap').invoke('text')
            .then((text) => {
                let cleanedText = text.replace(/[\s\x00-\x1F\x7F-\uFFFF]+/g, '');
                expect(cleanedText).to.contain('testingaddition')
            })
        cy.get('.clause__detail__content__header__actions >').eq(2).click()
        cy.wait(250)
        cy.get('.p-confirm-popup-accept > .p-button-label').click({force:true})
    })

    it('Business Process', () => {
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'tomas_workflow_tests', 'Management', 'BCM', 'Business Process')
        cy.wait(250)

        //Creation
        cy.get('[data-cy="assetBrowser_add"]').click()
        cy.wait(250)
        cy.get('.field--hidden > .p-inputtext').click().type('testing addition')
        cy.get('.p-inputtextarea').click().type('testing description')
        cy.get('[data-cy="assetBrowser_create"]').click()

        //PostCreate asssertions
        cy.get('.Vue-Toastification__toast-body', {timeout:8000})
        cy.get('.field--hidden > .field__value').should('contain', 'testing addition')
        cy.get('.field--view > .field__value').should('contain', 'testing description')
        
        //Edit
        cy.get('.toolbar >').first().click()
        cy.get('.field--hidden > .p-inputtext').click().type('++')
        cy.get('.p-inputtextarea').click().type('++')
        cy.get('.items-center > .primary-btn').last().click()

        //PostEdit Assertions
        cy.get('.Vue-Toastification__toast-body', {timeout:8000})
        cy.get('.field--hidden > .field__value').should('contain', '++')
        cy.get('.field--view > .field__value').should('contain', '++')

        //Deletion
        cy.deleteDataEntry('testing addition')
    })

})