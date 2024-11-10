describe('Will check every url and match to window type', {testIsolation:true}, () => {
    it.skip('logs in & sets up login url', () => {
        cy.clearCookies()
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'tomas_workflow_tests', 'Management', 'Risk Management', 'Asset Browser')
        cy.url().then((url) => {
            cy.log(url)
            Cypress.env('tempUrl', url)
        })
        cy.wait(1000)
    })
    it('tenant section', () => {
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'tomas_workflow_tests', 'Management', 'Risk Management', 'Asset Browser')
        cy.get('[data-cy="menu_tenant"]').click({force:true})
        
        //Select Tenant Check
        cy.contains('Select Tenant').click()
        cy.wait(250)
        cy.url().then((url) => {
            cy.wrap(url).should('contain', 'select-tenant')
        })
        cy.get('body').click()
        //User Settings Check
        cy.get('[data-cy="menu_tenant"]').click({force:true})
        cy.wait(250)
        cy.contains('User Settings').click()
        cy.wait(250)
        cy.url().then((url) => {
            cy.wrap(url).should('contain', 'user-settings')
        })
        cy.get('body').click()
        //Asset Class Catalogue Check
        cy.get('[data-cy="menu_tenant"]').click({force:true})
        cy.wait(250)
        cy.contains('Configuration').click()
        cy.wait(250)
        cy.contains('Asset Class Catalogue').click()
        cy.wait(250)
        cy.url().then((url) => {
            cy.wrap(url).should('contain', 'asset_class-browser')
        })
        cy.get('body').click()

        //Owner Catalogue Check
        cy.get('[data-cy="menu_tenant"]').click({force:true})
        cy.wait(250)
        //cy.contains('Configuration').click()
        cy.wait(250)
        cy.contains('Owner Browser').click()
        cy.wait(250)
        cy.url().then((url) => {
            cy.wrap(url).should('contain', 'owner-browser')
        })
        cy.get('body').click()
        //Regulation Catalogue Check
        cy.get('[data-cy="menu_tenant"]').click({force:true})
        cy.wait(250)
        //cy.contains('Configuration').click()
        cy.wait(250)
        cy.contains('Regulation Catalogue').click()
        cy.wait(250)
        cy.url().then((url) => {
            cy.wrap(url).should('contain', 'regulation-catalogue')
        })
        cy.get('body').click()
        //Requirements Catalogue Check
        cy.get('[data-cy="menu_tenant"]').click({force:true})
        cy.wait(250)
        //cy.contains('Configuration').click()
        cy.wait(250)
        cy.contains('Security Requirements Catalogue').click()
        cy.wait(250)
        cy.url().then((url) => {
            cy.wrap(url).should('contain', 'requirement-catalogue')
        })
        cy.get('body').click()

        //BCM / Impacts
        cy.get('[data-cy="menu_tenant"]').click({force:true})
        cy.wait(250)
        cy.wait(250)
        cy.contains('BCM').click()
        cy.wait(250)
        cy.contains('Impacts').click()
        cy.wait(250)
        cy.url().then((url) => {
            cy.wrap(url).should('contain', 'impact-browser')
        })
        cy.get('body').click()

        //Risk Thresholds
        cy.get('[data-cy="menu_tenant"]').click({force:true})
        cy.wait(250)
        cy.wait(250)
        cy.contains('Thresholds').click()
        cy.wait(250)
        cy.contains('Risk Thresholds').click()
        cy.wait(250)
        cy.url().then((url) => {
            cy.wrap(url).should('contain', 'thresholds/risk')
        })
        cy.get('body').click()

        //Bia Thresholds
        cy.get('[data-cy="menu_tenant"]').click({force:true})
        cy.wait(250)
        cy.wait(250)
        cy.contains('Thresholds').click()
        cy.wait(250)
        cy.contains('Bia Thresholds').click()
        cy.wait(250)
        cy.url().then((url) => {
            cy.wrap(url).should('contain', 'thresholds/bia')
        })
    })
})
describe('Management', () => {
    it('Risk Management', () => {
        //Setup + Asset Browser
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'demoTestingTomas', 'Management', 'Risk Management', 'Asset Browser')
        cy.url().then((url) => {
            cy.wrap(url).should('contain', 'asset-browser')
        })
        cy.wait(250)

        //Threat
        cy.get('[data-cy="menu_management"]').click({force:true})
        cy.wait(250)
        cy.contains('Threat Browser').click()
        cy.wait(250)
        cy.url().then((url) => {
            cy.wrap(url).should('contain', 'threat-browser')
        })
        cy.get('body').click()

        //Controls
        cy.get('[data-cy="menu_management"]').click({force:true})
        cy.wait(250)
        cy.contains('Control Browser').click()
        cy.wait(250)
        cy.url().then((url) => {
            cy.wrap(url).should('contain', 'control-browser')
        })
        cy.get('body').click()

        //Risk Register
        cy.get('[data-cy="menu_management"]').click({force:true})
        cy.wait(250)
        cy.contains('Risk Register').click()
        cy.wait(250)
        cy.url().then((url) => {
            cy.wrap(url).should('contain', 'risk-register')
        })
        cy.get('body').click()

        
    })
    it('Compliance Management', () => {
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'demoTestingTomas', 'Management', 'Compliance Management', 'Governing Documentation')
        cy.url().then((url) => {
            cy.wrap(url).should('contain', 'governing_document-browser')
        })
        cy.wait(250)
        
        //Regulation
        cy.get('[data-cy="menu_management"]').click({force:true})
        cy.wait(250)
        cy.contains('Regulations').click()
        cy.wait(250)
        cy.url().then((url) => {
            cy.wrap(url).should('contain', 'regulation')
        })
        cy.get('body').click()

    })
    it('BCM', () => {
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'demoTestingTomas', 'Management', 'BCM', 'Business Processes')
        cy.url().then((url) => {
            cy.wrap(url).should('contain', 'business_process-browser')
        })
        cy.wait(250)
    })
})
describe('Other', () => {
    it('Admin Tools', () => {
        //Tenant Management
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'demoTestingTomas', 'Management', 'Risk Management', 'Asset Browser')
        cy.get('[data-cy="menu_adminTools"]').click({force:true})
        cy.wait(250)
        cy.contains('Tenant Management').click()
        cy.wait(250)
        cy.url().then((url) => {
            cy.wrap(url).should('contain', 'admin-tools/tenant-management')
        })
        cy.get('body').click()

        //User Management
        cy.get('[data-cy="menu_adminTools"]').click({force:true})
        cy.wait(250)
        cy.contains('Users Management').click()
        cy.wait(250)
        cy.url().then((url) => {
            cy.wrap(url).should('contain', 'user-management')
        })
        cy.get('body').click()

        //Export Data
        cy.get('[data-cy="menu_adminTools"]').click({force:true})
        cy.wait(250)
        cy.contains('Export Data').click()
        cy.wait(250)
        cy.url().then((url) => {
            cy.wrap(url).should('contain', 'distribution/export')
        })
        cy.get('body').click()

        //Import Data
        cy.get('[data-cy="menu_adminTools"]').click({force:true})
        cy.wait(250)
        cy.contains('Import Data').click()
        cy.wait(250)
        cy.url().then((url) => {
            cy.wrap(url).should('contain', 'distribution/import')
        })
        cy.get('body').click()
    })
    it('Otherothers (less than 2 subitems)', () => {
        //Dashboard
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'demoTestingTomas', 'Management', 'Risk Management', 'Asset Browser')
        cy.get('[data-cy="menu_dashboard"]').click({force:true})
        cy.wait(250)
        cy.get('.dropdown__sub-category-link').click()
        cy.wait(250)
        cy.url().then((url) => {
            cy.wrap(url).should('contain', 'dashboard')
        })
        cy.get('body').click()

        //Security Posture
        cy.get('[data-cy="menu_securityPosture"]').click({force:true})
        cy.wait(250)
        cy.get('.dropdown__sub-category-link:visible').click()
        cy.wait(250)
        cy.url().then((url) => {
            cy.wrap(url).should('contain', 'requirement-fulfillment')
        })
        cy.get('body').click()

        //Report Manager
        cy.get('[data-cy="menu_reports"]').click({force:true})
        cy.wait(250)
        cy.url().then((url) => {
            cy.wrap(url).should('contain', 'report-manager')
        })

        //Account
        cy.get('body').click()
        cy.get('[data-cy="menu_account"]').click({force:true})
        cy.wait(750)
        cy.url().then((url) => {
            cy.wrap(url).should('contain', '/user-settings/user')
        })
    })
})

/*VYCUC*\
- create url check func
- find a fix for ENV/ url handling

*/