const { describe } = require("mocha")


//check adding/filling up assets with data
//edit accordingly
describe('Adding new asset and populating the data', { testIsolation:false }, () => {
    it('adds a new asset with pre-made data', () => {
        cy.clearCookies()
        cy.login('QA_user', 'zIaNuhpGz8uxZRazhSCU')
        cy.wait(750)
        cy.switchTenant('cypressTenantLukas')
        cy.wait(750)
        cy.openManagement('Risk', 'Asset Browser')
        cy.wait(750)

        cy.addDataEntry('test-add-asset', true)
        cy.wait(1000)

        // Assert that the asset is created and visible
        cy.get('.list__body-elem--select > :nth-child(2) > .overflow-hidden')
            cy.wait(200)
            .contains('test-add-asset')
        cy.get('.list__body-elem--select > :nth-child(2) > .overflow-hidden').should('be.visible');
        //

    })
    //set asset class values or nah
    it('propagates values from asset class', () => {
        cy.get('.wrapper__container').its('length').then((mappings) => {
            for (let i = 2; i < mappings; i++) {
                cy.get('.list__body').eq(i).find('.list__body-elem').its('length').then((items) => {
                        cy.contains('Class').children().first().click()
                        cy.wait(1000)
                        cy.get('.list__body-elem').first().click()
                        cy.wait(1000)
                        cy.get('.list__body').eq(i-1).find('.list__body-elem').should('have.length', items)
                        cy.go(-1)
                        cy.wait(1000)
                        cy.get('.list__body-elem').last().click()
                        cy.wait(1000)
                    })
            }
        })
        
        //prepare scenario for propagation -> commandize later
    })
})

//add depth
describe('Editing of asset', { testIsolation:false }, () => {
    it('Edits asset test-add-asset', () => {
        cy.editDataEntry()
        // Assert that the asset is updated
        cy.get('.list__body-elem--select > :nth-child(2) > .overflow-hidden')
            cy.wait(200)
            .contains('test-add-asset-update')
        cy.get('.list__body-elem--select > :nth-child(2) > .overflow-hidden')
            .should('be.visible');
        //
    })
})

describe('clone asset-threats and asset-controls', { testIsolation:false }, () => {
    it('clones asset mappings', () => {
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
            cy.get('.main-model-detail-container__header > .p-button > .duration-100 > path')
                cy.wait(200)
                .click()
            cy.get('.list__body-elem').last().click()
            cy.get('.main-model-detail-container__header > .p-button').click({force:true})

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
    })
})
