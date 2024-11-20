describe('Configuration Catalogues + Security Posture', () => {
    it('Asset Class', () => {
        cy.setupUser(Cypress.env('PRE_USER_ADMIN'), Cypress.env('PRE_PASS_ADMIN'), 'tomas_workflow_tests', 'Tenant', 'Configuration', 'Asset Class Catalogue')
        cy.wait(250)
        cy.get('.wrapper__header >').should('have.length', '4', {timeout:8000})


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
    it('Owner', () => {
        cy.setupUser(Cypress.env('PRE_USER_ADMIN'), Cypress.env('PRE_PASS_ADMIN'), 'tomas_workflow_tests', 'Tenant', 'Configuration', 'Owner Browser')
        cy.wait(250)

        //Creation
        cy.get('[data-cy="assetBrowser_add"]').click()
        cy.wait(250)
        cy.get('.field--hidden > .p-inputtext').click().type('testing addition')
        cy.get(':nth-child(2) > .p-inputtext').first().click().type('testing role')
        cy.get('.p-inputtextarea').click().type('testing description')
        cy.get('[data-cy="assetBrowser_create"]').click()

        //PostCreate asssertions
        cy.get('.Vue-Toastification__toast-body', {timeout:8000})
        cy.get('.field--hidden > .field__value').should('contain', 'testing addition')
        cy.get(':nth-child(2) > .field__value').should('contain', 'testing role')
        cy.get(':nth-child(3) > .field__value').should('contain', 'testing description')
        
        //Edit
        cy.get('.toolbar >').first().click()
        cy.get('.field--hidden > .p-inputtext').click().type('++')
        cy.get(':nth-child(2) > .p-inputtext').first().click().type('++')
        cy.get('.p-inputtextarea').click().type('++')
        cy.get('.items-center > .primary-btn').last().click()

        //PostEdit Assertions
        cy.get('.Vue-Toastification__toast-body', {timeout:8000})
        cy.get('.field--hidden > .field__value').should('contain', '++')
        cy.get(':nth-child(2) > .field__value').should('contain', '++')
        cy.get(':nth-child(3) > .field__value').should('contain', '++')

        //Deletion
        cy.deleteDataEntry('testing addition')
    })

    //Add regulation crud
    it('Regulation', () => {
        cy.setupUser(Cypress.env('PRE_USER_ADMIN'), Cypress.env('PRE_PASS_ADMIN'), 'tomas_workflow_tests', 'Tenant', 'Configuration', 'Regulation Catalogue')
        cy.wait(250)
        cy.get('.list__body-elem').first().click()
        cy.get('.list__body').should('have.length', '2', {timeout:12000})
        cy.get('.wrapper__header:last >:last > :first')
            .click() //Add button
        cy.wait(500)

        //Creation
        cy.get(':nth-child(1) > .p-inputtext').click().type('testing addition')
        cy.get(':nth-child(2) > .p-inputtextarea').click().type('testing area')
        cy.get(':nth-child(3) > .p-inputtextarea').click().type('testing statement')
        cy.get(':nth-child(4) > .p-inputtextarea').click().type('testing assessment points')
        /*cy.get('.p-dropdown-label').click()
        cy.wait(500)
        cy.get('.p-dropdown-item').first().click()*/
        cy.get('.primary-btn').click()

        cy.wait(500)
        cy.get('.Vue-Toastification__toast-body').should('exist', {timeout:8000})

        //PostCreation assertions
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
        /*cy.get(':nth-child(6) > .whitespace-pre-wrap').invoke('text')
            .then((text) => {
                let cleanedText = text.replace(/[\s\x00-\x1F\x7F-\uFFFF]+/g, '');
                expect(cleanedText).to.contain('5001')
            })*/
        
        //Edit
        cy.get('.clause__detail__content__header__actions >').eq(1).click()
        cy.get('.clause__detail__content__grid > :nth-child(2) > .p-inputtext')
            .click().type('++')
        cy.get(':nth-child(3) > .p-inputtextarea').click().type('++')
        cy.get(':nth-child(4) > .p-inputtextarea').click().type('++')
        cy.get(':nth-child(5) > .p-inputtextarea').click().type('++')        
        /*cy.get('.p-dropdown-label').click()
        cy.wait(500)
        cy.get('.p-dropdown-item').eq(1).click()*/
        cy.get('.primary-btn').click()

        cy.get('.Vue-Toastification__toast-body').should('exist', {timeout:8000})
        
        cy.get(':nth-child(2) > .whitespace-pre-wrap').invoke('text')
            .then((text) => {
                let cleanedText = text.replace(/[\s\x00-\x1F\x7F-\uFFFF]+/g, '');
                expect(cleanedText).to.contain('++')
            })
        
        cy.get(':nth-child(3) > .whitespace-pre-wrap').invoke('text')
            .then((text) => {
                let cleanedText = text.replace(/[\s\x00-\x1F\x7F-\uFFFF]+/g, '');
                expect(cleanedText).to.contain('++')
            })
        
        cy.get(':nth-child(4) > .whitespace-pre-wrap').invoke('text')
            .then((text) => {
                let cleanedText = text.replace(/[\s\x00-\x1F\x7F-\uFFFF]+/g, '');
                expect(cleanedText).to.contain('++')
            })
        
        cy.get(':nth-child(5) > .whitespace-pre-wrap').invoke('text')
            .then((text) => {
                let cleanedText = text.replace(/[\s\x00-\x1F\x7F-\uFFFF]+/g, '');
                expect(cleanedText).to.contain('++')
            })
        
        /*cy.get(':nth-child(6) > .whitespace-pre-wrap').invoke('text')
            .then((text) => {
                let cleanedText = text.replace(/[\s\x00-\x1F\x7F-\uFFFF]+/g, '');
                expect(cleanedText).to.contain('5002')
            })*/
        
        //Deletion
        cy.get('.clause__detail__content__header__actions >').eq(2).click()
        cy.wait(250)
        cy.get('.p-confirm-popup-accept').click()

    })

    it('Requirements', () => {
        cy.setupUser(Cypress.env('PRE_USER_ADMIN'), Cypress.env('PRE_PASS_ADMIN'), 'tomas_workflow_tests', 'Tenant', 'Configuration', 'Security Requirements Catalogue')
        cy.wait(250)

        //Creation
        cy.get('[data-cy="assetBrowser_add"]').click()
        cy.wait(250)
        cy.get('.wrapper__header >').should('have.length', 4)
        cy.get('.field--hidden > .p-inputtext').click().type('testing addition')
        cy.get(':nth-child(2) > .p-inputtextarea').click().type('testing source')
        cy.get(':nth-child(3) > .p-inputtextarea').click().type('testing description')
        cy.get('[data-cy="assetBrowser_create"]').click()

        //PostCreate asssertions
        cy.get('.Vue-Toastification__toast-body', {timeout:8000})
        cy.get('.field--hidden > .field__value').should('contain', 'testing addition')
        cy.get(':nth-child(2) > .field__value').should('contain', 'testing source')
        cy.get(':nth-child(3) > .field__value').should('contain', 'testing description')

        //Edit
        cy.get('.toolbar >').first().click()
        cy.wait(500)
        cy.get('.field--hidden > .p-inputtext').click().type('++')
        cy.get(':nth-child(2) > .p-inputtextarea').click().type('++')
        cy.get(':nth-child(3) > .p-inputtextarea').click().type('++')
        cy.get('.primary-btn').eq(1).click()

        //PostEdit asssertions
        cy.get('.Vue-Toastification__toast-body', {timeout:8000})
        cy.get('.field--hidden > .field__value').should('contain', '++')
        cy.get(':nth-child(2) > .field__value').should('contain', '++')
        cy.get(':nth-child(3) > .field__value').should('contain', '++')

        cy.deleteDataEntry('testing addition')


        
    })

    it('BCM', () => {
        cy.setupUser(Cypress.env('PRE_USER_ADMIN'), Cypress.env('PRE_PASS_ADMIN'), 'tomas_workflow_tests', 'Tenant', 'Configuration', 'BCM')
        cy.wait(250)
        cy.get('.wrapper__header >').should('have.length', 4, {timeoout:8000})

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

    it('Create requirement for Security Posture', () => {
        cy.setupUser(Cypress.env('PRE_USER_ADMIN'), Cypress.env('PRE_PASS_ADMIN'), 'tomas_workflow_tests', 'Tenant', 'Configuration', 'Security Requirements Catalogue')
        cy.wait(250)

        //Creation
        cy.get('[data-cy="assetBrowser_add"]').click()
        cy.wait(250)
        cy.get('.wrapper__header >', {timeout:8000}).should('have.length', 4)
        cy.get('.field--hidden > .p-inputtext').click().type('testing addition')
        cy.get(':nth-child(2) > .p-inputtextarea').click().type('testing source')
        cy.get(':nth-child(3) > .p-inputtextarea').click().type('testing description')
        cy.get('[data-cy="assetBrowser_create"]').click()

        //PostCreate asssertions
        cy.get('.Vue-Toastification__toast-body', {timeout:8000})
        cy.get('.field--hidden > .field__value').should('contain', 'testing addition')
        cy.get(':nth-child(2) > .field__value').should('contain', 'testing source')
        cy.get(':nth-child(3) > .field__value').should('contain', 'testing description')
    })

    it('Security Posture', () => {
        cy.setupUser(Cypress.env('PRE_USER_ADMIN'), Cypress.env('PRE_PASS_ADMIN'), 'tomas_workflow_tests', 'Security Posture', 'none', 'none')
        cy.wait(250)

        //Requirement Fullfillment
        cy.get('.transition', {timeout:8000}).should('not.exist')
        cy.get('.list__body-elem').last().click({force:true})
        cy.wait(750)
        cy.get('.primary-btn').click()
        cy.get(':nth-child(1) > .p-2 > .p-inputtextarea').click().type('testing req fullfill')
        cy.get(':nth-child(2) > .p-2 > .p-inputtextarea').click().type('testing corrective action')
        cy.get('.p-inputnumber > .p-inputtext').click().type('3')
        cy.get('.dropdown-toggle').click()
        cy.get('.option-item').first().click()
        cy.get('.primary-btn').click()

        cy.get('.Vue-Toastification__toast-body').should('exist')

        cy.get(':nth-child(1) > .p-2 > .p-inputtextarea').invoke('val')
            .then((text) => {
                let cleanedText = text.replace(/[\s\x00-\x1F\x7F-\uFFFF]+/g, '');
                expect(cleanedText).to.eq('testingreqfullfill')
            })
        cy.get(':nth-child(2) > .p-2 > .p-inputtextarea').invoke('val')
            .then((text) => {
                let cleanedText = text.replace(/[\s\x00-\x1F\x7F-\uFFFF]+/g, '');
                expect(cleanedText).to.eq('testingcorrectiveaction')
            })
    })

    it('Delete Requirement for Security Posture', () => {
        cy.setupUser(Cypress.env('PRE_USER_ADMIN'), Cypress.env('PRE_PASS_ADMIN'), 'tomas_workflow_tests', 'Tenant', 'Configuration', 'Security Requirements Catalogue')
        cy.wait(250)

        cy.deleteDataEntry('testing addition')
    })
})