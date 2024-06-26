
describe('newly made asset has threats and controls assigned from asset class', () => {
    it('creates a new asset', () => {
        //cy.clearCookies()
        cy.login('QA_user', 'zIaNuhpGz8uxZRazhSCU')
        cy.wait(750)
        cy.get('body').then($body => {
            if ($body.find('.Vue-Toastification__close-button').length > 0) {
                cy.get('.Vue-Toastification__close-button').click()
            }
        })
        cy.switchTenant('cypressTenantProto')
        cy.wait(750)
        cy.openManagement('Risk Management', 'Asset Browser')
        cy.wait(750)
        cy.addDataEntry('test-add-asset', true, true)
    })
})

describe('mapping tests', () => {
    it('maps & updates asset threats', () => {
        cy.login('QA_user', 'zIaNuhpGz8uxZRazhSCU')
        cy.wait(750)
        cy.get('body').then($body => {
            if ($body.find('.Vue-Toastification__close-button').length > 0) {
                cy.get('.Vue-Toastification__close-button').click()
            }
        })
        cy.switchTenant('cypressTenantProto')
        cy.wait(750)
        cy.openManagement('Risk Management', 'Asset Browser')
        cy.wait(750)
        /* ==== Generated with Cypress Studio ==== */
        cy.get('.list__body-elem').last().click();
        cy.wait(2000)
        cy.get(':nth-child(3) > .wrapper__header > a > .p-button > .icon-small').click();
        cy.wait(750)
        cy.get(':nth-child(1) > :nth-child(3) > .flex > .checkbox-style').uncheck();
        cy.wait(750)
        cy.get(':nth-child(2) > :nth-child(4) > .\\!w-20').click();
        cy.wait(750)
        cy.get(':nth-child(2) > :nth-child(4) > .\\!w-20').clear('5');
        cy.wait(750)
        cy.get(':nth-child(2) > :nth-child(4) > .\\!w-20').type('50');
        cy.wait(750)
        cy.get(':nth-child(2) > :nth-child(5) > .\\!w-20').click();
        cy.wait(750)
        cy.get(':nth-child(2) > :nth-child(5) > .\\!w-20').clear('4');
        cy.wait(750)
        cy.get(':nth-child(2) > :nth-child(5) > .\\!w-20').type('4');
        cy.wait(750)
        cy.get(':nth-child(3) > :nth-child(3) > .flex > .checkbox-style').uncheck();
        cy.wait(750)
        cy.get(':nth-child(3) > :nth-child(3) > .flex > .checkbox-style').check();
        cy.wait(750)
        cy.get('tbody').eq(1).find('.list__body-elem').eq(3).click();
        cy.wait(750)
        cy.get('.p-inputtextarea').type('testAdd');
        cy.wait(750)
        cy.get('[aria-label="Save"] > .p-button-label').click();
        cy.wait(750)
        cy.go(-1)
        cy.wait(750)
        cy.get(':nth-child(1) > :nth-child(3) > .pl-3').should('have.text', '100%')
        cy.get(':nth-child(2) > :nth-child(3) > .pl-3').should('have.text', '50%')
        cy.get(':nth-child(3) > :nth-child(3) > .pl-3').should('have.text', '100%')
        cy.get(':nth-child(4) > :nth-child(3) > .pl-3').should('have.text', '100%')
        cy.get('tbody').last().find('.list__body-elem').as('controls').its('length').then((length) => {
            for (let i = 0; i < length; i++) {
                let value = 100
                if (i == 1) {
                    value = 4
                    cy.get('@controls').eq(i).children().eq(4).find('p').should('have.text', '')
                } else if (i == 3) {
                    cy.get('@controls').eq(i).children().eq(4).find('p').should('have.text', 'testAdd')
                } else {
                    cy.get('@controls').eq(i).children().eq(4).find('p').should('have.text', '')
                }
                cy.get('@controls').eq(i).children().eq(3).find('p').should('have.text', value.toString())
            }
        })
        /* ==== End Cypress Studio ==== */
    })
    it('maps & updates asset controls', () => {
        cy.login('QA_user', 'zIaNuhpGz8uxZRazhSCU')
        cy.wait(750)
        cy.get('body').then($body => {
            if ($body.find('.Vue-Toastification__close-button').length > 0) {
                cy.get('.Vue-Toastification__close-button').click()
            }
        })
        cy.switchTenant('cypressTenantProto')
        cy.wait(750)
        cy.openManagement('Risk Management', 'Asset Browser')
        cy.wait(750)
        cy.get('.list__body-elem').last().click()
        cy.wait(750)
        //add checks for current functionality surrounding asset controls
        /* ==== Generated with Cypress Studio ==== */
        cy.get(':nth-child(2) > .wrapper__header > a > .p-button > .icon-small').click();
        cy.wait(750)
        cy.get(':nth-child(1) > :nth-child(3) > .gap-x-1 > .checkbox-style').uncheck();
        cy.get(':nth-child(2) > :nth-child(3) > .gap-x-1 > .p-button > .icon > path').click({force:true});
        cy.get(':nth-child(3) > :nth-child(4) > .\\!w-20').clear('15');
        cy.get(':nth-child(3) > :nth-child(4) > .\\!w-20').type('150');
        cy.get(':nth-child(4) > :nth-child(4) > .\\!w-20').click();
        cy.get(':nth-child(4) > :nth-child(4) > .\\!w-20').click();
        cy.get(':nth-child(4) > :nth-child(4) > .\\!w-20').click();
        cy.get('tbody').eq(1).find('.list__body-elem').eq(3).click();
        cy.wait(750)
        cy.get('.p-inputtextarea').type('testAdd');
        cy.get('[aria-label="Save"] > .p-button-label').click();
        cy.get('.Vue-Toastification__toast-body').invoke('text').should('include', 'greater than')
        cy.get('.Vue-Toastification__close-button').click();
        cy.get(':nth-child(3) > :nth-child(4) > .\\!w-20').type('{selectAll}{del}40');
        cy.get('[aria-label="Save"]').click();
        cy.wait(750)
        cy.go(-1)
        cy.get('tbody').eq(2).find('.list__body-elem').as('controls').its('length').then((length) => {
            for (let i = 0; i < length; i++) {
                let value = 1;
                if (i == 2) {
                    value = 40
                    cy.get('@controls').eq(i).children().eq(3).find('p').should('have.text', '')
                } else if (i == 3) {
                    cy.get('@controls').eq(i).children().eq(3).find('p').should('have.text', 'testAdd')
                } else {
                    cy.get('@controls').eq(i).children().eq(3).find('p').should('have.text', '')
                }
                cy.get('@controls').eq(i).children().eq(4).find('p').should('have.text', value.toString() + '%')
            }
        })
        //cy.wait(75000000)
        /* ==== End Cypress Studio ==== */
    })
})

describe('risk register report', () => {
    it('opens risk register', () => {
        cy.login('QA_user', 'zIaNuhpGz8uxZRazhSCU')
        cy.wait(750)
        cy.get('body').then($body => {
            if ($body.find('.Vue-Toastification__close-button').length > 0) {
                cy.get('.Vue-Toastification__close-button').click()
            }
        })
        cy.switchTenant('cypressTenantProto')
        cy.wait(750)
        cy.openManagement('Risk Management', 'Risk Register')
        cy.wait(750)
        cy.get('.list__body-elem').last().click()
        cy.wait(750)
        /* ==== Generated with Cypress Studio ==== */
        cy.get('.p-dropdown-label').click();
        cy.get('#pv_id_36_0').click();
        cy.get(':nth-child(2) > .p-inputtextarea').type('test description');
        cy.get(':nth-child(3) > .p-inputtextarea').type('test treatment strat');
        cy.get(':nth-child(4) > .p-inputtextarea').type('test detail');
        cy.get(':nth-child(5) > .p-inputtextarea').type('test acceptance');
        cy.get('.p-button-label').click();
        cy.wait(750)
        cy.get('.Vue-Toastification__toast-body').invoke('text').should('include', 'Risk updated successfully')
        cy.wait(750)
        cy.get('.wrapper__header').first().children().last().find('.p-button').click()
        cy.wait(750)
        cy.get('Vue-Toastification__toast-component-body').find('.cursor-pointer').click()
        cy.wait(750)
        //PROBLEM BELOW
        cy.get('.list__body-elem').last().children().as('children').eq(1).find('p').should('have.text', 'Risk Register')
        cy.get('@children').eq(4).click()
        cy.wait(750)
        //checks the element in report
        cy.wait(750000)
        /* ==== End Cypress Studio ==== */
        //menu__item
    })
})

/*
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
        cy.openManagement('Risk Management', 'Asset Browser')
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
*/
//threat -> control test
//applied controls -> potential benefit
/*describe('control manipulation', () => {
    it('logs in and adjusts control mappings', () => {
        cy.login('QA_user', 'zIaNuhpGz8uxZRazhSCU')
        cy.get('body').then($body => {
            if ($body.find('.Vue-Toastification__close-button').length > 0) {
                cy.get('.Vue-Toastification__close-button').click()
            }
        })
        cy.wait(750)
        cy.openManagement('Risk Management', 'Asset Browser')
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
        cy.wait(750)
        cy.get('.wrapper__header > .flex > .p-button-icon-only').click()
    })
})*/
/*
describe('sorting assets', { testIsolation:false }, () => {
    /*it ("logins", () => {
        cy.clearCookies()
        cy.reload()
        cy.login('demo', '16w99aH2GS')
        cy.switchTenant('cypressTenantProto')
        cy.openManagement('Risk Management', 'Asset Browser')
        cy.wait(750)
        cy.url().then((url) => {
            Cypress.env('currentPageURL', url);
        });
        cy.sortName(2, 1)  
    });
    it('sets the url for the tests', () => {
        cy.url().then((url) => {
            Cypress.env('currentPageURL', url);
        });
    })
    
    it ('sortsRV', () => {
        cy.visit(Cypress.env('currentPageURL'))
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

/*
describe('filtering assets',  { testIsolation:false }, () => {
    it ('logins', () => {
        cy.clearCookies()
        cy.reload()
        cy.login('demo', '16w99aH2GS')
        cy.switchTenant('cypressTenantProto')
        cy.openManagement('Risk Management', 'Asset Browser')
        cy.wait(750)
    })

    it('filtersValue', () => {
        cy.ValueFilter(200, 300)
    })
    it ('filtersclass', () => {
        cy.classfilter(2)
    })
    it ('filtersowner', () => {
        cy.classfilter(5)
    })
    it ('filtersconfidentialyrequirements', () => {
        cy.classfilter(7)
    })
    it ('filtersprocessingofpersonaldata', () => {
        cy.classfilter(9)
    })
    it ('filtersname', () => {
        cy.wordfilter("test", "t", 2)
    })

})*/


/*
describe('asset browser mapping', { testIsolation:false }, () => {
    /*it ('logins', () => {
        cy.clearCookies()
        cy.reload()
        cy.login('demo', '16w99aH2GS')
        cy.switchTenant('cypressTenantProto')
        cy.openManagement('Risk Management', 'Asset Browser')
        cy.wait(750)
    })

    it ('mapsassetbussinessprocess', () => {
        cy.wait(750)
        cy.addMapping(0, 0, "testBusinessProcess{enter}", "testOfBrowserMapping", "test­Bu­si­ness­Pro­ce­ss")
    })

    it ('mapsassetcontrol', () => {
        cy.wait(750)
        cy.addMapping(1, 1, "Next Generation FW{enter}", "testOfBrowserMapping", "Next Ge­ne­ra­ti­on FW")
    })

    it ('mapsassetthreats', () => {
        cy.wait(750)
        cy.addMapping(2, 2, "Cloud – útok proti aplikácii{enter}", "testOfBrowserMapping", "Cloud – útok pro­ti ap­li­ká­cii (SaaS)")
    })

})*/
/*
    describe('create and edit risk assessment report', () => {
        it('opens risk assessment report', () => {
            cy.login('QA_user', 'zIaNuhpGz8uxZRazhSCU')
            cy.wait(750)
            cy.switchTenant('cypressTenantProto')
            cy.wait(750)
            cy.openManagement('Risk Management', 'Risk Assessment Report')
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
            cy.openManagement('Risk Management', 'Risk Assessment Report')
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
            cy.openManagement('Risk Management', 'Risk Assessment Report')
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