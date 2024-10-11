const { describe } = require("mocha")

describe('bum', () => {
    //'enters asset browser and create a new asset
    it.skip('asset browser showing assets and threats/controls', () => {
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'tomas_workflow_tests', 'Management', 'Risk Management', 'Asset Browser')
        cy.wait(250)
        cy.get('.transition', {timeout:8000}).should('not.exist')

        cy.get('.list__body >').its('length').then((length) => {
            cy.get('.text-base').should('contain', length)
        })

        cy.get('.list__body-elem').first().click()
        cy.wait(250)
        cy.get('.list__body-elem').first()
            .children().eq(2).invoke('text').then((text) => {
                cy.get(':nth-child(3) > .wrapper__header > .mr-1 > .text-base')
                    .should('contain', text)
            })
        cy.get('.list__body-elem').first()
            .children().eq(3).invoke('text').then((text) => {
                cy.get(':nth-child(2) > .wrapper__header > .mr-1 > .text-base')
                    .should('contain', text)
            })
    })
    it.skip('asset browser showing risk value per asset/ per threat', () => {
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'tomas_workflow_tests', 'Management', 'Risk Management', 'Asset Browser')
        cy.wait(250)
        cy.get('.transition', {timeout:8000}).should('not.exist')

        cy.get('.list__body >').its('length').then((length) => {
            cy.get('.text-base').should('contain', length)
        })

        cy.get('.list__body-elem').first().click()
        cy.wait(250)
        cy.get('.list__header__row').first().children().last().click()
        cy.wait(250)
        cy.get(':nth-child(17) > .px-3 > .w-full').click()
        cy.get(':nth-child(18) > .px-3 > .w-full').click()
        cy.get(':nth-child(19) > .px-3 > .w-full').click()
        cy.get('.browser-container__main-model-wrapper > .wrapper > .wrapper__header > .mr-1').click()
        cy.get('.list__header__row').first().children().should('have.length', '12')

        cy.get('.list__header__row').last().children().last().click()
        cy.wait(250)
        cy.get(':nth-child(6) > .px-3 > .w-full').click()
        cy.get(':nth-child(7) > .px-3 > .w-full').click()
        cy.get('.browser-container__main-model-wrapper > .wrapper > .wrapper__header > .mr-1').click()
        cy.get('.list__header__row').first().children().should('have.length', '8')
    })
})

describe.skip('Adding new asset and populating the data', () => {
    it('adds a new asset with pre-made data', () => {
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'tomas_workflow_tests', 'Management', 'Risk Management', 'Asset Browser')
        cy.wait(250)
        cy.get('.transition', {timeout:8000}).should('not.exist')
        cy.get('.wrapper__header >', {timeout:8000}).should('have.length', 4)

        cy.get('.list__body >').its('length').then((length) => {
            cy.get('.text-base').should('contain', length)
        })

        cy.get('[data-cy="assetBrowser_add"]').click()
        cy.wait(250)

        //Creation
        cy.get('.field--hidden > .p-inputtext').click().type('testingMVP')
        cy.get(':nth-child(2) > .p-inputtextarea').click().type('testing description')
        cy.get('.p-dropdown').first().click()
        cy.wait(250)
        cy.get('.p-dropdown-item').first().click()
        cy.get('.p-inputnumber > .p-inputtext').click().type('23')
        cy.get(':nth-child(5) > .p-inputtextarea').click().type('testing detail')
        
        cy.get('.p-dropdown').its('length').then((length) => {
            for (let i = 1; i < (length-2); i++) {
                cy.get('.p-dropdown').eq(i).click()
                cy.wait(250)
                cy.get('.p-dropdown-item').first().click()
            }
        })

        cy.wait(250)
        cy.get('[data-cy="assetBrowser_create"]').click()
        cy.get('.Vue-Toastification__toast-body', {timeout:8000}).should('exist')
    })
    //set asset class values or nah
    it('propagates values from asset class', () => {
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'tomas_workflow_tests', 'Management', 'Risk Management', 'Asset Browser')
        cy.wait(250)
        cy.get('.transition', {timeout:8000}).should('not.exist')

        cy.get('.list__body >').its('length').then((length) => {
            cy.get('.text-base').should('contain', length)
        })

        cy.get('.list__body-elem').last().click({force:true})
        cy.get(':nth-child(3) > .field__value').invoke('text')
            .then((text) => {
                let cleanedText = text.replace(/[\s\x00-\x1F\x7F-\uFFFF]+/g, '');
                //expect(cleanedText).to.eq('testingreqfullfill')
                cy.get(':nth-child(3) > .flex > a').click()
                cy.wait(750)
                cy.contains(text).click()
                cy.wait(15000)
                cy.get(':nth-child(2) > .wrapper__header > .mr-1 > .text-base')
                    .should('contain', '36')
                cy.get(':nth-child(3) > .wrapper__header > .mr-1 > .text-base')
                    .should('contain', '13')
            })

        //cy.get(':nth-child(3) > .flex > a').click()
        cy.wait(15000)
        //prepare scenario for propagation -> commandize later
    })
})

//add depth
describe.skip('Editing of asset; Owners; Propagation from Asset Class', () => {
    it('Edits asset testingMVP', () => {
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'tomas_workflow_tests', 'Management', 'Risk Management', 'Asset Browser')
        cy.wait(250)
        cy.get('.transition', {timeout:8000}).should('not.exist')

        cy.get('.list__body >').its('length').then((length) => {
            cy.get('.text-base').should('contain', length)
        })

        cy.get('.list__body-elem').last().click({force:true})

        cy.get('.toolbar >').first().click()
        cy.wait(250)

        cy.get('.field--hidden > .p-inputtext').click().type('++')
        cy.get(':nth-child(2) > .p-inputtextarea').click().type('++')
        cy.get('.p-dropdown').first().click()
        cy.get('.p-dropdown-item').eq(1).click()
        cy.get('.p-inputnumber > .p-inputtext').click().type('{backspace}6')
        cy.get(':nth-child(5) > .p-inputtextarea').click().type('++')
        
        cy.get('.items-center > .primary-btn').last().click()
        cy.get('.Vue-Toastification__toast-body', {timeout:8000}).should('exist')

        cy.get('.field--hidden > .field__value').should('contain', '++')
        cy.get(':nth-child(2) > .field__value').should('contain', '++')
        cy.get(':nth-child(3) > .field__value').should('not.contain', 'Fyzický')
        cy.get(':nth-child(4) > .field__value').should('not.contain', '3')
        cy.get(':nth-child(5) > .field__value').should('contain', '++')
    })

    it('Goes to Owner Browser & Checks if owner is in list', () => {
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'tomas_workflow_tests', 'Management', 'Risk Management', 'Asset Browser')
        cy.wait(250)
        cy.get('.transition', {timeout:8000}).should('not.exist')
        
        cy.get('.list__body >').its('length').then((length) => {
            cy.get('.text-base').should('contain', length)
        })

        cy.get('.list__body-elem').last().click({force:true})
        cy.wait(250)
        cy.get(':nth-child(6) > .flex > a').click()

        cy.url().then((url) => {
            expect(url).to.contain('owner-browser')
        })
        cy.get('.field--hidden > .field__value').should('contain', 'Jane Doe')
    })
    // Asset Class Repropagate; quick sorting test;
    //show asset detail/+controlThreats; generate Reports
    //cleanup of asset + asset class
    //delete asset

})

describe('propagation & cloning of mappings', () => {
    it.skip('Preps Asset Class', () => {
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'tomas_workflow_tests', 'Tenant', 'Configuration', 'Asset Class Catalogue')
        cy.wait(250)
        cy.get('.transition', {timeout:8000}).should('not.exist')
        cy.get('.wrapper__header >', {timeout:8000}).should('have.length', 4)
        
        cy.get('[data-cy="assetBrowser_add"]').click()
        cy.wait(250)
        cy.get('.field--hidden > .p-inputtext').click().type('testingAssetClass')
        cy.get('.p-inputtextarea').click().type('testing description')

        cy.get('[data-cy="assetBrowser_create"] > .p-button-label').click()
        cy.get('.Vue-Toastification__toast-body', {timeout:8000}).should('exist')

        //cy.get('.list__body-elem').last().click({force:true})
        cy.get(':nth-child(2) > .wrapper__header > a > .p-button').click()
        cy.wait(750)
        cy.get('.mt-4', {timeout:10000}).should('not.be.visible')

        //mappings
        cy.get(':nth-child(1) > :nth-child(5) > .flex > .checkbox-style')
            .click()
        cy.get(':nth-child(1) > :nth-child(6) > .w-full').click()
            .type('prep class for propagation')
        

        for (let i = 2; i < 10; i++) {
            cy.get(`:nth-child(${i}) > :nth-child(5) > .flex > .checkbox-style`).click()
        }

        cy.get('.splitpanes__pane > .wrapper > .wrapper__header > .mr-1')
            .click()
        
        cy.contains('Save').click()
        cy.get('.Vue-Toastification__toast-body', {timeout:8000}).should('exist')

        cy.go(-1)
        cy.get('.transition', {timeout:8000}).should('not.exist')
        cy.get('.wrapper__header').first().children({timeout:8000}).should('have.length', 4)

        cy.get('.list__body-elem').last().click({force:true})
        cy.wait(250)
        cy.get(':nth-child(3) > .wrapper__header > a > .p-button').click()
        cy.wait(750)
        cy.get('.mt-4', {timeout:10000}).should('not.be.visible')

        cy.get(':nth-child(1) > :nth-child(4) > .flex > .checkbox-style')
            .click()
        cy.get(':nth-child(1) > :nth-child(7) > .w-full')
            .click().type('testing vulnerability')
        
        for (let i = 2; i < 10; i++) {
            cy.get(`:nth-child(${i}) > :nth-child(4) > .flex > .checkbox-style`)
                .click({force:true})
        }
        cy.contains('Save').click()
        cy.wait(1000)
        cy.go(-1)

        cy.get('.transition', {timeout:8000}).should('not.exist')
        cy.get('.wrapper__header').first().children({timeout:8000}).should('have.length', 4)
        
        cy.get(':nth-child(3) > .wrapper__header > .mr-1 >')
            .should('contain', '9')
        cy.get('.list__body').last().children()
            .should('have.length', '9')
    })

    it.skip('Asset Class switch and Propagation', () => {
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'tomas_workflow_tests', 'Management', 'Risk Management', 'Asset Browser')
        cy.wait(250)
        cy.get('.transition', {timeout:8000}).should('not.exist')
        cy.get('.wrapper__header >', {timeout:8000}).should('have.length', 4)
        
        cy.get('.list__body >').its('length').then((length) => {
            cy.get('.text-base').should('contain', length)
        })

        cy.get('.list__body-elem').last().click({force:true})
        cy.wait(250)

        cy.get('.toolbar >').first().click()
        cy.wait(250)

        cy.get('.p-dropdown').first().click()
        cy.wait(500)
        cy.get('.p-dropdown-item').last().click()

        cy.get('.items-center > .primary-btn').last().click()
        cy.get('.Vue-Toastification__toast--warning > .Vue-Toastification__toast-body',
            {timeout:8000}
        ).should('exist')

        cy.get(':nth-child(3) > .wrapper__header > a > .p-button').click()
        cy.get('.flex-col > .mt-4', {timeout:8000}).should('exist')
        cy.get('.flex-col > .mt-4', {timeout:12000}).should('not.exist')

        //Check num of mappings prePropagation
        cy.get('.p-checkbox-input').click()
        cy.wait(250)
        cy.get('.splitpanes__pane > .wrapper > .wrapper__header > .mr-1 >')
            .should('contain', '13')

        //Threat PROPAGATION
        cy.get('.actions__body > :nth-child(2)').click()
        cy.wait(500)
        cy.get(':nth-child(2) > .p-button > .p-button-label').click()
        cy.get('.Vue-Toastification__toast-body', {timeout:8000}).should('exist')

        cy.get('.splitpanes__pane > .wrapper > .wrapper__header > .mr-1 >')
            .should('not.contain', '13')
        
        cy.go(-1)
        cy.get('.transition', {timeout:8000}).should('not.exist')
        cy.get('.wrapper__header').first().children({timeout:8000}).should('have.length', 4)

        cy.get(':nth-child(2) > .wrapper__header > a > .p-button').click()
        cy.get('.flex-col > .mt-4', {timeout:8000}).should('exist')
        cy.get('.flex-col > .mt-4', {timeout:12000}).should('not.exist')

        //Check num of mappings prePropagation
        cy.get('.p-checkbox-input').click()
        cy.wait(250)
        cy.get('.splitpanes__pane > .wrapper > .wrapper__header > .mr-1 >')
            .should('contain', '36')
        
        //Threat PROPAGATION
        cy.get('.actions__body > :nth-child(2)').click()
        cy.wait(500)
        cy.get(':nth-child(2) > .p-button > .p-button-label').click()
        cy.get('.Vue-Toastification__toast-body', {timeout:8000}).should('exist')

        cy.get('.splitpanes__pane > .wrapper > .wrapper__header > .mr-1 >')
            .should('not.contain', '36')
    })

    it.skip('Preps asset for cloning', () => {
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'tomas_workflow_tests', 'Management', 'Risk Management', 'Asset Browser')
        cy.wait(250)
        cy.get('.transition', {timeout:8000}).should('not.exist')
        cy.get('.wrapper__header >', {timeout:8000}).should('have.length', 4)
        cy.get('.list__body >').its('length').then((length) => {
            cy.get('.text-base').should('contain', length)
        })

        cy.contains('Add').should('exist').click()
        cy.wait(750)
        cy.get('.field--hidden > .p-inputtext').click().type('assetClone')
        cy.get('[data-cy="assetBrowser_create"]').click({force:true})
        cy.get('.Vue-Toastification__toast').should('exist', {timeout:8000})
        cy.wait(250)

        //PostCreate assertions
        cy.get('.field--hidden > .field__value').should('contain', 'assetClone')

    })

    it('Mapping cloning into & from', () => {
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'tomas_workflow_tests', 'Management', 'Risk Management', 'Asset Browser')
        cy.wait(250)
        cy.get('.transition', {timeout:8000}).should('not.exist')
        cy.get('.wrapper__header >', {timeout:8000}).should('have.length', 4)
        cy.get('.list__body >').its('length').then((length) => {
            cy.get('.text-base').should('contain', length)
        })

        cy.get('.list__body-elem').eq(-2).click({force:true})
        cy.wait(500)

        cy.get(':nth-child(3) > .wrapper__header > a > .p-button').click()
        cy.get('.flex-col > .mt-4', {timeout:8000}).should('exist')
        cy.get('.flex-col > .mt-4', {timeout:12000}).should('not.exist')

        cy.get('.actions__body > :nth-child(1)').click()
        cy.get(':nth-child(3) > .modal > .modal__body').should('exist')

        cy.get('.list__body').last() //modal table
            .find('.list__body-elem').last() //assetClone asset
            .click()
        
        cy.wait(500)
        cy.get('.mb-6 > .p-button').click()
        cy.get('.Vue-Toastification__toast', {timeout:8000}).should('exist')
        cy.wait(250)

        //check from other asset PoV
        //add/find way to check the api/requests sent
        

    })
})











describe.skip('clone asset-threats and asset-controls', { testIsolation:false }, () => {
    it('new cloning of assets', () => {
        cy.wait(1000)
        //HERE
        cy.addDataEntry('testClone')
        cy.wait(1500)
        cy.get('.main-model-detail-container__header').find('button').click()
        cy.wait(1000)
        cy.get('.list__body-elem').eq(-2).click();
        cy.wait(1000)
        cy.get(':nth-child(2) > .wrapper__header > a > .p-button > .icon-small').click();
        cy.wait(1000)
        cy.get(':nth-child(1) > .flex > .\\@\\[30rem\\]\\/main\\:\\!text-lg').click();
        cy.wait(1000)
        cy.get('.mb-14 > .wrapper > .wrapper__header > .relative > .p-inputtext').clear('t');
        cy.wait(1000)
        cy.get('.mb-14 > .wrapper > .wrapper__header > .relative > .p-inputtext').type('testClone{enter}');
        cy.wait(1000)
        cy.get('.list__body-elem').last().click()
        cy.wait(1000)
        cy.get('.mb-6 > .clone__button').click();
        cy.get('.Vue-Toastification__toast-body', { timeout: 1000 }).invoke('text').should('contains', 'Successful')
        cy.wait(1000)
        cy.get('.breadcrumbs__content > :nth-child(3) > .flex').click();
        cy.wait(1000)
        cy.get('.list__body-elem').eq(-2).click();
        cy.wait(1000)
        cy.get(':nth-child(3) > .wrapper__header > a > .p-button > .icon-small').click();
        cy.wait(1000)
        cy.get('.actions__body > :nth-child(1)').click();
        cy.wait(1000)
        cy.get('.mb-14 > .wrapper > .wrapper__header > .relative > .p-inputtext').clear('t');
        cy.wait(1000)
        cy.get('.mb-14 > .wrapper > .wrapper__header > .relative > .p-inputtext').type('testClone{enter}');
        cy.wait(1000)
        cy.get('.list__body-elem').last().click();
        cy.wait(1000)
        cy.get('.mb-6 > .clone__button').click();
        cy.get('.Vue-Toastification__toast-body', { timeout: 1000 }).invoke('text').should('contains', 'Successful')
        cy.wait(1000)
        cy.get('.breadcrumbs__content > :nth-child(3) > .flex').click();
        cy.wait(1000)
        cy.get(':nth-child(23) > :nth-child(2) > .overflow-hidden').click();
        cy.wait(1000)
        cy.reload()
        cy.get('.list__body-elem').last().children().eq(6).find('p').should('contain', '14')
        cy.get('.list__body-elem').last().children().eq(7).find('p').should('contain', '2')
        cy.wait(500)
        cy.deleteDataEntry('test-add-asset-update')
        cy.wait(500)
        cy.deleteDataEntry('testClone')
    })
    
    /*it('clones asset mappings', () => {
        let values = {
            control: ['1%', -2],
            threat: ['55', -3]
        }
        
        
        cy.get('.list__body-elem')
        cy.addDataEntry('testClone')
        cy.wait(750)
        
        cy.get('.list__body-elem').eq(-2).click()
        cy.wait(750)
        cy.get('.main-model-detail-container__header').find('button').click({ force:true })
        //for dataEntryCreation -> selectable assetClass for this case
        cy.wait(1000)
        for (let i = 2; i < 4; i++) {
            cy.get('.wrapper__header').eq(i)
                .children().last().click() // selects and opens mapping
            cy.wait(1000)
            cy.get('.actions__body-btn').first().click() //opens clone menu
            cy.wait(1000)
            cy.get('.p-inputtext.p-component').last().type(`testClone{enter}`)
            //toCHECK sometimes prints error, find better way of selecting
            cy.wait(1000)
            cy.get('.list__table').last().find('tbody')
                .children().last().click({force:true})
            cy.wait(500)
            cy.get('.clone__button').first().click()
            cy.wait(500)
            cy.get('.Vue-Toastification__toast-body', { timeout:2000 }).should('be.visible')
            //cy.get('.breadcrumbs__content > :nth-child(2) > .flex').click()
            cy.go(-1)
            cy.wait(1000)
            // z random dôvodu to nevie nájsť asset(šípku)

            cy.get('.list__body-elem').last().click()
            //cy.get('.main-model-detail-container__header > .p-button').click({force:true})
            cy.wait(1000)
            //todo -> make functional
            //current problem -> value doesnt get parsed
            cy.get('.wrapper__header').eq(i).find('h3').invoke('text')
                .then((text) => {
                    let value
                    if (text.includes('Asset Controls')) {
                        value = values.control
                    } 
                    else if (text.includes('Asset Threats')) {
                        value = values.threat
                    }
                    //changeable based on type of mapping
                    for (let e = 1; e < 3; e++) {
                        cy.get('.list__body-elem').eq(-e).children().eq(value[1])
                            .find('p').invoke('text').then((text) => {
                                expect(text).to.include(value[0])
                            })
                        }
                    })         
            cy.wait(500)
            cy.get('.main-model-detail-container__header > .p-button').click()
            cy.get('.list__body-elem').eq(-2).click()
            cy.get('.main-model-detail-container__header > .p-button').click()

            // Add assertions to check if the cloned asset mappings are visible
            cy.get('.list__body')
                cy.wait(200)
                .contains('cloned-mapping')
                .should('be.visible');
            //
        }
        cy.wait(500)
        cy.deleteDataEntry('test-add-asset-update')
        cy.wait(500)
        cy.deleteDataEntry('testClone')
    })*/
})
/*
describe('sorting assets', { testIsolation:false }, () => {
    it ("logins", () => {
        cy.clearCookies()
        cy.login('demo', '16w99aH2GS')
        cy.switchTenant('cypressTenantProto')
        cy.openManagement('Risk Management', 'Asset Browser')
        cy.wait(750)
        cy.url().then((url) => {
            Cypress.env('currentPageURL', url);
        });
        cy.sortName(2, 1)  
    });
    
    it ('sortsRV', () => {
        let url = Cypress.env('currentPageURL')
        cy.visit()
        cy.sort(3,2)
    })
    it ('sortsTC', () => {
        cy.visit(Cypress.env('currentPageURL'))

        cy.sort(4,3)
    })
    it ('sortsCC', () => {
        cy.visit(Cypress.env('currentPageURL'))

        cy.sort(5,4)
    })
    
})*/


//UPDATE TO INCORPORATE NEW REPORT MANAGER
describe.skip('ability to generate & open reports', { testIsolation:false }, () => {
    it('generates reports', () => {
        //cy.visit('https://securea-dev.germanywestcentral.cloudapp.azure.com/#/t/381/')
        cy.openManagement('Risk Management', 'Asset Browser')
        cy.wait(750)
        cy.get('.list__body-elem').first().click()
        cy.wait(750)
        cy.contains('Generate Detailed Asset Report').click()
        cy.wait(1000)
        cy.get('.Vue-Toastification__toast').should('have.length', '1')
        cy.get('.Vue-Toastification__toast-component-body > .flex > p').invoke('text').then((text) => {
            expect(text).to.include('Generated Successfully')
        })
        cy.get('.Vue-Toastification__toast-component-body').find('div').find('.cursor-pointer').click()
        cy.get('.text-2xl').click()
        cy.url().should('include', '/report-viewer/asset_report/')
    })


    /*it('reports links', () => {
        cy.contains('Report Version').click({force:true})
        cy.wait(1000)
        cy.contains('Save Version').should('exist').click()
        cy.wait(1000)
        cy.get('.p-dropdown-label:not(.px-2)').click()
        cy.wait(750)
        cy.get('.p-dropdown-item').first().should('not.have.text', 'Current Version')
        cy.get('.modal__header-btn').filter(':visible').click()
        cy.wait(750)
    })

    it('save report', () => {
        cy.contains('Export Report').click({force:true})
        cy.wait(1000)
        cy.get('.modal__header-btn').filter(':visible').click()
        cy.get('.export__button').click()
        cy.verifyDownload('securea_asset_report_export', { contains:true });
    })*/
})