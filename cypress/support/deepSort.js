Cypress.Commands.add('newSort', () => {
    //8 categories; -> add func to add from ... new columns
    const columnList = []
    cy.createColumnList(columnList)
    cy.wait(1000)
    cy.log(0 < columnList.length)
    cy.get('.wrapper__header').then(() => {
        for (let i = 0; i < columnList.length; i++) {
            let ignoreName = columnList[i].toLowerCase()
            cy.disableColumns(ignoreName)
            cy.disableColumns(ignoreName)
            cy.wait(750)
            cy.sortColumn()
            if (ignoreName == "name") {
                cy.compareStringVals()
            } else {
                cy.compareNumericVals()
            }
            cy.wait(750)
        }
    })
    /*cy.get('.list__header-elem').as('sort').its('length').then((length) => {
        for (let i = 0; i < length; i++) { 
            //take text of sort to lowercase -> compare to .p-menuitem lowercase
            cy.get('@sort').eq(i).find('p').invoke('text').then((text)=> {
                let ignoreName = text.toLowerCase()
                cy.wait(750)
                cy.disableColumns(ignoreName)
                cy.sortColumn()
                if (ignoreName == "name") {
                    cy.compareStringVals()
                } else {
                    cy.compareNumericVals()
                }
                //cy.sortColumn()
                //cy.compareNumericVals(false)
                //IF CURRENT COLUMN IS NUMERIC COMPNUMVAL// ELSE COMPSTRVAL// DICT OF COLUMNS AND THEIR TYPES
                //cy.resetColumns()

                //
                cy.wait(1000)
            })
            
        }
    })*/
})
//ONLY ENABLE ONE COLUMN AT A TIME
Cypress.Commands.add('sortColumn', () => {
    cy.get('.list__header-elem').click()
    cy.wait(750)
    cy.get('.flex-col > .items-center > .p-button > .p-button-label').click()
    cy.wait(750)
    cy.get('.wrapper__header').click()
})

Cypress.Commands.add('disableColumns', (ignoreName) => {
    cy.get('.list__header__row').children().last().click()
    cy.wait(750)
    cy.get('.p-menuitem').its('length').then((length) => {
        for (let i = 0; i < (length-1); i++) {
            cy.get('.p-menuitem').eq(i).then($el => {
                cy.wrap($el).find('p').invoke('text').then((text) => {
                    if (text.toLowerCase() != ignoreName) {
                        if ($el.find('.opacity-100').length > 0) { //add check for curren selected element -> DONE
                            cy.wrap($el).click()
                            //cy.wait(750)
                            //ADD BLOCKER FOR SHRINK/WRAP TEXT
                        }
                    } else if (text.toLowerCase() == ignoreName && $el.find('.opacity-75').length > 0) {
                        cy.wrap($el).click()
                    }
                })
            })
        }
    })
    cy.get('.wrapper__header').click()
    cy.wait(750)
})

Cypress.Commands.add('resetColumns', () => {
    cy.get('.list__header__row').children().last().click()
    cy.wait(750)
    cy.get('.p-menuitem').its('length').then((length) => {
        for (let i = 0; i < (length-1); i++) {
            cy.get('.p-menuitem').eq(i).then($el => {
                if ($el.find('.opacity-75').length > 0) {
                    cy.wrap($el).click()
                    //ADD BLOCKER FOR SHRINK/WRAP TEXT
                }
            })
        }
    })
    cy.get('.wrapper__header').click()
    cy.wait(750)
})

Cypress.Commands.add('compareNumericVals', (descending=true) => {
    cy.get('.list__body-elem__default').as('row').its('length').then((length) => {
        for (let i = 0; i < (length-1); i++) {
            cy.get('@row').eq(i).find('p').invoke('text').then((text) => {
                let firstNum = Number(text)
                cy.get('@row').eq(i+1).find('p').invoke('text').then((text) => {
                    let secondNum = Number(text)
                    if (descending) {
                        expect(firstNum).to.be.at.least(secondNum)
                    } else {
                        expect(secondNum).to.be.at.least(firstNum)
                    }
                })
            })
        }
    })
    cy.wait(750)
})

Cypress.Commands.add('compareStringVals', (descending=true) => {
    cy.get('.list__body-elem__default').as('row').its('length').then((length) => {
        for (let i = 0; i < (length-1); i++) {
            cy.get('@row').eq(i).find('p').invoke('text').then((firstText) => {
                cy.get('@row').eq(i+1).find('p').invoke('text').then((secondText) => {
                    let result = firstText.localeCompare(secondText)
                    if (descending) {
                        expect(result).to.be.at.most(0)
                    } else {
                        expect(result).to.be.at.least(0)
                    }
                })
            })
        }
    })
})

//create array/list with names of current categories
Cypress.Commands.add('createColumnList', (columnList) => {
    cy.resetColumns()
    cy.get('.list__header-elem').as('sort').its('length').then((length) => {
        for (let i = 0; i < length; i++) { 
            //take text of sort to lowercase -> compare to .p-menuitem lowercase
            cy.get('@sort').eq(i).find('p').invoke('text').then((text)=> {
                let columnName = text.toLowerCase()
                columnList[i] = columnName
                
            })
            
        }
        cy.log(columnList)
        cy.reload()
        cy.wait(2000)
    })
})


//GOTTA CREATE ALGO FOR ALPHABETICAL COMPARISON
//localeCompare
//or via < >