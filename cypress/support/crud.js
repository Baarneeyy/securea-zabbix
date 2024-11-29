//This JS file contains commands used to fill/edit/delete and add data entries to securea


////////////////////////FILL DATA ENTRY////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
//TODO ->differentiate with special elements like assetClass or review interval
Cypress.Commands.add('fillDataEntry', (numInput=true, dropdownInput=true) => {
    let dataEntryType;

    cy.get('.wrapper__header >', {timeout:8000}).should('have.length', 4)
    cy.get('[data-cy="assetBrowser_add"]').should('exist').click()

    //Get the DataEntryType into string format
    cy.get('.wrapper__header > .mr-1').invoke('text').then((text) => {
        let tempString = text.split(/\s+/);
        tempString.pop()
        dataEntryType = tempString.join(' ')
    })

    //Write into every text field on screen
    //Double '\' used for escaping and using .\\!grid class in cy.get
    cy.get('.\\!grid > > [class*=inputtext]').its('length').then((length) => {
        for (let i = 0; i < length; i++) {
            cy.get('.\\!grid > > [class*=inputtext]').eq(i).as('currentInputBox')
            
            cy.get('@currentInputBox').parent().children().first().children().invoke('text').then((text) => {
                cy.get('@currentInputBox').click().type(`Testing the ${text} of ${dataEntryType}`)
            })
        }
    })

    //If enabled -> sets all numeric inputs to 25
    if (numInput) {
        cy.get('.p-inputnumber').its('length').then((length) => {
            for (let i = 0; i < length; i++) {
                cy.get('.p-inputnumber').eq(i).click().type('{selectAll}{del}25')
            }
        })
    }

    //If enabled -> sets every dropdown input to the value of it's first option
    if (dropdownInput) {
        cy.get('.\\!grid .dropdown-toggle').its('length').then((length) => {
            for (let i = 0; i < length; i++) {
                cy.get('.\\!grid .dropdown-toggle').eq(i).click()
                cy.get('.option-label').should('exist')
                cy.get('.option-label').first().click()
            }
        })
    }
})

////////////////////////ADD N CONFIRM//////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
//BETA DONE -> clicks and then waits for a success toastification
Cypress.Commands.add('addConfirm', () => {
    cy.get('[data-cy="assetBrowser_create"]').click()
    cy.get('.Vue-Toastification__toast-body', {timeout:16000}).should('exist')
    cy.get('.Vue-Toastification__toast-body', {timeout:16000}).should('contain', 'successfully')
})

////////////////////////DELETE DATA ENTRY//////////////////////////////////
///////////////////////////////////////////////////////////////////////////
//BETA DONE -> deletes defined data entry and waits for confirmation
Cypress.Commands.add('deleteDataEntry', (dataEntryName) => {
    cy.get('.list__body-elem > :nth-child(2)') //All Name columns of data entries
        .contains(dataEntryName).click()
    cy.get('.toolbar > :last').click()
    cy.get('.p-confirm-popup-accept > .p-button-label').click()
    cy.get('.Vue-Toastification__toast-body', {timeout:16000}).should('exist')
    cy.get('.Vue-Toastification__toast-body', {timeout:16000}).should('contain', 'successfully')

})

////////////////////////DELETE DATA ENTRY//////////////////////////////////
///////////////////////////////////////////////////////////////////////////
//TODO -> Numeric + dropdown + special components implementation
Cypress.Commands.add('editDataEntry', (dataEntryName, test='') => {
    cy.get('.wrapper__header >').should('have.length', 4)

    let fields = {
        'Description':'grrr'
    }

    if (test != '') {
        fields = test;
    }

    cy.get('.list__body-elem > :nth-child(2)') //All Name columns of data entries
        .contains(dataEntryName).click()
    cy.get('.toolbar > :first').click()
    for (let i = 0; i < Object.keys(fields).length; i++) {
        const key = Object.keys(fields)[i]
        cy.get('.\\!grid').contains(Object.keys(fields)[i]).parent().children().eq(1).click().type(`{selectAll}{del}${fields[key]}`)
    }

})