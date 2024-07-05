describe('tests basic functionality of impacts', () => {
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
        cy.openManagement('BCM', 'Impacts')
        /* ==== Generated with Cypress Studio ==== */
        cy.get('.p-button-label').click();
        cy.get('#name').clear('T');
        cy.get('#name').type('Testing an Impact');
        cy.get('#description').type('description of an impact');
        cy.get('.\\!bg-transparent').click();
        cy.get('[data-cy="assetBrowser_create"] > .p-button-label').click();
        cy.get('a > .p-button > .icon-small').click();
        cy.get(':nth-child(1) > :nth-child(3) > .flex > .checkbox-style').check();
        cy.get('[aria-label="Save"] > .p-button-label').click();
        cy.get('.breadcrumbs__content > :nth-child(3) > .flex').click();
        /* ==== End Cypress Studio ==== */
        cy.wait(1000)
        cy.get('.list__body-elem--select > :nth-child(3) > .overflow-hidden').should('contain', '1')
        
        cy.get('.field--hidden > .field__value').should('contain', 'Testing an Impact')
        cy.deleteDataEntry()
        //maps a business process and checks if it updates in browser -> done
        //prolly do the same shit for business process -> in process
        //delete -> done
    })
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
        cy.openManagement('BCM', 'Business Processes')
        /* ==== Generated with Cypress Studio ==== */
        cy.get('.p-button-label').click();
        cy.get('#name').clear('T');
        cy.get('#name').type('Testing BP');
        cy.get('#description').type('description of BP');
        cy.get('.\\!bg-transparent').click();
        cy.get('[data-cy="assetBrowser_create"] > .p-button-label').click();
        cy.get('a > .p-button > .icon-small').its('length').then((length) => {
            for (let i = 0; i < length; i++) {
                cy.get('a > .p-button > .icon-small').eq(i).click();
                cy.get(':nth-child(1) > :nth-child(3) > .flex > .checkbox-style').check();
                cy.get('[aria-label="Save"] > .p-button-label').click();
                cy.get('.breadcrumbs__content > :nth-child(3) > .flex').click();
                /* ==== End Cypress Studio ==== */
                cy.wait(1000)
                //cy.get('.list__body-elem--select > :nth-child(3) > .overflow-hidden').should('contain', '1') 
            }
            cy.deleteDataEntry()
        })
        //maps a business process and checks if it updates in browser -> done
        //prolly do the same shit for business process -> in process
        //delete -> done
    })
})