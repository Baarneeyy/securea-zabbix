// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('login', (username, password) => {
    cy.visit('https://securea-dev.germanywestcentral.cloudapp.azure.com/')

    cy.get('[type="username"]').type(username)

    cy.get('[type="password"]').type(password)

    cy.get('.submit__btn').click()

    cy.wait(750)

    cy.get('.Vue-Toastification__close-button').should('exist').click()
    //'/t/' -> tenant logged in
    //cy.url().should('include', `/t/`) //removed ${Cypress.env('Demo Company')} cuz random error
})

Cypress.Commands.add('switchTenant', (tenantName) => {
    cy.get('.label-wrapper').click()
    //cy.wait(100)
    
    cy.get('.tenant-selection__content-wrapper')
        .children()
        .contains(tenantName).click()
})

Cypress.Commands.add('changePassword', (oldPassword, newPassword) => {
    cy.get('input').first().type(oldPassword)
    cy.get('input').eq(1).type(newPassword)
    cy.get('input').last().type(newPassword)

    cy.get('.change-pwd__inputs__button').click()
})

Cypress.Commands.add('openManagement', (managementName, browserName) => {
    cy.get('[data-cy="menu_management"]').click()
    cy.contains(`${managementName} Management`).parent()
        .should('not.have.class', '.dropdown__link-holder__active-btn').then(($element) => {
            cy.get($element).click()
        })
    //dropdown__link-holder__active-btn
    cy.contains(`${browserName}`).click()
    cy.get('.wrapper__header').click()
    cy.wait(1500)
})


Cypress.Commands.add('fillDataEntry', (dataEntryName, hasClass) => {
    cy.contains('Add').click({force: true})
    cy.wait(1000)    
    cy.get('#name').type(`${dataEntryName}`)

    cy.get('#description').type(`description of ${dataEntryName}`)
    
    if (hasClass) {
        cy.get('#class').click()
        cy.get('.p-dropdown-item-label').eq(0).click()
    }

    cy.get('.p-inputnumber-input').type(256)

    cy.get('#name').its('text').then((text) => {
        if (text != 'test-add-asset') {
            cy.get('#name').type(`{selectall}{backspace}${dataEntryName}`)
        }
    })
})

Cypress.Commands.add('addDataEntry', (dataEntryName, hasClass=false) => {
    cy.fillDataEntry(dataEntryName, hasClass)
    
    cy.contains('Create').click()
    
    cy.contains(`${dataEntryName}`).should('exist')
})

Cypress.Commands.add('Searchbar', (search) => {
    cy.get('.p-inputtext.p-component').first().as('searchbar')
    cy.get("@searchbar").should('exist')
    cy.get("@searchbar").click()
    cy.get('@searchbar').type(search)
        .type("{enter}")
    cy.wait(1000)
})

Cypress.Commands.add('deleteDataEntry', () => {
    cy.get('.list__body-elem').last().find('.cursor-pointer').click()
    cy.get('.toolbar').children().last().click()

    cy.contains('Yes').click()
    cy.reload()
    cy.wait(1000)
    cy.contains(`test-add-asset`).should('not.exist')
})

Cypress.Commands.add('deleteSpecificEntry', (entryName) => {
    cy.get('p').should('have.text', entryName).as('entry')
})

Cypress.Commands.add('editDataEntry', () => {
    cy.get('.toolbar').children().first().click()
    cy.wait(1000)
    cy.get('#name').type('-update')

    cy.get('.detail-toolbar__inner').children().first().click()

    cy.get('.main-model-detail-container__header').find('button').click()
    cy.wait(500)
    cy.get('.list__body-elem').last()
        .children().eq(1).find('p').invoke('text').then((text) => {
            text = text.replace(/<[^>]*>/g, '').toLowerCase().replace(/\s/g, '').replace(/\u00AD/g, '')
            cy.wrap(text).should('contain', 'test-add-asset-update')
        })
})

Cypress.Commands.add('sortCategory', (categoryName) => {
    //list__header__row opacity-100
    cy.contains(categoryName).as('category')

    cy.get('@category').click()

    cy.get('.gap-y-2').children().first().as('sort')
    
    cy.get('@sort').dblclick()
    
    if (categoryName != 'Id') {
        cy.get('@sort').click()
    }
    
    cy.get('@category').parent().should('not.have.class', '\!text-purple')
    //find clean way to check ordering of items

})

Cypress.Commands.add('AddMapAndSave', (highlight, NO) => {
    cy.get('.p-checkbox-input').eq(NO).click()
    //selects the asset and maps it

    cy.get('[data-p-highlight]').eq(NO).should('have.attr', 'data-p-highlight', highlight)
    //checks if the applied checkbox is checked
})

Cypress.Commands.add('defaultValues', () => {
    cy.get('u').filter(':contains("Default Values")').as('defaultRiskValues').then((defaultRiskValues) => {
        let thresholdTab = 0
        for (let i = 0; i < defaultRiskValues.length; i++) {
            cy.contains('Default Values').click()

            cy.get('.p-inputnumber').as('thresholdValues').then((thresholdValues) => {
                for (let i = 0; i < 8; i += 2) {
                    cy.wait(1000)
                    cy.get('@thresholdValues').eq(i + (thresholdTab * 8)).find('span').children().first().dblclick()
                    
                }
                thresholdTab += 1;
            })

            cy.get('.threshold-tbl-container').eq(i).find('table').find('tbody').find('tr')
                .as('valueRows').then((valueRows) => {
                    let length = valueRows.length
                    for (let i = 0; i < 4; i++) {
                        cy.get('@valueRows').first().children().last().as('deleteRow').click()
                        cy.get('@valueRows').should('have.length', length - (i+1))
                    }
                    cy.contains('Default Values').click()
                    cy.wait(1000)                        
                })                
            cy.wait(1000)
        }
        //cy.contains('Cancel').click()
        
        //checks if inputbox does not accept strings
        //cy.contains('Default Values').click()
        cy.get('.threshold-tbl-container').first().find('table').find('tbody').find('tr').first().children().first().find('span') //selects first row -> its 'from' inputbox
            .find('input').as('fromInput').type('aaa')
        cy.get('@fromInput').should('not.contain', 'aaa')

        //add test to check if inputbox accepts strings

    })
})

Cypress.Commands.add('addMapping', (MapNO, NO, search, searchbar, description) => {
    // NO = 0: for only number 1: for percentage number 2: for two numbers 3: for control browser
    //MapNO = 0: for first mapping 1: for second mapping 2: for third mapping
    //search = mapping search
    //searchbar = first searchbar search 
    //enters name of designated browserMapping asset
    cy.Searchbar(searchbar)
    //selects the element
    cy.get('.overflow-hidden').eq(1).click()
    cy.wait(1000)
    
    //Open BusinessProcessMapping
    //TODO - STRUCTURE
    //0 - 2 String name 
    cy.get('.wrapper__header > a > .p-button').eq(MapNO).click()
    cy.wait(1000)

    //Selects a Business Process

    cy.wait(1000)
    cy.get('.splitpanes__pane > .wrapper > .wrapper__header > .relative > .p-inputtext').click()
        .type(search)
        .type( "{enter}");
    cy.wait(3000)
    cy.AddMapAndSave("true", 1)
    cy.contains(description).click()
    cy.get('.p-inputtextarea').click().type("test")
    //increases value by 1
    //checks if the value for said mapping is 1
    
    //checks if the input can be typed

    //check for strings 
    //saves mapping
    switch (NO) {
        // 0: for only number 1: for percentage number 2: for two numbers 3: for control browser
    case 0: 
        cy.get('.p-inputnumber-button-up').eq(0).click()
        cy.get('[aria-valuenow]').should('have.attr', 'aria-valuenow', '1')
        cy.get('.p-inputnumber > .p-inputtext').eq(0).click().clear().type("35")
        cy.get('[aria-valuenow]').should('have.attr', 'aria-valuenow', '35')
        cy.get('[aria-label="Save"]').click()
        break;
    case 1:
        cy.get('.p-inputnumber-button-up').eq(0).click()
        if (MapNO == 1) {
            cy.get('[aria-valuenow]').should('have.attr', 'aria-valuenow', '2')
        }else {
        cy.get('[aria-valuenow]').should('have.attr', 'aria-valuenow', '81')
        }
        cy.get('.p-inputnumber > .p-inputtext').eq(0).click().clear().type("35")
        cy.get('[aria-label="Save"]').click()
        cy.get('[aria-valuenow]').should('have.attr', 'aria-valuenow', '35')
        //cy.get('.overflow-hidden').children().eq(1).click({ force: true });   
        //cy.get('.p-inputtextarea').click().type("test")
        //cy.get('[aria-label="Save"]').click()
        break;
    case 2:
        cy.get('.p-inputnumber-button-down').eq(0).click()
        cy.get('.p-inputnumber-button-down').eq(1).click()
        cy.wait(500)
        cy.get('[aria-valuenow]').eq(0).should('have.attr', 'aria-valuenow', '99')
        cy.get('[aria-valuenow]').eq(1).should('have.attr', 'aria-valuenow', '99')
        cy.get('.p-inputnumber > .p-inputtext').eq(0).click().clear().type("35")
        cy.get('.p-inputnumber > .p-inputtext').eq(1).click().clear().type("55")
        cy.get('[aria-label="Save"]').click()
        cy.get('[aria-valuenow]').eq(0).should('have.attr', 'aria-valuenow', '35')
        cy.get('[aria-valuenow]').eq(1).should('have.attr', 'aria-valuenow', '55')
        //cy.get('.list__body > .list__body-elem > :nth-child(2)').click()
        //cy.get('.p-inputtextarea').click().type("test")
        //cy.get('[aria-label="Save"]').click()
        break;
    case 3: // only in control browser
        cy.get('.p-inputnumber-button-up').eq(0).click()
        cy.get('[aria-valuenow]').should('have.attr', 'aria-valuenow', '2')
        cy.get('.p-inputnumber > .p-inputtext').eq(0).click().clear().type("35")
        cy.get('[aria-label="Save"]').click()
        cy.get('[aria-valuenow]').should('have.attr', 'aria-valuenow', '35')
        cy.get('.splitpanes__pane > .wrapper > .wrapper__header > .relative > .p-inputtext').click().clear().type("{enter}")
        cy.AddMapAndSave("true", 0)
        cy.get('.px-4').click()
        cy.get('#adjust-implementation_degree > .p-inputnumber-button-group > .p-inputnumber-button-up').click()
        cy.get(':nth-child(2) > [aria-valuenow]').should('have.attr', 'aria-valuenow', '1')
        cy.get('#adjust-implementation_degree > .p-inputtext').click().clear().type("30")
        cy.get(':nth-child(2) > [aria-valuenow]').should('have.attr', 'aria-valuenow', '30')
        cy.get('.px-3').click()
        cy.get('[aria-label="Save"]').click()
        cy.get('.px-4').click()
        cy.get('[aria-valuenow]').each(($el) => {
            cy.wrap($el).should('have.attr', 'aria-valuenow', '30');
          });
        break;
    case 4:
        cy.get('[aria-label="Save"]').click()
        break; 
    }
    
    //navigates back to asset browser
    cy.get('.breadcrumbs__content > :nth-child(2) > .flex').click()

    cy.wait(2000)
    if (searchbar == "NIPS - systém prevencie narušenia siete") {
        cy.wait(6000)
    }
    cy.Searchbar(searchbar)   
    //searches back for mapping specific asset
    
    
    //add 13 assertion

    //.list__body-elem
    cy.get('.list__body-elem').first().click()
    cy.wait(1000)
    cy.get('.wrapper__header > a > .p-button').eq(MapNO).click()
    //cy.contains('business process number 1').click()
    // cy.get('.model-details').find('content').children().first()
    //     .children().eq(1).invoke('text').then((text) => {
            
    //         cy.wrap(text).should('include', '13')
    //     })


    //CURRENT PROGRESS ENDS HERE
    //Enters mapping section again to un-select the current mapping
    
    //never finds
    
    cy.wait(1000)
    
    cy.AddMapAndSave("true", 0)
    cy.wait(1000)
    if (NO == 3) {
        cy.get('.px-4').click()
        cy.get('#adjust-implementation_degree > .p-inputtext').click().clear().type("10")
        cy.get('.px-3').click({force:true})
        cy.get('[aria-label="Save"]').click()
        cy.get('.px-4').click()
        cy.get('[aria-valuenow]').each(($el) => {
            cy.wrap($el).should('have.attr', 'aria-valuenow', '10');
          });
    }
    cy.get('.splitpanes__pane > .wrapper > .wrapper__header > .relative > .p-inputtext').click()
        .type(search)
        .type("{enter}");
    cy.wait(1000) /*
    if (NO == 2 || NO == 1) {
        cy.get('.list__body-elem').first().click()
        cy.get('.p-inputtextarea').should("contain", "test")
    }*/
    cy.contains(description).click()
    cy.get('.p-inputtextarea').invoke('val').should('equal', 'test');
    cy.get('.p-inputtextarea').click().clear()
    cy.AddMapAndSave("false", 1)
    cy.get('[aria-label="Save"]').click()
    cy.get('.breadcrumbs__content > :nth-child(2) > .flex').click()
    cy.wait(2000)
    //disable end
})

Cypress.Commands.add('sort', (SNO, FilterNO) => {
    let numberOfElements;
    cy.get('[aria-controls]').eq(FilterNO).click()
    cy.wait(1000)
    cy.get('.flex-col > .items-center > .p-button').click()
    cy.wait(1000)
    cy.get(':nth-child(2) > .overflow-hidden').its('length').then(length => {
        numberOfElements = length;
        let a = 0;
        for(let i = 0; i < length; i++) {
            cy.get(`:nth-child(${SNO}) > .overflow-hidden`).eq(i).invoke('text').then(value => {
                expect(Number(value)).to.be.at.least(a);
                a = Number(value);
            });
        }

        cy.get('.flex-col > .items-center > .p-button').click()
        cy.wait(1000)

        //edit -> on second sort returns num to be at most 0
        for(let i = 0; i < length; i++) {
            cy.get(`:nth-child(${SNO}) > .overflow-hidden`).eq(i).invoke('text').then(value => {
                expect(Number(value)).to.be.at.most(a);
                a = Number(value);
            });
        }
    
        
});
})

Cypress.Commands.add('sortName', (SNO, FilterNO) => {
    let numberOfElements;
    cy.get('[aria-controls]').eq(FilterNO).click()
    cy.wait(1000)
    cy.get('.flex-col > .items-center > .p-button').click()
    cy.wait(1000)
    cy.get(':nth-child(2) > .overflow-hidden').its('length').then(length => {
        numberOfElements = length;
        let previousItem = '';
        for(let i = 0; i < length; i++) {
            cy.get(`:nth-child(${SNO}) > .overflow-hidden`).eq(i).invoke('text').then(text => {
                // Convert to lowercase for case-insensitive comparison
                const currentText = text.toLowerCase();
    
                if (previousItem !== '') {
                    // Compare with the previous item in the loop
                    expect(currentText.localeCompare(previousItem) >= 0).to.be.true;
                }
                previousItem = currentText;
            });
        }
        cy.wait(1000)
        cy.get('.flex-col > .items-center > .p-button').click()
        cy.wait(1000)
                numberOfElements = length;
        let previousItem2 = '';
        for(let i = length - 1; i >= 0; i--) { // Loop from z to a
            cy.get(`:nth-child(${SNO}) > .overflow-hidden`).eq(i).invoke('text').then(text => {
                // Convert to lowercase for case-insensitive comparison
                const currentText = text.toLowerCase();

                if (previousItem2 !== '') {
                    // Compare with the previous item in the loop
                    expect(currentText.localeCompare(previousItem2) >= 0).to.be.true;
                }
                previousItem2 = currentText;
            });
        }

    });  
});
/*
Cypress.Commands.add('wordfiltertest', (targetWord, targetChar, description) => {
    let a = 0
    
    if (description == 5) {
        cy.get('[aria-controls]').eq(5).click()
        cy.get('.p-menuitem > :nth-child(2)').children().eq(0).click()
        cy.get('.p-menuitem > :nth-child(6)').children().eq(0).click()
        cy.get('[aria-controls]').eq(6).click()
        a = 1
    }
    
    cy.get('.wrapper__header__filter-holder').click();
    cy.get('.flex-row').click();
    cy.get('.flex-col > .flex').children().eq(0).click();
    cy.get('.p-dropdown-items').children().eq(a).click();
    cy.get('.flex-col > .flex').children().eq(1).click();
    cy.get('.p-dropdown-items').children().eq(0).click();
    cy.get('.flex-col > .flex').children().eq(2).click().type(targetWord);
    cy.get('.wrapper__header__filter-container__btn-group').children().eq(0).click();
    cy.wait(1000);
    cy.get(':nth-child(2) > .overflow-hidden').its('length').then(length => {
        for (let i = 0; i < length; i++) {
            cy.get(`:nth-child(${description}) > .overflow-hidden`).eq(i).invoke('html').then(html => {
                let currentText = html.replace(/<[^>]*>/g, '').toLowerCase().replace(/\s/g, '').replace(/\u00AD/g, '');
                let containsTest = false;
                if (currentText.includes(targetWord.toLowerCase())) {
                    containsTest = true;  
                }
                expect(containsTest).to.be.true;
            });
        }
    
    });

    cy.get('.wrapper__header__filter-holder').click();
    cy.get('.flex-col > .flex').children().eq(3).click();
    cy.get('.wrapper__header__filter-container__btn-group').children().eq(0).click();
    cy.get('.wrapper__header__filter-holder').click();
    cy.get('.flex-row').click();
    cy.get('.flex-col > .flex').children().eq(0).click();
    cy.get('.p-dropdown-items').children().eq(a).click();
    cy.get('.flex-col > .flex').children().eq(1).click();
    cy.get('.p-dropdown-items').children().eq(1).click();
    cy.get('.flex-col > .flex').children().eq(2).click().type(targetWord);
    cy.get('.wrapper__header__filter-container__btn-group').children().eq(0).click();
    cy.wait(1000);
    cy.get(':nth-child(2) > .overflow-hidden').its('length').then(length => {
        for (let i = 0; i < length; i++) {
            cy.get(`:nth-child(${description}) > .overflow-hidden`).eq(i).invoke('html').then(html => {
                let currentText = html.replace(/<[^>]*>/g, '').toLowerCase().replace(/\s/g, '').replace(/\u00AD/g, '');
                let containsTest = false;
                if (!currentText.includes(targetWord.toLowerCase())) {
                    containsTest = true;  
                }
                expect(containsTest).to.be.true;
            });
        }
    
    });
    cy.get('.wrapper__header__filter-holder').click();
    cy.get('.flex-col > .flex').children().eq(3).click();
    cy.get('.wrapper__header__filter-container__btn-group').children().eq(0).click();
    cy.get('.wrapper__header__filter-holder').click();
    cy.get('.flex-row').click();
    cy.get('.flex-col > .flex').children().eq(0).click();
    cy.get('.p-dropdown-items').children().eq(a).click();
    cy.get('.flex-col > .flex').children().eq(1).click();
    cy.get('.p-dropdown-items').children().eq(2).click();
    cy.get('.flex-col > .flex').children().eq(2).click().type(targetChar);
    cy.get('.wrapper__header__filter-container__btn-group').children().eq(0).click();
    cy.wait(1000);
    cy.get(':nth-child(2) > .overflow-hidden').its('length').then(length => {
        for (let i = 0; i < length; i++) {
            cy.get(`:nth-child(${description}) > .overflow-hidden`).eq(i).invoke('html').then(html => {
                let currentText = html.replace(/<[^>]*>/g, '').toLowerCase().replace(/\s/g, '').replace(/\u00AD/g, '');
                let firstCharIsT = false;
                if (currentText.charAt(0) === targetChar) {
                    firstCharIsT = true;  
                }
                expect(firstCharIsT).to.be.true;
            });
        }
    });
    cy.get('.wrapper__header__filter-holder').click();
    cy.get('.flex-col > .flex').children().eq(3).click();
    cy.get('.wrapper__header__filter-container__btn-group').children().eq(0).click();
    cy.get('.wrapper__header__filter-holder').click();
    cy.get('.flex-row').click();
    cy.get('.flex-col > .flex').children().eq(0).click();
    cy.get('.p-dropdown-items').children().eq(a).click();
    cy.get('.flex-col > .flex').children().eq(1).click();
    cy.get('.p-dropdown-items').children().eq(3).click();
    cy.get('.flex-col > .flex').children().eq(2).click().type(targetChar);
    cy.get('.wrapper__header__filter-container__btn-group').children().eq(0).click();
    cy.wait(1000);
    cy.get(':nth-child(2) > .overflow-hidden').its('length').then(length => {
        for (let i = 0; i < length; i++) {
            cy.get(`:nth-child(${description}) > .overflow-hidden`).eq(i).invoke('html').then(html => {
                let currentText = html.replace(/<[^>]*>/g, '').toLowerCase().replace(/\s/g, '').replace(/\u00AD/g, '');
                let lastCharIsT = false;
                if (currentText.charAt(currentText.length - 1) === targetChar) {
                    lastCharIsT = true;  
                }
                expect(lastCharIsT).to.be.true;
            });
        }
    });

    cy.get('.wrapper__header__filter-holder').click();
    cy.get('.flex-col > .flex').children().eq(3).click();
    cy.get('.wrapper__header__filter-container__btn-group').children().eq(0).click();
    cy.get('.wrapper__header__filter-holder').click();
    cy.get('.flex-row').click();
    cy.get('.flex-col > .flex').children().eq(0).click();
    cy.get('.p-dropdown-items').children().eq(a).click();
    cy.get('.flex-col > .flex').children().eq(1).click();
    cy.get('.p-dropdown-items').children().eq(4).click();
    cy.get('.flex-col > .flex').children().eq(2).click().type(targetWord);
    cy.get('.wrapper__header__filter-container__btn-group').children().eq(0).click();
    cy.wait(1000);
    cy.get(':nth-child(2) > .overflow-hidden').its('length').then(length => {
        for (let i = 0; i < length; i++) {
            cy.get(`:nth-child(${description}) > .overflow-hidden`).eq(i).invoke('html').then(html => {
                let currentText = html.replace(/<[^>]*>/g, '').toLowerCase().replace(/\s/g, '').replace(/\u00AD/g, '');
                let lastCharIsT = false;
                if (currentText === targetWord) {
                    lastCharIsT = true;  
                }
                expect(lastCharIsT).to.be.true;
            });
        }
    });

    cy.get('.wrapper__header__filter-holder').click();
    cy.get('.flex-col > .flex').children().eq(3).click();
    cy.get('.wrapper__header__filter-container__btn-group').children().eq(0).click();
    cy.get('.wrapper__header__filter-holder').click();
    cy.get('.flex-row').click();
    cy.get('.flex-col > .flex').children().eq(0).click();
    cy.get('.p-dropdown-items').children().eq(a).click();
    cy.get('.flex-col > .flex').children().eq(1).click();
    cy.get('.p-dropdown-items').children().eq(5).click();
    cy.get('.flex-col > .flex').children().eq(2).click().type(targetWord);
    cy.get('.wrapper__header__filter-container__btn-group').children().eq(0).click();
    cy.wait(1000);
    cy.get(':nth-child(2) > .overflow-hidden').its('length').then(length => {
        for (let i = 0; i < length; i++) {
            cy.get(`:nth-child(${description}) > .overflow-hidden`).eq(i).invoke('html').then(html => {
                let currentText = html.replace(/<[^>]*>/g, '').toLowerCase().replace(/\s/g, '').replace(/\u00AD/g, '');
                let lastCharIsT = true;
                if (currentText === targetWord) {
                    lastCharIsT = false;  
                }
                expect(lastCharIsT).to.be.true;
            });
        }
    });

    if (description == 5) {
        cy.get('[aria-controls]').eq(5).click()
        cy.get('.p-menuitem > :nth-child(2)').children().eq(0).click()
        cy.get('.p-menuitem > :nth-child(6)').children().eq(0).click()
        cy.get('[aria-controls]').eq(6).click()
    }


});
*/
Cypress.Commands.add('classfilter', (NO) => {   
    cy.get('[aria-controls]').eq(5).click()
    cy.get('.p-menuitem > :nth-child(2)').children().eq(0).click()
    cy.get(`.p-menuitem > :nth-child(${NO + 5})`).children().eq(0).click()
    cy.get('[aria-controls]').eq(5).click()
    cy.get('.wrapper__header__filter-holder').click();
    cy.get('.flex-row').click();
    cy.get('.flex-col > .flex').children().eq(0).click();
    cy.get('.p-dropdown-items').children().eq(NO).click();
    cy.get('.flex-col > .flex').children().eq(1).click();
    cy.get('.p-dropdown-items').children().eq(0).click();
    cy.get('.flex-col > .flex').children().eq(2).click();
    let TargetText = ""
    cy.get('.p-multiselect-items').children().eq(0).invoke('text').then((text) => {
        TargetText = text.replace(/<[^>]*>/g, '').toLowerCase().replace(/\s/g, '').replace(/\u00AD/g, '');
        return TargetText;
      });
    cy.get('.p-multiselect-items').children().eq(0).click();
    cy.get('.p-multiselect-header').children().eq(-1).click();
    cy.get('.wrapper__header__filter-container__btn-group').children().eq(0).click();
    cy.wait(1000);
    cy.get(':nth-child(2) > .overflow-hidden').its('length').then(length => {
        for (let i = 0; i < length; i++) {
            cy.get(`:nth-child(5) > .overflow-hidden`).eq(i).invoke('html').then(html => {
                let currentText = html.replace(/<[^>]*>/g, '').toLowerCase().replace(/\s/g, '').replace(/\u00AD/g, '');
                let containsTest = false;
                if (currentText.includes(TargetText)) {
                    containsTest = true;  
                }
                expect(containsTest).to.be.true;
            });
        }
    
    });
    cy.get('.wrapper__header__filter-holder').click();
    cy.get('.flex-col > .flex').children().eq(3).click();
    cy.get('.wrapper__header__filter-container__btn-group').children().eq(0).click();
    cy.get('.wrapper__header__filter-holder').click();
    cy.get('.flex-row').click();
    cy.get('.flex-col > .flex').children().eq(0).click();
    cy.get('.p-dropdown-items').children().eq(NO).click();
    cy.get('.flex-col > .flex').children().eq(1).click();
    cy.get('.p-dropdown-items').children().eq(1).click();
    cy.get('.flex-col > .flex').children().eq(2).click();
    cy.get('.p-multiselect-items').children().eq(0).click();
    cy.get('.p-multiselect-header').children().eq(-1).click();
    cy.get('.wrapper__header__filter-container__btn-group').children().eq(0).click();
    cy.wait(1000);
    cy.get(':nth-child(2) > .overflow-hidden').its('length').then(length => {
        for (let i = 0; i < length; i++) {
            cy.get(`:nth-child(5) > .overflow-hidden`).eq(i).invoke('html').then(html => {
                let currentText = html.replace(/<[^>]*>/g, '').toLowerCase().replace(/\s/g, '').replace(/\u00AD/g, '');
                let containsTest = false;
                if (!currentText.includes(TargetText)) {
                    containsTest = true;  
                }
                expect(containsTest).to.be.true;
            });
        }
    
    }); 
    cy.get('[aria-controls]').eq(5).click()
    cy.get('.p-menuitem > :nth-child(2)').children().eq(0).click()
    cy.get(`.p-menuitem > :nth-child(${NO + 5})`).children().eq(0).click()
    cy.get('[aria-controls]').eq(5).click()
})

Cypress.Commands.add('ValueFilter', (ValueNO, ValueNO2) => {
    cy.get('[aria-controls]').eq(5).click()
    cy.get('.p-menuitem > :nth-child(2)').children().eq(0).click()
    cy.get('.p-menuitem > :nth-child(8)').children().eq(0).click()
    cy.get('[aria-controls]').eq(6).click()
    for(let a = 0; a < 8; a++) {
        cy.get('.wrapper__header__filter-holder').click();
        cy.get('.flex-row').click();
        cy.get('.flex-col > .flex').children().eq(0).click();
        cy.get('.p-dropdown-items').children().eq(3).click();
        cy.get('.flex-col > .flex').children().eq(1).click();
        cy.get('.p-dropdown-items').children().eq(a).click();
        if (a != 4 && a != 5) {
        cy.get('.flex-col > .flex').children().eq(2).click().type(ValueNO);
        cy.get('.wrapper__header__filter-container__btn-group').children().eq(0).click();
        cy.wait(1000);
        cy.get(':nth-child(2) > .overflow-hidden').its('length').then(length => {
            for (let i = 0; i < length; i++) {
                cy.get(`:nth-child(5) > .overflow-hidden`).eq(i).invoke('text').then(value => {
                    let containsTest = false;
                    switch(a) {
                        case 0:
                            if (value > ValueNO) {
                                containsTest = true;  
                            }
                            expect(containsTest).to.be.true;
                            break;
                        case 1:
                            if (value >= ValueNO) {
                                containsTest = true;  
                            }
                            expect(containsTest).to.be.true;
                            break;
                        case 2:
                            if (value < ValueNO) {
                                containsTest = true;  
                            }
                            expect(containsTest).to.be.true;
                            break;
                        case 3:
                            if (value <= ValueNO) {
                                containsTest = true;  
                            }
                            expect(containsTest).to.be.true;
                            break;
                        case 6:
                            if (value == ValueNO) {
                                containsTest = true;  
                            }
                            expect(containsTest).to.be.true;
                            break;
                        case 7:
                            if (value != ValueNO) {
                                containsTest = true;  
                            }
                            expect(containsTest).to.be.true;
                            break;
                    }
                });
            }
        
        }); 
        } else {
            cy.get(':nth-child(1) > #minmax').click().type(ValueNO);
            cy.get(':nth-child(2) > #minmax').click().clear().type( ValueNO2);
            cy.get('.wrapper__header__filter-container__btn-group').children().eq(0).click();
            cy.wait(1000);
            cy.get(':nth-child(2) > .overflow-hidden').its('length').then(length => {
                for (let i = 0; i < length; i++) {
                    cy.get(`:nth-child(5) > .overflow-hidden`).eq(i).invoke('text').then(value => {
                        let containsTest = false;
                        switch(a) {
                            case 4:
                            if (value >= ValueNO && value <= ValueNO2) {
                                containsTest = true;  
                            }
                            expect(containsTest).to.be.true;
                            break;
                            case 5:
                            if (value <= ValueNO || value >= ValueNO2) {
                                containsTest = true;  
                            }
                            expect(containsTest).to.be.true;
                            break;
                        }
            });
        }
    
    });
        }
    }
    cy.get('[aria-controls]').eq(5).click()
    cy.get('.p-menuitem > :nth-child(2)').children().eq(0).click()
    cy.get('.p-menuitem > :nth-child(8)').children().eq(0).click()
    cy.get('[aria-controls]').eq(6).click()
})

Cypress.Commands.add('wordfilter', (targetWord, targetChar, description) => {
    let a = 0
    switch(description) {
        case 2:
            a = 0;
            break;
        case 5:
            a = 1;
            cy.get('[aria-controls]').eq(5).click()
            cy.get('.p-menuitem > :nth-child(2)').children().eq(0).click()
            cy.get('.p-menuitem > :nth-child(6)').children().eq(0).click()
            cy.get('[aria-controls]').eq(6).click()
            break;
        case 6:
            a = 2;
            cy.get('[aria-controls]').eq(5).click()
            cy.get('.p-menuitem > :nth-child(2)').children().eq(0).click()
            cy.get('.p-menuitem > :nth-child(7)').children().eq(0).click()
            cy.get('[aria-controls]').eq(6).click()
            break;
    }
    for (let b = 0; b < 6; b++) {
        cy.get('.wrapper__header__filter-holder').click();
        cy.get('.flex-row').click();
        cy.get('.flex-col > .flex').children().eq(0).click();
        cy.get('.p-dropdown-items').children().eq(a).click();
        cy.get('.flex-col > .flex').children().eq(1).click();
        cy.get('.p-dropdown-items').children().eq(b).click();
        if (b == 2 || b == 3) {
            cy.get('.flex-col > .flex').children().eq(2).click().type(targetChar);
        } else {
        cy.get('.flex-col > .flex').children().eq(2).click().type(targetWord);
        }
        cy.get('.wrapper__header__filter-container__btn-group').children().eq(0).click();
        cy.wait(1000);
        cy.get(':nth-child(2) > .overflow-hidden').its('length').then(length => {
            for (let i = 0; i < length; i++) {
                cy.get(`:nth-child(${description}) > .overflow-hidden`).eq(i).invoke('html').then(html => {
                    let currentText = html.replace(/<[^>]*>/g, '').toLowerCase().replace(/\s/g, '').replace(/\u00AD/g, '');
                    let containsTest = false;
                    switch(b) {
                        case 0:
                            if (currentText.includes(targetWord.toLowerCase())) {
                                containsTest = true;  
                            }
                            expect(containsTest).to.be.true;
                            break;
                        case 1:
                            if (!currentText.includes(targetWord.toLowerCase())) {
                                containsTest = true;  
                            }
                            expect(containsTest).to.be.true;
                            break;
                        case 2:
                            if (currentText.charAt(0) === targetChar) {
                                containsTest = true;  
                            }
                            expect(containsTest).to.be.true;
                            break;
                        case 3:
                            if (currentText.charAt(currentText.length - 1) === targetChar) {
                                containsTest = true;  
                            }
                            expect(containsTest).to.be.true;
                            break;
                        case 4:
                            if (currentText === targetWord) {
                                containsTest = true;  
                            }
                            expect(containsTest).to.be.true;
                            break;
                        case 5:
                            if (currentText != targetWord) {
                                containsTest = true;  
                            }
                            expect(containsTest).to.be.true;
                            break;
                    }
                });
            }
        
        });
    }
    switch(description) {
        case 2:
            a = 0;
            break;
        case 5:
            a = 1;
            cy.get('[aria-controls]').eq(5).click()
            cy.get('.p-menuitem > :nth-child(2)').children().eq(0).click()
            cy.get('.p-menuitem > :nth-child(6)').children().eq(0).click()
            cy.get('[aria-controls]').eq(6).click()
            break;
        case 6:
            a = 2;
            cy.get('[aria-controls]').eq(5).click()
            cy.get('.p-menuitem > :nth-child(2)').children().eq(0).click()
            cy.get('.p-menuitem > :nth-child(7)').children().eq(0).click()
            cy.get('[aria-controls]').eq(6).click()
            break;
    }
})

Cypress.Commands.add('checkMappedAmount', (mappingSection, classMapping) => {
    cy.get('.wrapper__header').eq(mappingSection).find('.mr-1').find('span').invoke('text').then((entryCount) => {
        entryCount = entryCount.replace(/[()]/g, '')
        cy.get('.flex.items-center.field__name').eq(2).parent().children().eq(1).invoke('text').then((assetClass) => {
            cy.get('.flex.items-center.field__name').eq(2).children().click()
            cy.wait(750)
            cy.Searchbar(assetClass)
            cy.get('.list__body-elem').click()
            cy.wait(750)
            cy.get('.list__body').eq(classMapping).find('.list__body-elem').should('have.length', entryCount)
        })
    })
})

import addContext from 'mochawesome/addContext';
Cypress.Commands.add('addContext', (context) => {
  cy.once('test:after:run', (test) => addContext({ test }, context));
});

require('cy-verify-downloads').addCustomCommand();
//upratat podla funkcionality - navigation - interaction