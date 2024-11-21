describe('checks if able to get into app.securea', () => {
    it('logs in', () => {
        //Setup + Asset Browser
        cy.visit(Cypress.env('url'))
        cy.wait(1500)
        cy.url().then((url) => {
            cy.log(url)
        })
    })
})