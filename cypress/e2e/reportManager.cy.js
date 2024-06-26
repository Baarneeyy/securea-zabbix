describe('testgenCreate', () => {
    //each of latest batch of tests -> export -> check of fileNameScheme
    /*it('pre-generates reports for sort testing', () => {
        cy.login('QA_user', 'zIaNuhpGz8uxZRazhSCU')
        cy.wait(750)
        cy.get('body').then($body => {
            if ($body.find('.Vue-Toastification__close-button').length > 0) {  // create a command out of this
                cy.get('.Vue-Toastification__close-button').click()
            }
        })
        cy.switchTenant('cypressTenantProto')
        cy.wait(750)
        cy.openManagement('Risk Management', 'Asset Browser')
        cy.wait(750)


        //Asset Browser
        cy.get('[data-cy="assetBrowser_generateReport"] > .icon').click();
        cy.get('.p-menu-list > :nth-child(2) > .flex').click();
        cy.get(':nth-child(3) > .flex > .w-full').click();
        cy.get(':nth-child(4) > .flex > .w-full').click();
        cy.wait(2000)
        cy.get(':nth-child(1) > .Vue-Toastification__close-button').click();
        cy.wait(500)
        cy.get(':nth-child(1) > .Vue-Toastification__close-button').click();
        cy.wait(500)
        cy.get(':nth-child(1) > .Vue-Toastification__close-button').click();
        //Threat browser
        cy.get('[data-cy="menu_management"] > .flex').click();
        cy.get('[href="#/t/148/threat-browser"]').click();
        cy.get('[data-cy="assetBrowser_generateReport"] > .icon').click();
        cy.get('.p-menuitem > .flex > .w-full').click();
        cy.wait(500)
        cy.get('.Vue-Toastification__close-button').click();

        cy.openManagement('Compliance Management', 'Governing Documentation')

        //Gov Doc
        cy.get('[data-cy="assetBrowser_generateReport"] > .icon').click();
        cy.get('.p-menuitem > .flex').click();
        cy.wait(500)
        cy.get('.Vue-Toastification__close-button').click();
        cy.openManagement('Compliance Management', 'Requirements')
        cy.get('[data-cy="assetBrowser_generateReport"] > .icon').click();
        cy.get('.p-menuitem > .flex > .w-full').click();
    })*/
    //each of latest batch of tests -> export -> check of fileNameScheme

    
    it('opens & checks sorting of suitabnle reports', () => {
        cy.login('QA_user', 'zIaNuhpGz8uxZRazhSCU')
        cy.wait(750)
        cy.get('body').then($body => {
            if ($body.find('.Vue-Toastification__close-button').length > 0) {  // create a command out of this
                cy.get('.Vue-Toastification__close-button').click()
            }
        })
        cy.switchTenant('cypressTenantProto')
        cy.wait(750)
        cy.get('[data-cy="menu_reports"] > .flex').click()
        cy.wait(750)
        
        //create a loop
        for (let i = 0; i < 6; i++) {
            cy.get(".list__body-elem").eq(i).children().eq(4).click()
            cy.wait(750)
            //loop for iterating over (id-intBased; name-stringBased)
            for (let i = 0; i < 2; i++) {
                cy.get('thead').find('tr').children().eq(i).click()
                cy.get('tbody').children().first().children().eq(i).invoke('text').then((text) => {
                    cy.wait(750)
                    //cy.get('tbody').children().first().children().eq(i).invoke('text').should('contain', text)
                    cy.get('thead').find('tr').children().eq(i).click()
                    cy.wait(750)
                    cy.get('tbody').children().first().children().eq(i).invoke('text').then((text1) => {
                        cy.wrap(text1).should('not.contain', text)
                        /*if (i != 0) {
                            cy.get('thead').find('tr').children().eq(i).click()
                            cy.wait(750)
                            cy.get('tbody').children().first().children().eq(i).invoke('text').should('not.contain', text1)
                        }*/
                    })
                })
            }
            cy.wait(750)
            cy.go(-1)
        }

    })
})
//setup 3 categories to sort with distinguishing names

describe('opens & tests basic reportManager workflow', () => {
    it('opens & checks date/name in detail window', () => {
        cy.login('QA_user', 'zIaNuhpGz8uxZRazhSCU')
        cy.wait(750)
        cy.get('body').then($body => {
            if ($body.find('.Vue-Toastification__close-button').length > 0) {  // create a command out of this
                cy.get('.Vue-Toastification__close-button').click()
            }
        })
        cy.switchTenant('cypressTenantProto')
        cy.wait(750)
        cy.get('[data-cy="menu_reports"] > .flex').click()
        cy.wait(1000)
        cy.get('.list__body-elem').its('length').then((length) => {
            for (let i = 0; i < 10; i++) {
                cy.get(`:nth-child(${i+1}) > :nth-child(2) > p`).invoke('text').then((text) => {
                    cy.get('.list__body-elem').eq(i).click()
                    cy.wait(250)
                    cy.get('.text-2xl').should('contain', text)

                })
                cy.get('.list__body-elem').eq(i).children().eq(2).find('p')
                    .invoke('text').then((text) =>  {
                    cy.get('.p-4 > .flex-col > .flex > :nth-child(2)').should('have.text', text)
                })
            }
            //split into two shorter for loops for first/last n reports
        })
    })
    
    it('creates a new asset for a specific', () => {
        cy.login('QA_user', 'zIaNuhpGz8uxZRazhSCU')
        cy.wait(750)
        cy.get('body').then($body => {
            if ($body.find('.Vue-Toastification__close-button').length > 0) {  // create a command out of this
                cy.get('.Vue-Toastification__close-button').click()
            }
        })
        cy.switchTenant('cypressTenantProto')
        cy.wait(750)
        cy.openManagement('Risk Management', 'Asset Browser')
        cy.wait(750)
        cy.addDataEntry('testReportAsset')
    })
    
    it('is able to show & delete newly made report', () => {
        cy.login('QA_user', 'zIaNuhpGz8uxZRazhSCU')
        cy.wait(750)
        cy.get('body').then($body => {
            if ($body.find('.Vue-Toastification__close-button').length > 0) {  // create a command out of this
                cy.get('.Vue-Toastification__close-button').click()
            }
        })
        cy.switchTenant('cypressTenantProto')
        cy.wait(750)
        cy.openManagement('Risk Management', 'Asset Browser')
        cy.wait(750)

        //check of url
        cy.get('[data-cy="assetBrowser_generateReport"] > .icon').click();
        cy.wait(750)
        cy.get(':nth-child(2) > .flex > .w-full').click();
        cy.wait(750)
        cy.get('.flex > .cursor-pointer > .icon > path').click();
        cy.wait(4000)
        cy.get('.overflow-auto > :nth-child(1) > :nth-child(1) > tr > :nth-child(1) > .flex > p').click()
        cy.wait(750)
        cy.get('.overflow-auto > :nth-child(1) > :nth-child(1) > tr > :nth-child(1) > .flex > p').click()
        cy.wait(750)
        cy.get('tbody').filter(':visible').find('tr').first()
            .children().eq(1).should('have.text', 'testReportAsset')
        cy.get('.breadcrumbs__content > :nth-child(2) > .flex').click();
        cy.wait(750)
        cy.get('.justify-end').find('button').click()
        cy.wait(750)
        cy.get('.p-confirm-popup-accept > .p-button-label').click();
        cy.wait(750)
    })
    it('deletes the premade data entry', () => {
        cy.login('QA_user', 'zIaNuhpGz8uxZRazhSCU')
        cy.wait(750)
        cy.get('body').then($body => {
            if ($body.find('.Vue-Toastification__close-button').length > 0) {  // create a command out of this
                cy.get('.Vue-Toastification__close-button').click()
            }
        })
        cy.switchTenant('cypressTenantProto')
        cy.wait(750)
        cy.openManagement('Risk Management', 'Asset Browser')
        cy.wait(750)
        cy.deleteDataEntry()
    })
    //quick version of universal report check
    //open report manager -> id of latest report
    //generate reports -> via cypress studio -> amount of test is known
    //for each test -> open & sort categories
    it('opens report itself, compares with browser')
    it('pre-generates reports for sort testing', () => {
        cy.login('QA_user', 'zIaNuhpGz8uxZRazhSCU')
        cy.wait(750)
        cy.get('body').then($body => {
            if ($body.find('.Vue-Toastification__close-button').length > 0) {  // create a command out of this
                cy.get('.Vue-Toastification__close-button').click()
            }
        })
        cy.switchTenant('cypressTenantProto')
        cy.wait(750)
        cy.openManagement('Risk Management', 'Asset Browser')
        cy.wait(750)


        /* ==== Generated with Cypress Studio ==== */
        cy.get('[data-cy="assetBrowser_generateReport"] > .icon').click();
        cy.get('.p-menu-list > :nth-child(2) > .flex').click();
        cy.get(':nth-child(3) > .flex > .w-full').click();
        cy.get(':nth-child(4) > .flex > .w-full').click();
        cy.get('.list__body > :nth-child(1) > :nth-child(2)').click();
        cy.get('.p-splitbutton > .p-button-icon-only').click();
        cy.get('#pv_id_43_overlay_0 > .p-menuitem-content > .flex').click();
        cy.get('.p-splitbutton > .p-button-icon-only').click();
        cy.get('#pv_id_43_overlay_1 > .p-menuitem-content > .flex').click();
        cy.get('.p-icon').click();
        cy.get('#pv_id_43_overlay_2 > .p-menuitem-content > .flex').click();
        /* ==== End Cypress Studio ==== */
    })
    //each of latest batch of tests -> export -> check of fileNameScheme
    
})