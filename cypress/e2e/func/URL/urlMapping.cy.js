const { describe } = require("mocha");
//TODO -> remove testIsolation


describe('URL Mapping checking', { testIsolation: false }, () =>{
    it('logins and checks tenant', () => {
        cy.clearCookies()
// Open preprod and login
        cy.login('admin', 'TotoUrciteNiejeHesl0?!', false)
        cy.get('.Vue-Toastification__close-button').click()
        cy.wait(1000)

// Switch Tenant
        cy.get('.dropdown-toggle:first').click()
        cy.get('.filter-input').type('tomas_workflow_tests')
        cy.get('.option-item').first().click()
        cy.wait(1000)

    })

    it('Opens and checks Asset Class Catalogue', () => {
// Open Asset Class Catalogue
        cy.get('[data-cy="menu_tenant"] > .flex').click()
        cy.get('.dropdown.border-black-200 > .dropdown__link-holder').click()
        cy.get('[href="#/t/1/asset_class-browser"]').click()
        cy.wait(1000)


// Open one asset in the catalogue
        cy.get('.list__body > :nth-child(1) > :nth-child(2)').click()
        let good_url = "https://securea-preprod.germanywestcentral.cloudapp.azure.com/#/t/1/asset_class-browser/1"
        cy.url().should('eq', good_url)
        cy.wait(1000)


// Open Asset Class Controls
        cy.get(':nth-child(2) > .wrapper__header > a > .p-button').click()
        good_url = "https://securea-preprod.germanywestcentral.cloudapp.azure.com/#/t/1/mapping/asset_class-control/1"
        cy.url().should('eq', good_url)
        cy.wait(1000)


// Go back to the asset in catalogue using breadcrumbs
        cy.get('.flex-wrap > :nth-child(3) > .flex').click()
        good_url = "https://securea-preprod.germanywestcentral.cloudapp.azure.com/#/t/1/asset_class-browser/1"
        cy.url().should('eq', good_url)
        cy.wait(1000)


// Open Asset Class Controls
        cy.get(':nth-child(2) > .wrapper__header > a > .p-button').click()
        good_url = "https://securea-preprod.germanywestcentral.cloudapp.azure.com/#/t/1/mapping/asset_class-control/1"
        cy.url().should('eq', good_url)
        cy.wait(1000)

    
// Go back to the asset in catalogue using cy.go('back') *web-browser back button*
        cy.go('back')
        good_url = "https://securea-preprod.germanywestcentral.cloudapp.azure.com/#/t/1/asset_class-browser/1"
        cy.url().should('eq', good_url)
        cy.wait(1000)

// Open Asset Class Controls
        cy.get(':nth-child(2) > .wrapper__header > a > .p-button').click()
        good_url = "https://securea-preprod.germanywestcentral.cloudapp.azure.com/#/t/1/mapping/asset_class-control/1"
        cy.url().should('eq', good_url)
        cy.wait(1000)

// Go back by closing the Asset Class Control window
        cy.get('header.flex > .justify-between').children().last().click()
        good_url = "https://securea-preprod.germanywestcentral.cloudapp.azure.com/#/t/1/asset_class-browser/1"
        cy.url().should('eq', good_url)
        cy.wait(1000)



// Open Asset Class Assets
        cy.get(':nth-child(1) > .wrapper__header > a > .p-button').click()
        good_url = "https://securea-preprod.germanywestcentral.cloudapp.azure.com/#/t/1/asset-browser"
        cy.url().should('eq', good_url)
        cy.wait(1000)


// Go back to the asset in catalogue using cy.go('back') *web-browser back button*
        cy.go('back')
        good_url = "https://securea-preprod.germanywestcentral.cloudapp.azure.com/#/t/1/asset_class-browser/1"
        cy.url().should('eq', good_url)
        cy.wait(1000)



 

// Open Asset Class Threats
        cy.get(':nth-child(3) > .wrapper__header > a > .p-button').click()
        good_url = "https://securea-preprod.germanywestcentral.cloudapp.azure.com/#/t/1/mapping/asset_class-threat/1"
        cy.url().should('eq', good_url)
        cy.wait(1000)


// Go back to the asset in catalogue using breadcrumbs
        cy.get('.flex-wrap > :nth-child(3) > .flex').click()
        good_url = "https://securea-preprod.germanywestcentral.cloudapp.azure.com/#/t/1/asset_class-browser/1"
        cy.url().should('eq', good_url)
        cy.wait(1000)


// Open Asset Class Threats
        cy.get(':nth-child(3) > .wrapper__header > a > .p-button').click()
        good_url = "https://securea-preprod.germanywestcentral.cloudapp.azure.com/#/t/1/mapping/asset_class-threat/1"
        cy.url().should('eq', good_url)
        cy.wait(1000)

    
// Go back to the asset in catalogue using cy.go('back') *web-browser back button*
        cy.go('back')
        good_url = "https://securea-preprod.germanywestcentral.cloudapp.azure.com/#/t/1/asset_class-browser/1"
        cy.url().should('eq', good_url)
        cy.wait(1000)

// Open Asset Class Threats
        cy.get(':nth-child(3) > .wrapper__header > a > .p-button').click()
        good_url = "https://securea-preprod.germanywestcentral.cloudapp.azure.com/#/t/1/mapping/asset_class-threat/1"
        cy.url().should('eq', good_url)
        cy.wait(1000)

// Go back by closing the Asset Class Control window
        cy.get('header.flex > .justify-between').children().last().click()
        good_url = "https://securea-preprod.germanywestcentral.cloudapp.azure.com/#/t/1/asset_class-browser/1"
        cy.url().should('eq', good_url)
        cy.wait(1000)
    })



    it('Opens and checks Regulation Catalogue', () => {
// Open Regulation Catalogue
        cy.get('[data-cy="menu_tenant"] > .flex').click()
        //cy.get('.dropdown.border-black-200 > .dropdown__link-holder').click()
        cy.get('[href="#/t/1/regulation-catalogue"]').click()
        cy.wait(1000)

// Open one asset in Regulation Catalogue
        cy.get('.list__body > :nth-child(1) > :nth-child(2)').click()
        let good_url = "https://securea-preprod.germanywestcentral.cloudapp.azure.com/#/t/1/regulation-catalogue/5"
        cy.url().should('eq', good_url)
        cy.wait(1000)

// Open Clause
        cy.get(':nth-child(1) > :nth-child(6) > .overflow-hidden').click()
        good_url = "https://securea-preprod.germanywestcentral.cloudapp.azure.com/#/t/1/regulation/5/clause-requirement/5001"
        cy.url().should('eq', good_url)
        cy.wait(1000)

// Go back using breadcrumbs
        cy.get('.flex-wrap > :nth-child(3) > .flex').click()
        good_url = "https://securea-preprod.germanywestcentral.cloudapp.azure.com/#/t/1/regulation-catalogue/5"
        cy.url().should('eq', good_url)
        cy.wait(1000)

// Open Clause
        cy.get(':nth-child(1) > :nth-child(6) > .overflow-hidden').click()
        good_url = "https://securea-preprod.germanywestcentral.cloudapp.azure.com/#/t/1/regulation/5/clause-requirement/5001"
        cy.url().should('eq', good_url)
        cy.wait(1000)

// Go back using cy.go('back')
        cy.go('back')
        good_url = "https://securea-preprod.germanywestcentral.cloudapp.azure.com/#/t/1/regulation-catalogue/5"
        cy.url().should('eq', good_url)
        cy.wait(1000)
    }) 



    it('Opens and checks Security Requirements Catalogue', () => {
// Open Security Requirements Catalogue
        cy.get('[data-cy="menu_tenant"] > .flex').click()
        cy.get('.dropdown.border-black-200 > .dropdown__link-holder').click()
        cy.get('[href="#/t/1/requirement-catalogue"]').click()
        cy.wait(5000)

// Open asset from the catalogue
        cy.get(':nth-child(1) > :nth-child(2) > .overflow-hidden').click()
        let good_url = "https://securea-preprod.germanywestcentral.cloudapp.azure.com/#/t/1/requirement-catalogue/1"
        cy.url().should('eq', good_url)
        cy.wait(1000)

// Open Requirement Controls
        cy.get('a > .p-button').click()
        good_url = "https://securea-preprod.germanywestcentral.cloudapp.azure.com/#/t/1/mapping/requirement-control/1"
        cy.url().should('eq', good_url)
        cy.wait(1000)

// Go back by closing the R. C. window
        cy.get('header.flex > .justify-between').children().last().click()
        good_url = "https://securea-preprod.germanywestcentral.cloudapp.azure.com/#/t/1/requirement-catalogue/1"
        cy.url().should('eq', good_url)
        cy.wait(1000)

// Open Requirement Controls
        cy.get('a > .p-button').click()
        good_url = "https://securea-preprod.germanywestcentral.cloudapp.azure.com/#/t/1/mapping/requirement-control/1"
        cy.url().should('eq', good_url)
        cy.wait(1000)

// Go back using breadcrumbs
        cy.get('.flex-wrap > :nth-child(3) > .flex').click()
        // if we go back using breadcrumbs the url contains req-browser instead of req-catalogue
        //good_url = "https://securea-preprod.germanywestcentral.cloudapp.azure.com/#/t/1/requirement-browser/1"
        good_url = "https://securea-preprod.germanywestcentral.cloudapp.azure.com/#/t/1/requirement-catalogue/1"
        cy.url().should('eq', good_url)
        cy.wait(1000)

// Open Requirement Controls
        cy.get('a > .p-button').
        good_url = "https://securea-preprod.germanywestcentral.cloudapp.azure.com/#/t/1/mapping/requirement-control/1"
        cy.url().should('eq', good_url)
        cy.wait(2500)

// Go back using cy.go('back')
        cy.go('back')
        cy.go('back')
        good_url = "https://securea-preprod.germanywestcentral.cloudapp.azure.com/#/t/1/requirement-catalogue/1"
        cy.url().should('eq', good_url)
        cy.wait(5000)
    })


    it('Opens and checks BCM Impacts Browser', () => {
// Open BCM Impact Browser
        cy.get('[data-cy="menu_tenant"] > .flex').click()
        cy.wait(1000)
        cy.get(':nth-child(5) > .dropdown > .dropdown__link-holder > .dropdown__link-holder__sub-category-link').click()
        cy.wait(1000)
        cy.get(':nth-child(5) > .dropdown > [data-v-88beb4b6=""] > .dropdown__active > .w-full').click()
        let good_url = 'https://securea-preprod.germanywestcentral.cloudapp.azure.com/#/t/1/impact-browser'
        cy.url().should('eq', good_url)
        cy.wait(1000)

// Open one asset from the browser
        cy.get('.list__body > :nth-child(1) > :nth-child(2)').click()
        good_url = 'https://securea-preprod.germanywestcentral.cloudapp.azure.com/#/t/1/impact-browser/9'
        cy.url().should('eq', good_url)
        cy.wait(1000)

// Open Impact Business Processes
        cy.get('a > .p-button').click()
        good_url = 'https://securea-preprod.germanywestcentral.cloudapp.azure.com/#/t/1/mapping/impact-business_process/9'
        cy.url().should('eq', good_url)
        cy.wait(1000)

// Go back using breadcrumbs
        cy.get('.flex-wrap > :nth-child(3) > .flex').click()
        good_url = 'https://securea-preprod.germanywestcentral.cloudapp.azure.com/#/t/1/impact-browser/9'
        cy.url().should('eq', good_url)
        cy.wait(1000)

// Open Impact Business Processes
        cy.get('a > .p-button').click()
        good_url = 'https://securea-preprod.germanywestcentral.cloudapp.azure.com/#/t/1/mapping/impact-business_process/9'
        cy.url().should('eq', good_url)
        cy.wait(1000)

// Go back by closing I.B.P. browser
        cy.get('header.flex > .justify-between').children().last().click()
        good_url = 'https://securea-preprod.germanywestcentral.cloudapp.azure.com/#/t/1/impact-browser/9'
        cy.url().should('eq', good_url)
        cy.wait(1000)

// Open Impact Business Processes
        cy.get('a > .p-button').click()
        good_url = 'https://securea-preprod.germanywestcentral.cloudapp.azure.com/#/t/1/mapping/impact-business_process/9'
        cy.url().should('eq', good_url)
        cy.wait(1000)

// Go back using cy.go('back')
        cy.go('back')
        good_url = 'https://securea-preprod.germanywestcentral.cloudapp.azure.com/#/t/1/impact-browser/9'
        cy.url().should('eq', good_url)
        cy.wait(1000)
    })
})