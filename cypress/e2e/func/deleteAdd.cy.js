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
        cy.deleteDataEntry('testingAddition')

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
        cy.deleteDataEntry('ll')
    })
})

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
        cy.get('[data-v-0a809ccf=""][data-v-ff773ba8=""] > .wrapper > .wrapper__header > .ml-auto >')
            .first().click() //ADD BUTTON
        
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

describe('Configuration Catalogues + Security Posture', () => {
    it('Asset Class', () => {
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'tomas_workflow_tests', 'Tenant', 'Configuration', 'Asset Class Catalogue')
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

    it('Owner', () => {
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'tomas_workflow_tests', 'Tenant', 'Configuration', 'Owner Browser')
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
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'tomas_workflow_tests', 'Tenant', 'Configuration', 'Regulation Catalogue')
        cy.wait(250)
        cy.get('.list__body-elem').first().click()
        cy.get('.list__body').should('have.length', '2', {timeout:12000})
        cy.get('[data-v-0a809ccf=""][data-v-7710b6c6=""] > .wrapper > .wrapper__header > .ml-auto >')
            .first().click() //Add button
        cy.wait(500)

        //Creation
        cy.get(':nth-child(1) > .p-inputtext').click().type('testing addition')
        cy.get(':nth-child(2) > .p-inputtextarea').click().type('testing area')
        cy.get(':nth-child(3) > .p-inputtextarea').click().type('testing statement')
        cy.get(':nth-child(4) > .p-inputtextarea').click().type('testing assessment points')
        cy.get('.p-dropdown-label').click()
        cy.wait(500)
        cy.get('.p-dropdown-item').first().click()
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
        cy.get(':nth-child(6) > .whitespace-pre-wrap').invoke('text')
            .then((text) => {
                let cleanedText = text.replace(/[\s\x00-\x1F\x7F-\uFFFF]+/g, '');
                expect(cleanedText).to.contain('5001')
            })
        
        //Edit
        cy.get('.clause__detail__content__header__actions >').eq(1).click()
        cy.get('.clause__detail__content__grid > :nth-child(2) > .p-inputtext')
            .click().type('++')
        cy.get(':nth-child(3) > .p-inputtextarea').click().type('++')
        cy.get(':nth-child(4) > .p-inputtextarea').click().type('++')
        cy.get(':nth-child(5) > .p-inputtextarea').click().type('++')        
        cy.get('.p-dropdown-label').click()
        cy.wait(500)
        cy.get('.p-dropdown-item').eq(1).click()
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
        
        cy.get(':nth-child(6) > .whitespace-pre-wrap').invoke('text')
            .then((text) => {
                let cleanedText = text.replace(/[\s\x00-\x1F\x7F-\uFFFF]+/g, '');
                expect(cleanedText).to.contain('5002')
            })
        
        //Deletion
        cy.get('.clause__detail__content__header__actions >').eq(2).click()
        cy.wait(250)
        cy.get('.p-confirm-popup-accept').click()

    })

    it('Requirements', () => {
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'tomas_workflow_tests', 'Tenant', 'Configuration', 'Security Requirements Catalogue')
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
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'tomas_workflow_tests', 'Tenant', 'Configuration', 'BCM')
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

    it('Create requirement for Security Posture', () => {
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'tomas_workflow_tests', 'Tenant', 'Configuration', 'Security Requirements Catalogue')
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
    })

    it('Security Posture', () => {
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'tomas_workflow_tests', 'Security Posture', 'none', 'none')
        cy.wait(250)

        //Requirement Fullfillment
        cy.get('.transition').should('not.exist', {timeout:8000})
        cy.get('.list__body-elem').last().click({force:true})
        cy.wait(750)
        cy.get('.primary-btn').click()
        cy.get(':nth-child(1) > .p-2 > .p-inputtextarea').click().type('testing req fullfill')
        cy.get(':nth-child(2) > .p-2 > .p-inputtextarea').click().type('testing corrective action')
        cy.get('.p-inputnumber > .p-inputtext').click().type('3')
        cy.get('.p-dropdown-label').click()
        cy.get('.p-dropdown-item').first().click()
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
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'tomas_workflow_tests', 'Tenant', 'Configuration', 'Security Requirements Catalogue')
        cy.wait(250)

        cy.deleteDataEntry('testing addition')
    })
})
