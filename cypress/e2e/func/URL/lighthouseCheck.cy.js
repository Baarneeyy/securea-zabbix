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
    it('Select Tenant', () => {
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'tomas_workflow_tests', 'Management', 'Risk Management', 'Asset Browser')
        cy.get('[data-cy="menu_tenant"]').click({force:true})
        
        //Select Tenant Check
        cy.contains('Select Tenant').click()
        cy.wait(250)
        cy.lighthouse(thresholds, lighthouseConfig)
    })

    it('User Settings', () => {
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
        cy.lighthouse(thresholds, lighthouseConfig)
    })
})

describe.skip('Tenant/Configuration', () => {
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

    it('Impacts Browser', () => {
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'tomas_workflow_tests', 'Tenant', 'Configuration', 'BCM')
        cy.get('.wrapper__header >', {timeout:8000}).should('have.length', 4)
        cy.lighthouse(thresholds, lighthouseConfig)
    })
})

describe.skip('Tenant/thresholds', () => {
    it('Risk Thresholds', () => {
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'tomas_workflow_tests', 'Tenant', 'Configuration', 'Thresholds') 
        //Risk Thresholds
        cy.contains('Risk Thresholds').click()
        cy.wait(250)
        cy.url().then((url) => {
            cy.wrap(url).should('contain', 'thresholds/risk')
        })
        cy.lighthouse(thresholds, lighthouseConfig)
    })
    it('BIA Thresholds', () => {
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'tomas_workflow_tests', 'Tenant', 'Configuration', 'Thresholds')
        //Bia Thresholds
        cy.contains('Bia Thresholds').click()
        cy.wait(250)
        cy.url().then((url) => {
            cy.wrap(url).should('contain', 'thresholds/bia')
        })
        cy.lighthouse(thresholds, lighthouseConfig)
    })
})

describe.skip('Dashboard + Security Posture', () => {
    it('Dashboard', () => {
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'tomas_workflow_tests', 'Dashboard')
        cy.wait(500)
        cy.lighthouse(thresholds, lighthouseConfig)
    })

    it('Security Posture', () => {
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'tomas_workflow_tests', 'Security Posture')
        cy.wait(500)
        cy.get('.wrapper__header').click()
        cy.lighthouse(thresholds, lighthouseConfig)  
    })
})

describe.skip('Risk Management', () => {
    it('Asset Browser', () => {
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'tomas_workflow_tests', 'Management', 'Risk Management', 'Asset Browser')
        cy.wait(500)
        cy.get('.wrapper__header').click()
        cy.lighthouse(thresholds, lighthouseConfig)
    })
    it('Threat Browser', () => {
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'tomas_workflow_tests', 'Management', 'Risk Management', 'Threat Browser')
        cy.wait(500)
        cy.get('.wrapper__header').click()
        cy.lighthouse(thresholds, lighthouseConfig)
    })
    it('Control Browser', () => {
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'tomas_workflow_tests', 'Management', 'Risk Management', 'Control Browser')
        cy.wait(500)
        cy.get('.wrapper__header').click()
        cy.lighthouse(thresholds, lighthouseConfig)
    })
    it('Risk Register', () => {
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'tomas_workflow_tests', 'Management', 'Risk Management', 'Risk Report')
        cy.wait(500)
        cy.get('.wrapper__header').click()
        cy.lighthouse(thresholds, lighthouseConfig)
    })
})

describe.skip('Compliance Management', () => {
    it('Gov Docs', () => {
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'tomas_workflow_tests', 'Management', 'Compliance Management', 'Governing Documentation')
        cy.wait(500)
        cy.get('.wrapper__header').click()
        cy.lighthouse(thresholds, lighthouseConfig)
    })
    it('Gov Docs', () => {
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'tomas_workflow_tests', 'Management', 'Compliance Management', 'Regulations')
        cy.wait(500)
        cy.get('.wrapper__header').click()
        cy.lighthouse(thresholds, lighthouseConfig)
    })
})

describe.skip('BCM', () => {
    it('Business Processes', () => {
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'tomas_workflow_tests', 'Management', 'BCM', 'Business Processes')
        cy.wait(500)
        cy.get('.wrapper__header').click()
        cy.lighthouse(thresholds, lighthouseConfig)
    })
})

describe.skip('Reports', () => {
    it('Reports', () => {
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'tomas_workflow_tests', 'Reports')
        cy.wait(500)
        cy.get('.wrapper__header').click()
        cy.lighthouse(thresholds, lighthouseConfig)
    })
})

//TODO -> divide into subfiles -> create set of reports -> send out