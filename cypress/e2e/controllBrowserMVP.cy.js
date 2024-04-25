describe('sorting assets', { testIsolation:false }, () => {
    it ("logins", () => {
        cy.clearCookies()
        cy.login('demo', '16w99aH2GS')
        cy.switchTenant('cypressTenantProto')
        cy.openManagement('Risk', 'Asset Browser')
        cy.wait(750)
        cy.sortName(2, 1)  
    });
    
    it ('sortsAC', () => {
        cy.sort(3,2)
    })
    it ('sortsCC', () => {
        cy.sort(4,3)
    })
    
})

describe('filtering threats', () => {
    it ('logins', () => {
        cy.clearCookies()
        cy.login('demo', '16w99aH2GS')
        cy.switchTenant('cypressTenantProto')
        cy.openManagement('Risk', 'Asset Browser')
        cy.wait(750)
    })
/*
    it('filtersValue', () => {
        cy.ValueFilter(200, 300)
    })*/
    it ('filtersname', () => {
        cy.wordfilter("test", "t", 2)
    })/*
    it ('filterstype', () => {
        cy.wordfilter("Náhodné", "N", 5)
    })*/
    /*
    it ('filtersdescription', () => {
        cy.wordfilter("test", "t", 6)
    })*/

})

describe('control browser mapping', { testIsolation:false },() => {
    it ('logins', () => {
        cy.clearCookies()
        cy.login('demo', '16w99aH2GS')
        cy.switchTenant('cypressTenantProto')
        cy.openManagement('Risk', 'Control Browser')    
    })
    it ('mapscontrolassets', () => {
        cy.wait(2000)
        cy.addMapping(0, 3, "Dual Monitor Setup", "NIPS - systém prevencie narušenia siete", "Dual Mo­ni­tor Se­tup")
    })

    it ('mapscontrolassetclasses', () => {
        cy.wait(2000)
        cy.addMapping(1, 4, "SaaS", "NIPS - systém prevencie narušenia siete", "SaaS")
    })

    it ('mapscontrolrequirements', () => {
        cy.wait(2000)
        cy.addMapping(2, 0, "requirement1", "NIPS - systém prevencie narušenia siete", "re­qu­ire­me­nt1")
    })

    it ('mapscontrolthreats', () => {
        cy.wait(2000)
        cy.addMapping(3, 1, "Úmyselné poškodenie počítačového HW", "NIPS - systém prevencie narušenia siete", "Úmy­sel­né po­ško­de­nie po­čí­ta­čo­vé­ho HW")
    })
})