describe('requirements', { testIsolation:false }, () => {
    it ("logins", () => {
        cy.clearCookies()
        cy.login('demo', '16w99aH2GS')
        cy.switchTenant('cypressTenantLukas')
    })
    it ("opens Governing Documentation", () => {
        cy.get('[data-cy="menu_management"] > .flex').click()
        cy.get('.dropdown__link-holder > [data-cy="menu_complianceManagement"]').click()
        cy.get('[href="#/t/382/governing_document-browser"]').click()
    })
}

)