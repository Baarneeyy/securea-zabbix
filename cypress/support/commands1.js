///////////////////////////////////////////////////////
//THIS FILE HOSTS ALL REPORTMANAGER-SPECIFIC COMMANDS//
///////////////////////////////////////////////////////

Cypress.Commands.add('ReportGenerator', () => {
    const reportBrowsers = [
        "Regulation Catalogue",
        "Security Requirements Catalogue",
        "Asset Browser",
        "Threat Browser",
        "Risk Register",
        //"Governing Documentation"
    ]
    //Risk Register is special case -> no report menu -> jus click generate

    cy.openManagement('Tenant', 'Configuration', 'Regulation Catalogue')
    cy.wait(750)
    cy.get('.list__body-elem').first().click()
    cy.wait(2000)
    cy.generateReport()
    cy.openManagement('Management', 'Risk Management', 'Threat Browser')
    cy.wait(750)
    cy.get('.list__body-elem').first().click()
    cy.wait(2000)
    cy.generateReport()
    cy.openManagement('Tenant', 'Configuration', 'Security Requirements Catalogue')
    cy.wait(750)
    cy.get('.list__body-elem').first().click()
    cy.wait(2000)
    cy.generateReport()
    cy.openManagement('Management', 'Risk Management', 'Asset Browser')
    cy.wait(750)
    cy.get('.list__body-elem').first().click()
    cy.wait(2000)
    cy.generateReport()
    cy.openManagement('Management', 'Compliance Management', 'Governing Documentation')
    cy.wait(750)
    cy.get('.list__body-elem').first().click()
    cy.wait(2000)
    cy.generateReport()
})


Cypress.Commands.add('generateReport', () => {
    cy.prepareReportSelect()
    cy.get('.p-dropdown-items').children().as('reports')
    cy.get('@reports').its('length').then((length) => {
        for (let i = 0; i < length; i++) {
            cy.get('@reports').eq(i).click()
            cy.get('.modal__body > .flex > .p-button > .p-button-label').click()
            cy.wait(1000)
            cy.contains('Generated Successfully').parent().parent().parent().find('.Vue-Toastification__close-button').click()
            //fix not working
            if (i != (length - 1)) {
                cy.prepareReportSelect()
            }
        }
    })  //.first().click() //types of reports
    cy.wait(250)
    //cy.get('.modal__body > .flex > .p-button > .p-button-label').click()//generates report
})

Cypress.Commands.add('prepareReportSelect', () => {
    cy.contains('Generate Report').click()
    cy.wait(700)
    cy.get('.modal__body > .flex > :nth-child(2)').find('.p-dropdown-label').click()
    cy.wait(700)
    cy.get('.p-dropdown-items').children().first().click() 
    cy.wait(700)
    cy.get('.p-inputtext').last().click()
})

Cypress.Commands.add('deleteReport', () => {
    cy.get('.list__body-elem').last().click({force:true})
    cy.wait(750)
    cy.get('.justify-end').find('.p-button').click()
    cy.wait(750)
    cy.get('body').type('{enter}')
    cy.wait(1000)
})