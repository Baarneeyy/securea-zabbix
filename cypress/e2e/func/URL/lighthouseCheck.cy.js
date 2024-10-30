//per screen in url check -> return lighthouse audit
//TODO -> create some distinction
//  -> after reading/achieving good lighthouse score -> use as baseline
const thresholds = {
    performance: 50,
    accessibility: 80,
    'first-contentful-paint': 2000,
    'largest-contentful-paint': 3000,
    interactive: 2000,
    seo: 60,
    pwa: 50,
    };
const lighthouseConfig = {
    formFactor: 'desktop',
    screenEmulation: { disabled: true },
    output: "html",
    };


describe.skip('Tenant Section', () => {
    it.skip('Select Tenant', () => {
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'tomas_workflow_tests', 'Management', 'Risk Management', 'Asset Browser')
        cy.get('[data-cy="menu_tenant"]').click({force:true})
        
        //Select Tenant Check
        cy.contains('Select Tenant').click()
        cy.wait(250)
        cy.lighthouse(thresholds, lighthouseConfig)
    })

    it.skip('User Settings', () => {
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'tomas_workflow_tests', 'Management', 'Risk Management', 'Asset Browser')
        cy.get('[data-cy="menu_tenant"]').click({force:true})
        
        //Select Tenant Check
        cy.contains('User Settings').click()
        cy.wait(250)
        cy.lighthouse(thresholds, lighthouseConfig)
    })

    it('Change Password', () => {
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'tomas_workflow_tests', 'Management', 'Risk Management', 'Asset Browser')
        cy.get('[data-cy="menu_tenant"]').click({force:true})
        
        //Select Tenant Check
        cy.contains('User Settings').click()
        cy.wait(250)
        cy.contains('Change Password').click({force:true})
        cy.wait(250)
    })

    it.skip('tenant section', () => {
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

describe('Tenant/Configuration', () => {
    it('Asset Class Catalogue', () => {
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'tomas_workflow_tests', 'Tenant', 'Configuration', 'Asset Class Catalogue')
        cy.get('.wrapper__header >', {timeout:8000}).should('have.length', 4)
        cy.lighthouse(thresholds, lighthouseConfig)

    })

    it('Owner Browser', () => {
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'tomas_workflow_tests', 'Tenant', 'Configuration', 'Owner Browser')
        cy.get('.wrapper__header >', {timeout:8000}).should('have.length', 4)
        cy.lighthouse(thresholds, lighthouseConfig)
    })

    it('Regulation Catalogue', () => {
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'tomas_workflow_tests', 'Tenant', 'Configuration', 'Regulation Catalogue')
        cy.get('.wrapper__header >', {timeout:8000}).should('have.length', 4)
        cy.lighthouse(thresholds, lighthouseConfig)
    })

    it('Security Requirements Catalogue', () => {
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'tomas_workflow_tests', 'Tenant', 'Configuration', 'Security Requirements Catalogue')
        cy.get('.wrapper__header >', {timeout:8000}).should('have.length', 4)
        cy.lighthouse(thresholds, lighthouseConfig)
    })
})

