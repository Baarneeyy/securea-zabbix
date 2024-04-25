describe('filtering threats', { testIsolation:false }, () => {
    it ('logins', () => {
        cy.clearCookies()
        cy.login('demo', '16w99aH2GS')
        cy.switchTenant('cypressTenantProto')
        cy.openManagement('Risk', 'Asset Browser')
        cy.wait(750)
        cy.wordfilter("test", "t", 2)
        cy.wordfilter("Náhodné", "N", 5)
    })
/*
    it('filtersValue', () => {
        cy.ValueFilter(200, 300)
    })*/
    it ('filtersname', () => {
        cy.wordfilter("test", "t", 2)
    })
    it ('filterstype', () => {
        cy.wordfilter("Náhodné", "N", 5)
    })
    /*
    it ('filtersdescription', () => {
        cy.wordfilter("test", "t", 6)
    })*/

})
describe('sorting assets', { testIsolation:false }, () => {
    it ("logins", () => {
        cy.clearCookies()
        cy.login('demo', '16w99aH2GS')
        cy.switchTenant('cypressTenantProto')
        cy.openManagement('Risk', 'Asset Browser')
        cy.wait(750)
    });
    it ('sortsname', () => {
        cy.sortName(2, 1) 
    })
    it ('sortsAC', () => {
        cy.sort(3,2)
    })
    it ('sortsCC', () => {
        cy.sort(4,3)
    })
    
})

describe('threat browser mapping', { testIsolation:false }, () => {
/*
    it ('logins', () => {
        cy.login('demo', '16w99aH2GS')
        cy.switchTenant('cypressTenantProto')
        cy.openManagement('Risk', 'Threat Browser')
        cy.wait(750)
    })*/
    it ('mapsthreatassets', () => {
        cy.addMapping(0, 2, "testOfBrowserMapping", "Zlyhanie počítačového hárdvéru", "tes­tOfB­ro­wser­Map­pi­ng") 
    })
    it ('mapsthreatassetclasses', () => {
        cy.addMapping(1, 2, "SaaS", "Zlyhanie počítačového hárdvéru", "SaaS")
    })
    it ('mapsthreatcontrols', () => {
        cy.addMapping(2, 1, "Next Generation FW", "Zlyhanie počítačového hárdvéru", "Next Ge­ne­ra­ti­on FW")
    })

})