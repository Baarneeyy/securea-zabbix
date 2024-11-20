describe('checks if able to get into app.securea', () => {
    it('logs in', () => {
        //Setup + Asset Browser
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'TVsetecka test tenant', 'Management', 'Risk Management', 'Asset Browser')
        cy.url().then((url) => {
            cy.wrap(url).should('contain', 'asset-browser')
        })
        cy.wait(250)
    })
})