const { describe } = require("mocha");

describe('Login and switch tenant', { testIsolation: false }, () =>{
    it('login', () => {
        cy.clearCookies()
// Open preprod and login
        cy.setupUser1(Cypress.env('PRE_USER_ADMIN'), Cypress.env('PRE_PASS_ADMIN'), 'demoTestingZ', 'Tenant', 'Configuration', 'Asset Class Catalogue')
        cy.wait(250)
        cy.get('.wrapper__header >', {timeout:8000}).should('have.length', '4')
    })
})

describe('Check Asset Class Catalogue Mapping', { testIsolation: false }, () => {
    it('Opens A.C.C. and checks Class Controls', () => {
// Open one asset in the catalogue
        cy.get('.list__body > :nth-child(1) > :nth-child(2)').click()
        let good_url = "/asset_class-browser/1"
        cy.url().should('contain', good_url)
        cy.wait(1000)
// Open Asset Class Controls
        cy.get(':nth-child(2) > .wrapper__header > a > .p-button').click()
        good_url = "/mapping/asset_class-control/1"
        cy.url().should('contain', good_url)
        cy.wait(1000)
// Go back to the asset in catalogue using breadcrumbs
        cy.get('.flex-wrap > :nth-child(3) > .flex').click()
        good_url = "/asset_class-browser/1"
        cy.url().should('contain', good_url)
        cy.wait(1000)
// Open Asset Class Controls
        cy.get(':nth-child(2) > .wrapper__header > a > .p-button').click()
        good_url = "/mapping/asset_class-control/1"
        cy.url().should('contain', good_url)
        cy.wait(1000)
// Go back to the asset in catalogue using cy.go('back') *web-browser back button*
        cy.go('back')
        good_url = "/asset_class-browser/1"
        cy.url().should('contain', good_url)
        cy.wait(1000)
// Open Asset Class Controls
        cy.get(':nth-child(2) > .wrapper__header > a > .p-button').click()
        good_url = "/asset_class-control/1"
        cy.url().should('contain', good_url)
        cy.wait(1000)
// Go back by closing the Asset Class Control window
        cy.get('header.flex > .justify-between').children().last().click()
        good_url = "/asset_class-browser/1"
        cy.url().should('contain', good_url)
        cy.wait(1000)
// Open Asset Class Assets
        cy.get(':nth-child(1) > .wrapper__header > a > .p-button').click()
        good_url = "/asset-browser"
        cy.url().should('contain', good_url)
        cy.wait(1000)
// Go back to the asset in catalogue using cy.go('back') *web-browser back button*
        cy.go('back')
        good_url = "/asset_class-browser/1"
        cy.url().should('contain', good_url)
        cy.wait(1000)
    })
    it('Checks Class Threats', () => {
// Open Asset Class Threats
        cy.get(':nth-child(3) > .wrapper__header > a > .p-button').click()
        let good_url = "/mapping/asset_class-threat/1"
        cy.url().should('contain', good_url)
        cy.wait(1000)
// Go back to the asset in catalogue using breadcrumbs
        cy.get('.flex-wrap > :nth-child(3) > .flex').click()
        good_url = "/asset_class-browser/1"
        cy.url().should('contain', good_url)
        cy.wait(1000)
// Open Asset Class Threats
        cy.get(':nth-child(3) > .wrapper__header > a > .p-button').click()
        good_url = "/mapping/asset_class-threat/1"
        cy.url().should('contain', good_url)
        cy.wait(1000)
// Go back to the asset in catalogue using cy.go('back') *web-browser back button*
        cy.go('back')
        good_url = "/asset_class-browser/1"
        cy.url().should('contain', good_url)
        cy.wait(1000)
// Open Asset Class Threats
        cy.get(':nth-child(3) > .wrapper__header > a > .p-button').click()
        good_url = "/mapping/asset_class-threat/1"
        cy.url().should('contain', good_url)
        cy.wait(1000)
// Go back by closing the Asset Class Control window
        cy.get('header.flex > .justify-between').children().last().click()
        good_url = "/asset_class-browser/1"
        cy.url().should('contain', good_url)
        cy.wait(1000)
    })
})

describe('Checks Regulation Catalogue mapping', { testIsolation: false }, () => {
    it('Opens and checks Regulation Catalogue', () => {
// Open Regulation Catalogue
        cy.get('[data-cy="menu_tenant"] > .flex').click()
        //cy.get('.dropdown.border-black-200 > .dropdown__link-holder').click()
        cy.contains('Regulation Catalogue').click()
        cy.wait(1000)
// Open one asset in Regulation Catalogue
        cy.get('.list__body > :nth-child(1) > :nth-child(2)').click()
        let good_url = "/regulation-catalogue"
        cy.url().should('contain', good_url)
        cy.wait(1000)
// Open Clause
        cy.get(':nth-child(1) > :nth-child(6):last').click()
        good_url = "/regulation/11/clause-requirement/110001"
        cy.url().should('contain', good_url)
        cy.wait(1000)
// Go back using breadcrumbs
        cy.get('.flex-wrap > :nth-child(3) > .flex').click()
        good_url = "/regulation-catalogue/11"
        cy.url().should('contain', good_url)
        cy.wait(1000)
// Open Clause
        cy.get(':nth-child(1) > :nth-child(6):last').click()
        good_url = "/regulation/11/clause-requirement/110001"
        cy.url().should('contain', good_url)
        cy.wait(1000)
// Go back using cy.go('back')
        cy.go('back')
        good_url = "/regulation-catalogue/11"
        cy.url().should('contain', good_url)
        cy.wait(1000)
    }) 
})

describe('Check Security Requirements Catalogue Mapping', { testIsolation: false }, () => {
    it('Opens and checks S.R.C. Controls', () => {
// Open Security Requirements Catalogue
        cy.get('[data-cy="menu_tenant"] > .flex').click()
        cy.get('.dropdown.border-black-200 > .dropdown__link-holder').click()
        cy.contains('Requirements Catalogue').click()
        cy.wait(5000)
// Open asset from the catalogue
        cy.get(':nth-child(1) > :nth-child(2) > .overflow-hidden').click()
        let good_url = "/requirement-catalogue/1"
        cy.url().should('contain', good_url)
        cy.wait(1000)
// Open Requirement Controls
        cy.get('a > .p-button').click()
        good_url = "/mapping/requirement-control/1"
        cy.url().should('contain', good_url)
        cy.wait(1000)
// Go back by closing the R. C. window
        cy.get('header.flex > .justify-between').children().last().click()
        good_url = "/requirement-catalogue/1"
        cy.url().should('contain', good_url)
        cy.wait(1000)
// Open Requirement Controls
        cy.get('a > .p-button').click()
        good_url = "/mapping/requirement-control/1"
        cy.url().should('contain', good_url)
        cy.wait(1000)
// Go back using breadcrumbs
        cy.get('.flex-wrap > :nth-child(3) > .flex').click()
        // if we go back using breadcrumbs the url contains req-browser instead of req-catalogue
        good_url = "/requirement-catalogue/1"
        cy.url().should('contain', good_url)
        cy.wait(1000)
// Open Requirement Controls
        cy.get('a > .p-button').
        good_url = "/mapping/requirement-control/1"
        cy.url().should('contain', good_url)
        cy.wait(2500)
// Go back using cy.go('back')
        cy.go('back')
        cy.go('back')
        good_url = "/requirement-catalogue/1"
        cy.url().should('contain', good_url)
        cy.wait(5000)
    })
})

describe('Check BCM Mapping', { testIsolation: false }, () => {
    it('Opens and checks Impact Business Processes', () => {
// Open BCM Impact Browser
        cy.get('[data-cy="menu_tenant"] > .flex').click()
        cy.wait(1000)
        cy.get(':nth-child(5) > .dropdown > .dropdown__link-holder > .dropdown__link-holder__sub-category-link').click()
        cy.wait(1000)
        cy.get(':nth-child(5) > .dropdown > [data-v-88beb4b6=""] > .dropdown__active > .w-full').click()
        let good_url = '/impact-browser'
        cy.url().should('contain', good_url)
        cy.wait(1000)
// Open one asset from the browser
        cy.get('.list__body > :nth-child(1) > :nth-child(3)').click()
        good_url = '/impact-browser/1'
        cy.url().should('contain', good_url)
        cy.wait(1000)
// Open Impact Business Processes
        cy.get('a > .p-button').click()
        good_url = '/mapping/impact-business_process/1'
        cy.url().should('contain', good_url)
        cy.wait(1000)
// Go back using breadcrumbs
        cy.get('.flex-wrap > :nth-child(3) > .flex').click()
        good_url = '/impact-browser/1'
        cy.url().should('contain', good_url)
        cy.wait(1000)
// Open Impact Business Processes
        cy.get('a > .p-button').click()
        good_url = '/mapping/impact-business_process/1'
        cy.url().should('contain', good_url)
        cy.wait(1000)
// Go back by closing I.B.P. browser
        cy.get('header.flex > .justify-between').children().last().click()
        good_url = '/impact-browser/1'
        cy.url().should('contain', good_url)
        cy.wait(1000)
// Open Impact Business Processes
        cy.get('a > .p-button').click()
        good_url = '/mapping/impact-business_process/1'
        cy.url().should('contain', good_url)
        cy.wait(1000)
// Go back using cy.go('back')
        cy.go('back')
        good_url = '/impact-browser/1'
        cy.url().should('contain', good_url)
        cy.wait(1000)
    })
})