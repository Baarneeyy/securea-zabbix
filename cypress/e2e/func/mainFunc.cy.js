describe('tests ligthouse', () => {
    it('check', () => {
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'tomas_workflow_tests', 'Management', 'Risk Management', 'Asset Browser')

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

        cy.lighthouse(thresholds, lighthouseConfig)
    })
})