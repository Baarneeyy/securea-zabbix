describe('newly made asset has threats and controls assigned from asset class', { testIsolation:false }, () => {
    it('creates a new asset', () => {
        cy.clearCookies()
        cy.login('QA_user', 'zIaNuhpGz8uxZRazhSCU')
        cy.wait(750)
        cy.get('body').then($body => {
            if ($body.find('.Vue-Toastification__close-button').length > 0) {
                cy.get('.Vue-Toastification__close-button').click()
            }
        })
        cy.switchTenant('cypressTenantProto')
        cy.wait(750)
        cy.openManagement('Risk', 'Asset Browser')
        cy.wait(750)
        cy.addDataEntry('test-add-asset', true)
    })
    it('check if threats and controls match in mapping and reg', () => {
        //maybe test isolation -> false
        //open main window -> check count of controls/threats per asset ->
        //go to mapping -> assert mapping count == main count -> iterate
        cy.get('.mr-1').first().find('span').invoke('text').then((text) => {
            text = text.replace(/[()]/g, '')
            cy.get('.main-model-detail-container__header').children().click()
            cy.get('.list__body-elem').should('have.length', text) //asserts number count with actual count
            cy.get('.main-model-detail-container__header').children().click()

            cy.get('.wrapper__header').eq(2).find('.mr-1').find('span').invoke('text').then((entryCount) => {
                entryCount = entryCount.replace(/[()]/g, '')
                cy.get('.flex.items-center.field__name').eq(2).parent().children().eq(1).invoke('text').then((assetClass) => {
                    cy.get('.flex.items-center.field__name').eq(2).children().click()
                    cy.wait(750)
                    cy.Searchbar(assetClass)
                    cy.get('.list__body-elem').click()
                    cy.wait(750)
                    cy.get('.list__body').eq(1).find('.list__body-elem').should('have.length', entryCount)
                })
            })
            cy.go(-1)
            cy.wait(750)
            
        })
    })
    /*
        it('checks if threats are correctly mapped to asset', () => {
            cy.get('.list__body-elem').last().click()
            cy.checkMappedAmount(3, 2)
        })
    */
})



//third and fourth items are nums
describe('assigned threats manipulation', () => {
    it('logs in and adjusts mappings', () => {
        cy.login('QA_user', 'zIaNuhpGz8uxZRazhSCU')
        cy.get('body').then($body => {
            if ($body.find('.Vue-Toastification__close-button').length > 0) {
                cy.get('.Vue-Toastification__close-button').click()
            }
        })
        cy.switchTenant('cypressTenantProto')
        cy.openManagement('Risk', 'Asset Browser')
        cy.wait(750)
        cy.get('.list__body-elem').last().click()
        //make val selectable
        let value = 4
        cy.get('.list__body').last().find('.list__body-elem').first().children().eq(2).find('p').invoke('text').then((originalVal) => {
            cy.get('.wrapper__header').last().find('a').click()
            cy.wait(1750)
            cy.get(`:nth-child(3) > :nth-child(${value}) > .p-inputnumber > .p-inputtext`).as('threatVal').invoke('val').then(text => {
                cy.log(text)
                cy.get('@threatVal').type('{selectAll}{del}3')
                cy.get('.list__body-elem').eq(26).click({force:true})
                cy.wait(750)
                cy.contains('Save').click()
                cy.wait(750)
                cy.go(-1)
                cy.wait(750)
                cy.get('.list__body').last().find('.list__body-elem').first().children().eq(2).find('p').should('not.have.text', originalVal)
            })
        })
        cy.get('.list__body').last().find('.list__body-elem').first().children().eq(3).find('p').invoke('text').then((originalVal) => {
            cy.get('.wrapper__header').last().find('a').click()
            cy.wait(1750)
            cy.get(`:nth-child(3) > :nth-child(5) > .p-inputnumber > .p-inputtext`).as('threatVal').invoke('val').then(text => {
                cy.log(text)
                cy.get('@threatVal').type('{selectAll}{del}9')
                cy.get('.list__body-elem').eq(26).click({force:true})
                cy.wait(750)
                cy.contains('Save').click()
                cy.wait(750)
                cy.go(-1)
                cy.wait(750)
                cy.get('.list__body').last().find('.list__body-elem').first().children().eq(3).find('p').should('not.have.text', originalVal)
            })

        })
        cy.get('.list__body').last().find('.list__body-elem').first().children().eq(4).find('p').invoke('text').then((originalVal) => {
            cy.get('.wrapper__header').last().find('a').click()
            cy.wait(3000)
            cy.get('.list__body').eq(1).find('.list__body-elem').eq(2).click()
            cy.wait(750)
            cy.get('.p-inputtextarea').type('{selectAll}{del}update').click()
            cy.contains('Save').click()
            cy.wait(750)
            cy.go(-1)
            cy.wait(1000)
            cy.get('.list__body').last().find('.list__body-elem').first().children().eq(4).find('p').should('not.have.text', originalVal)
        })
        cy.get('.list__body').last().find('.list__body-elem').its('length').then((originalLength) => {
            cy.get('.wrapper__header').last().find('a').click()
            cy.wait(1750)
            cy.get('.list__body').eq(1).find('.list__body-elem').eq(4).children().eq(2).click()
            cy.wait(750)
            cy.contains('Save').click()
            cy.wait(750)
            cy.go(-1)
            cy.wait(750)
            cy.get('.list__body').last().find('.list__body-elem').should('not.have.length', originalLength)
        })
        cy.get('.list__body').last().find('.list__body-elem').first().children().as('newVal')
        cy.get('@newVal').eq(2).should('have.text', '3%')
        cy.get('@newVal').eq(3).should('have.text', '9')
        cy.get('@newVal').eq(4).should('have.text', 'update')
    })

})
//threat -> control test
//applied controls -> potential benefit
describe('control manipulation', () => {
    it('logs in and adjusts control mappings', () => {
        cy.login('QA_user', 'zIaNuhpGz8uxZRazhSCU')
        cy.get('body').then($body => {
            if ($body.find('.Vue-Toastification__close-button').length > 0) {
                cy.get('.Vue-Toastification__close-button').click()
            }
        })
        cy.wait(750)
        cy.openManagement('Risk', 'Asset Browser')
        cy.wait(750)
        cy.get('.list__body-elem').last().click()
        cy.wait(750)
        cy.get('.list__body').eq(2).find('.list__body-elem').its('length').then((originalLength) => {
            cy.get('.wrapper__header').eq(2).find('a').click()
            cy.wait(3000)
            cy.get('.list__body').eq(1).find('.list__body-elem').last().children().eq(2).click()
            cy.wait(750)
            cy.get('.list__body').eq(1).find('.list__body-elem').eq(1).children().eq(3).type('{selectAll}{del}5').parent().click()
            cy.wait(750)
            cy.get('.p-inputtextarea').type('{selectAll}{del}update')
            cy.wait(750)
            cy.contains('Save').click()
            cy.wait(750)
            cy.go(-1)
            cy.wait(1000)
            cy.get('.list__body').eq(2).find('.list__body-elem').as('controls')
            //cy.get('@controls').should('not.have.length', originalLength)
            cy.get('@controls').first().find('td').eq(4).should('have.text', '5%')
            cy.get('@controls').first().find('td').eq(3).should('have.text', 'update')
        })
        cy.wait(750)
        cy.get('.main-model-detail-container__header').find('button').click()
        cy.deleteDataEntry()
    })
})
/*
    describe('create and edit risk assessment report', () => {
        it('opens risk assessment report', () => {
            cy.login('QA_user', 'zIaNuhpGz8uxZRazhSCU')
            cy.wait(750)
            cy.switchTenant('cypressTenantProto')
            cy.wait(750)
            cy.openManagement('Risk', 'Risk Assessment Report')
            cy.wait(750)
            
            cy.url().should('contain', 'risk-report')
            cy.get('.mr-1').find('span').invoke('text').then((text) => {
                text = text.replace(/[()]/g, '')
                cy.get('.list__body-elem').should('have.length', text)
            })
        })
        
        it('creates and checks risk assignment', () => {
            cy.login('QA_user', 'zIaNuhpGz8uxZRazhSCU')
            cy.wait(750)
            cy.switchTenant('cypressTenantProto')
            cy.wait(750)
            cy.openManagement('Risk', 'Risk Assessment Report')
            cy.wait(750)
            cy.get('.list__body-elem').last().click();

            cy.contains('Threats').invoke('text').then((text) => {
                cy.get('.list__body').eq(1).find('.list__body-elem')
                    .should('have.length', text.replace(/[a-zA-Z\s()]/g, ''))
            })

            cy.contains('Controls').invoke('text').then((text) => {
                cy.get('.list__body').eq(2).find('.list__body-elem')
                    .should('have.length', text.replace(/[a-zA-Z\s()]/g, ''))
            })

            cy.wait(1000)

            cy.get('.list__body').last().find('div').find('.list__body-elem__default').as('RiskVals').its('length').then((length) => {
                for (let i = 0; i < length; i++) {
                    if (i == 0) {
                        cy.get('@RiskVals').first().children().last().click()
                        cy.contains('Alex Weaver').click()
                    }else {
                        cy.get('@RiskVals').eq(i).find('textarea').type('testing risk assignment')
                    }
                    cy.wait(750)
                }
                cy.contains('Save').click()
                cy.wait(750)
            })
            cy.get('.list__body-elem').first().click({force:true})
            cy.wait(750)
            cy.get('.wrapper__header').first().children().last().click()
            cy.wait(750)
            cy.get('.list__body-elem').last().click()
            cy.wait(750)

            cy.get('.list__body').last().find('div').find('.list__body-elem__default').as('RiskVals').its('length').then((length) => {
                for (let i = 0; i < length; i++) {
                    if (i == 0) {
                        cy.contains('Alex Weaver').should('exist')
                    }else {
                        cy.get('@RiskVals').eq(i).find('textarea').invoke('val').should('contain', 'testing risk assignment')
                    }
                }
            })
        })

        it('saves report', () => {
            cy.login('QA_user', 'zIaNuhpGz8uxZRazhSCU')
            cy.wait(750)
            cy.switchTenant('cypressTenantProto')
            cy.wait(750)
            cy.openManagement('Risk', 'Risk Assessment Report')
            cy.wait(750)
            cy.get('.list__body-elem').last().click();

            cy.contains('Export Report').click({force:true})
            cy.wait(1000)
            cy.get('.modal__header-btn').filter(':visible').click()
            cy.get('.export__button').click()
            cy.verifyDownload('securea_risk_register_export', { contains:true });
        })
    })
*/