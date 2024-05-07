
/*describe('filtering threats', { testIsolation:false }, () => {
    it ('logins', () => {
        cy.clearCookies()
        cy.login('demo', '16w99aH2GS')
        cy.switchTenant('cypressTenantProto')
        cy.openManagement('Risk', 'Threat Browser')
        cy.wait(750)
        cy.url().then((url) => {
            Cypress.env('currentPageURL', url);
        })
    })
    it('filtersname', () => {
        cy.visit(Cypress.env('currentPageURL'))
        cy.wordfilter("test", "t", 2)
    })
    it('filterstype', () => {
        cy.visit(Cypress.env('currentPageURL'))
        cy.wordfilter("Náhodné", "N", 5)
    })

    it('filtersValue', () => {
        cy.visit(Cypress.env('currentPageURL'))
        cy.ValueFilter(200, 300)
    })
    it ('filtersname', () => {
        cy.visit(Cypress.env('currentPageURL'))
        cy.wordfilter("test", "t", 2)
    })
    it ('filterstype', () => {
        cy.visit(Cypress.env('currentPageURL'))
        cy.wordfilter("Náhodné", "N", 5)
    })
    
    it ('filtersdescription', () => {
        cy.visit(Cypress.env('currentPageURL'))
        cy.wordfilter("test", "t", 6)
    })

})*/

describe('sorting assets', { testIsolation:false }, () => {
    it ("logins", () => {
        cy.clearCookies()
        cy.login('demo', '16w99aH2GS')
        cy.switchTenant('cypressTenantProto')
        cy.openManagement('Risk', 'Threat Browser')
        cy.url().then((url) => {
            Cypress.env('currentPageURL', url);
        })
        cy.wait(750)
    });
    it ('sortsname', () => {
        cy.visit(Cypress.env('currentPageURL'))
        cy.sortName(2, 1) 
    })
    it ('sortsAC', () => {
        cy.visit(Cypress.env('currentPageURL'))
        cy.sort(3,2)
    })
    it ('sortsCC', () => {
        cy.visit(Cypress.env('currentPageURL'))
        cy.sort(4,3)
    })
    
})

describe('threat browser mapping', { testIsolation:false }, () => {

    it ('logins', () => {
        cy.clearCookies()
        cy.login('demo', '16w99aH2GS')
        cy.switchTenant('cypressTenantProto')
        cy.openManagement('Risk', 'Threat Browser')
        cy.wait(750)
    })
    it ('mapsthreatassets', () => {
        cy.visit(Cypress.env('currentPageURL'))
        cy.addMapping(0, 2, "testOfBrowserMapping", "Zlyhanie počítačového hárdvéru", "tes­tOfB­ro­wser­Map­pi­ng") 
    })
    it ('mapsthreatassetclasses', () => {
        cy.visit(Cypress.env('currentPageURL'))
        cy.addMapping(1, 2, "SaaS", "Zlyhanie počítačového hárdvéru", "SaaS")
    })
    it ('mapsthreatcontrols', () => {
        cy.visit(Cypress.env('currentPageURL'))
        cy.addMapping(2, 1, "Next Generation FW", "Zlyhanie počítačového hárdvéru", "Next Ge­ne­ra­ti­on FW")
    })

})