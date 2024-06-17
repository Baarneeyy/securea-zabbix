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
        cy.openManagement('Risk', 'Asset Browser')
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
        cy.openManagement('Risk', 'Asset Browser')
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
        cy.openManagement('Risk', 'Asset Browser')
        cy.wait(750)
        cy.deleteDataEntry()
    })

    it('opens report itself, compares with browser')
    it('exports correctly')
})