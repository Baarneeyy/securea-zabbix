let GlobalUrl;
let NumOfMenuItems;

describe('checks basic functionalities',{ testIsolation:false }, () => {
    it('gets url', () => {
        //cy.clearCookies()
        cy.setupUser(Cypress.env("PRE_USER"), Cypress.env("PRE_PASS"), 'Empty Tenant', 'Management', 'Risk Management', 'Asset Browser')
        cy.wait(750)
        cy.get('h3').click()
        cy.url().then((url) => {
            let substringStart = url.indexOf('/t/')
            let substringEnd = url.indexOf('/asset-browser')
            let tenantID = url.slice(substringStart+3, substringEnd)
            GlobalUrl = url;
            cy.log(tenantID)
        })
        //autocheck tenant id based on realtime info
        //Create script to autocheck every url
    })
    it('gets all menu links', () => {
        cy.visit(GlobalUrl);
        cy.wait(15000)
        /*cy.get('[data-cy*=menu]').then(($menuElements) => {
            for (let i = 0; i < $menuElements.length; i++) {
                cy.get('[data-cy*=menu]')
            }
        })*/
    })
})

describe.skip('checks mapped things', () => {
    it('errors on login', () => {
        cy.visit(GlobalUrl)
    })
})

describe.skip('checks adding/deleting of data_entries')