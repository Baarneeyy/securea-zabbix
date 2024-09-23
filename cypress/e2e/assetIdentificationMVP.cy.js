const { describe } = require("mocha")
/*
describe('shows assets with corresponding threats and controls', { testIsolation:false }, () => {
    it('opens asset browser', () => {
        cy.clearCookies()
        cy.login('QA_user', 'zIaNuhpGz8uxZRazhSCU')
        cy.switchTenant('cypressTenantProto')
        cy.openManagement('Risk Management', 'Asset Browser')
        cy.wait(1500)
    })
    it('check if threats and controls match in mapping and reg', () => {
        //maybe test isolation -> false
        //open main window -> check count of controls/threats per asset ->
        //go to mapping -> assert mapping count == main count -> iterate
        cy.get('.mr-1').find('span').invoke('text').then((text) => {
            text = text.replace(/[()]/g, '')
            cy.get('.list__body-elem').should('have.length', text) //asserts number count with actual count
            

            //iterates through every item and checks count printed count of threats/controls
            //against the amount of rows in the corresponding table
            //TODO -> add mapping checks; some counter check??
            for (let i = 0; i < parseInt(text); i++) {
                cy.get('.list__body-elem').eq(i).click()
                cy.get('.wrapper__header').its('length').then((headers) => {
                    for (let i = 1; i < headers; i++) {
                        cy.get('.wrapper__header').eq(i)
                            .children('.mr-1').find('span').invoke('text').then((count1) => {
                                count1 = count1.replace(/[()]/g, '')// commandize
                                cy.get('.list__body').eq(i) //selects the corresponding table;FURTHER MAPPING HERE
                                    .find('.list__body-elem').should('have.length', count1)
                            })

                    }
                })
                cy.wait(500)
            }
        })
    })
})
*/
//check adding/filling up assets with data
//edit accordingly
describe('Adding new asset and populating the data', { testIsolation:false }, () => {
    it('adds a new asset with pre-made data', () => {
        cy.clearCookies()
        cy.login('QA_user', 'zIaNuhpGz8uxZRazhSCU')
        cy.wait(750)
        cy.errCleanup
        //currently doesnt work
        //cy.switchTenant('cypressTenantTomas')
        cy.get('.p-dropdown-trigger').first().click()
        cy.contains('cypressTenantProto').click()
        cy.wait(750)
        cy.openManagement('Management' , 'Risk Management', 'Asset Browser')
        cy.wait(750)
        

        //CREATES AN ASSET WITH EVERY FIELD FILLED//
        //TODO -> create list with assets info to control later
        cy.contains("Add").click()
        cy.wait(750)
        cy.get('.p-inputtext.p-component').eq(1).type('test-add-asset', {delay:150})
            .should('have.value', 'test-add-asset') //Name

        cy.get('.p-inputtext.p-component').eq(2).type('testing creation of new asset') //Description

        cy.get('.p-dropdown-trigger').first().click() //Asset Class
        cy.get('.p-dropdown-items').children().first().click() //first in the list
        cy.wait(750)

        cy.get('.p-inputtext.p-component').eq(3).type('10') //Value  TODO-> Change according to Metodika analyzy
        
        cy.get('.p-inputtext.p-component').eq(4).type('testing creation of new asset') //Detail

        //Fills all dropdown boxes
        for (let i = 0; i < 6; i++) {
            cy.get('.p-dropdown-trigger').eq(i).click() //Dropdown Menu
            cy.get('.p-dropdown-items').children().first().click() //first in the list
            cy.wait(750)
        }
        cy.get('[data-cy="assetBrowser_create"] > .p-button-label').click({force:true})
        cy.wait(1000)
        cy.get('.ml-auto > .p-button-icon-only').click()
        
        // Assert that the asset is created and visible
        cy.get('.list__body-elem').last().as('createdAsset')
        cy.get('@createdAsset').click()
        cy.get('@createdAsset').should('have.class', 'list__body-elem--select')
        //cy.get('.list__body-elem--select > :nth-child(2) > .overflow-hidden').should('be.visible');
        //

    })
    //set asset class values or nah
    it.skip('propagates values from asset class', () => {
        cy.get('.wrapper__container').its('length').then((mappings) => {
            for (let i = 2; i < mappings; i++) {
                cy.get('.list__body').eq(i).find('.list__body-elem').its('length').then((items) => {
                        cy.contains('Class').children().first().click()
                        cy.wait(1000)
                        cy.get('.list__body-elem').first().click()
                        cy.wait(1000)
                        cy.get('.list__body').eq(i).find('.list__body-elem').should('have.length', items)
                        cy.go(-1)
                        cy.wait(1000)
                        cy.get('.list__body-elem').last().click()
                        cy.wait(1000)
                    })
            }
        })
        cy.wait(1000)
        //prepare scenario for propagation -> commandize later
    })
})

//add depth
describe('Editing of asset', { testIsolation:false }, () => {
    it('Edits asset test-add-asset', () => {
        cy.get('.list__body-elem').last().click()
        cy.wait(250)
        cy.get('.toolbar').children().first().click()
        cy.wait(750)
        cy.get('.p-inputtext.p-component').eq(1).type('{end}-update') //Name
        cy.get('.detail-toolbar__inner').children().first().click()
        cy.wait(1000)

        // Assert that the asset is updated
        cy.get('.list__body-elem--select > :nth-child(2) > .overflow-hidden')
            cy.wait(200)
            .contains('test-add-asset-update')
        cy.get('.list__body-elem--select > :nth-child(2) > .overflow-hidden')
            .should('be.visible');
        cy.deleteDataEntry('test-add-asset-update')
        //
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