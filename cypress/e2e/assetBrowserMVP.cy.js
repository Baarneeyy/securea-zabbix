const { describe } = require("mocha")

/*describe('shows assets with corresponding threats and controls', { testIsolation:false }, () => {
    it('opens asset browser', () => {
        cy.clearCookies()
        cy.login('QA_user', 'zIaNuhpGz8uxZRazhSCU')
        cy.switchTenant('cypressTenantProto')
        cy.openManagement('Risk', 'Asset Browser')
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
})*/

//check adding/filling up assets with data
//edit accordingly
describe('Adding new asset and populating the data', { testIsolation: false }, () => {
    it('adds a new asset with pre-made data', () => {
        cy.clearCookies();
        cy.login('QA_user', 'zIaNuhpGz8uxZRazhSCU');
        cy.wait(750);
        cy.switchTenant('cypressTenantLukas');
        cy.wait(750);
        cy.openManagement('Risk', 'Asset Browser');
        cy.wait(750);

        cy.addDataEntry('test-add-asset', true);
        cy.wait(1000);
    });

    it('propagates values from asset class', () => {
        cy.get('.wrapper__container').its('length').then((mappings) => {
            for (let i = 2; i < mappings; i++) {
                cy.get('.list__body').eq(i).find('.list__body-elem').its('length').then((items) => {
                    cy.contains('Class').children().first().click();
                    cy.wait(1000);
                    cy.get('.list__body-elem').first().click();
                    cy.wait(1000);
                    cy.get('.list__body').eq(i - 1).find('.list__body-elem').should('have.length', items);
                    cy.go(-1);
                    cy.wait(1000);
                    cy.get('.list__body-elem').last().click();
                    cy.wait(1000);
                });
            }
        });
    });
});

describe('Editing of asset', { testIsolation: false }, () => {
    it('Edits asset test-add-asset', () => {
        cy.editDataEntry();
    });
});

describe('clone asset-threats and asset-controls', { testIsolation: false }, () => {
    it('clones asset mappings', () => {
        let values = {
            control: ['1%', -2],
            threat: ['55', -3]
        };

        cy.get('.list__body-elem');
        cy.addDataEntry('testClone');
        cy.wait(750);

        for (let i = 2; i < 4; i++) {
            cy.selectAndCloneMappings(i, values);
        }

        cy.deleteDataEntry('test-add-asset-update');
        cy.wait(500);
        cy.deleteDataEntry('testClone');
    });
});


Cypress.Commands.add('selectAndCloneMappings', (index, values) => {
    cy.get('.list__body-elem').eq(-2).click();
    cy.wait(750);
    cy.get('.main-model-detail-container__header').find('button').click({ force: true });
    cy.wait(1000);
    cy.get('.wrapper__header').eq(index)
        .children().last().click();
    cy.wait(1000);
    cy.get('.actions__body-btn').first().click();
    cy.wait(1000);
    cy.get('.p-inputtext.p-component').last().type(`testClones{enter}`);
    cy.wait(1000);
    cy.get('.list__table').last().find('tbody')
    cy.get('.mb-6 > .clone__button').click({ force: true });
    cy.wait(500);
    cy.get('.clone__button').first().click();
    cy.wait(500);
    cy.get('.Vue-Toastification__toast-body', { timeout: 2000 }).should('be.visible');
    cy.go(-1);
    cy.wait(1000);
    cy.get('.main-model-detail-container__header > .p-button').click();
    cy.get('.list__body-elem').last().click();
    cy.get('.main-model-detail-container__header > .p-button').click({ force: true });

    cy.assertValuePropagation(index, values);

    cy.wait(500);
    cy.get('.main-model-detail-container__header > .p-button').click();
    cy.get('.list__body-elem').eq(-2).click();
    cy.get('.main-model-detail-container__header > .p-button').click();
});


Cypress.Commands.add('assertValuePropagation', (index, values) => {
    cy.get('.wrapper__header').eq(index).find('h3').invoke('text').then((text) => {
        let value;
        if (text.includes('Asset Controls')) {
            value = values.control;
        } else if (text.includes('Asset Threats')) {
            value = values.threat;
        }
        for (let e = 1; e < 3; e++) {
            cy.get('.list__body-elem').eq(-e).children().eq(value[1])
                .find('p').invoke('text').then((text) => {
                    expect(text).to.include(value[0]);
                });
        }
    });
});

/*
describe('sorting assets', () => {
    it('sorts', () => {
        cy.wait(750)
        //cy.sortName(2, 1)
        cy.sort(3,2)
        cy.sort(4,3)
        cy.sort(5,4)
        cy.classfilter(2)
        cy.classfilter(5)
        cy.classfilter(7)
        cy.classfilter(9)
        cy.wordfilter("test", "t", 2)
    })
})
*/
/*
describe('ability to perform asset reports', { testIsolation:false }, () => {
    it('count of reports', () => {
        cy.openManagement('Risk', 'Asset Browser')
        cy.wait(750)
        cy.get('.list__body-elem').first().click()
        cy.wait(750)
        cy.get('.detail-toolbar__inner__expand-btn').click()
        cy.wait(750)
        cy.get('.detail-toolbar__inner__mapping-btn').should('have.length', 6)
            .children().first().click()
        cy.wait(1000)
    })


    it('reports links', () => {
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
        cy.verifyDownload('securea_asset_report_export_2024-04-16.csv');
    })
})*/