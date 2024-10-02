let GlobalUrl;
let NumOfMenuItems = 0;

describe('checks basic functionalities',{ testIsolation:false }, () => {
    it('gets url', () => {
        cy.clearCookies()
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
    
    //Create variables to handle different sections -> dashboard only one link/tenant multiple levels
    it('gets all menu links', () => {
        cy.visit(GlobalUrl);
        //cy.get('[data-cy*=menu]').first().click()
        let mainMenuItemsLength;
        
        //cy.wait(15000)
        cy.get('[data-cy*=menu]').then(($menuElements) => {
            for (let i = 0; i < $menuElements.length; i++) {
                mainMenuItemsLength = $menuElements.length;
                cy.get('[data-cy*=menu]').eq(i).click()
                cy.wait(500)
                cy.get('.dropdown__link-holder').then(($childElements) => {
                    NumOfMenuItems += $childElements.length;
                    cy.get('.dropdown__link-holder > [data-cy]').then(($subMenus) => {
                        for (let i = 0; i < $subMenus.length; i++) {
                            NumOfMenuItems -= $subMenus.length
                            cy.wrap($subMenus).eq(i).click()
                            cy.wait(500)
                            cy.get('.dropdown__active > [href]').then(($subMenuChildren) => {
                                NumOfMenuItems += $subMenuChildren.length
                            })
                            cy.wrap($subMenus).eq(i).click()
                            cy.wait(500)
                        }
                    })
                })
                cy.get('[data-cy*=menu]').eq(i).click()
                cy.wait(500)
            }
        })
        cy.log(NumOfMenuItems)
    })
})
/*
describe.skip('checks mapped things', () => {
    it('errors on login', () => {
        cy.visit(GlobalUrl)
    })
})

describe.skip('checks adding/deleting of data_entries')
*/