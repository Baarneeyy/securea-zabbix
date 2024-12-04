describe('newly made asset has threats and controls assigned from asset class', () => {
    let counts = {
        0: 'controls',
        1: 'threats'
    }
    it('creates a new asset with propagated threats and assets', () => {
        cy.setupUser('demoTestingTomas', 'Asset Browser')
        cy.get('.wrapper__header >', {timeout:16000}).should('have.length', '4') //-> waits for load sequence to be finished
        cy.get('[data-cy="assetBrowser_add"]').click()
        cy.get('.\\!grid').should('have.length', 1) //-> checks if asset creation window is shown
        cy.fillDataEntry()
        cy.addConfirm()
        //cy.get('.list__body-elem').last().click({force:true})
        cy.wait(500)

        //Asserts that propagated assets and threats show correct number of data-entries
        for (let i = 2; i < 4; i++) {
            cy.get(`.list__body:nth(${i}) >`).its('length').then((length) => {
                cy.get(`.wrapper__header:nth(${i}) > >:first`).should('have.text', length.toString())
                counts[i-2] = length;
            })
        }
        cy.then(() => {
            cy.log(counts)
        })
    })

    it('is possible to adjust mapped threats', () => {
        cy.setupUser('demoTestingTomas', 'Asset Browser')
        cy.get('.wrapper__header >', {timeout:16000}).should('have.length', '4') //-> waits for load sequence to be finished
        cy.get('.list__body-elem').last().click({force:true})
        cy.wait(500)
        cy.get(':nth-child(3) > .wrapper__header >').last().click() //-> relinks to Asset-Threat mapping window

        cy.intercept('GET', '/api/t/*/asset/*/threat').as('fullLoad'); //-> request | screen is loaded for user
        cy.wait('@fullLoad', {timeout:20000}).then((interception) => {
            //Verify if request was successful
            expect(interception.response.statusCode).to.eq(200);
        }); ///////////////////////////////////////////////////////////////////////////////////////////////////////////
        
        //Maps the first data entry without anything
        cy.get('.list__body:nth(1)>:nth-child(1)>>> .checkbox-style').click()
        cy.get('.primary-btn').should('exist').click()
        cy.get('.Vue-Toastification__toast-body', {timeout:16000}).should('exist')
        cy.get('.Vue-Toastification__toast-body', {timeout:16000}).should('contain', 'successfully')
        cy.go(-1)
        cy.get('.list__body', {timeout:8000}).should('have.length', 4)
        cy.get('.wrapper__header:first >', {timeout:8000}).should('have.length', 4)

        cy.get('.wrapper__header:nth(3) > >:first').invoke('text').then((newCount) => {
            expect(parseInt(newCount)).to.be.greaterThan(parseInt(counts[1]))
        })
    })

    //Tenant Name and asset id needed
    it.skip('is possible to adjust mapped controls', () => { //potential benefit; highlighted items

        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'tomas_workflow_tests', 'Management', 'Risk Management', 'Asset Browser')
        cy.get('.wrapper__header >', {timeout:8000}).should('have.length', '4')
        
        cy.get('.list__body-elem').last().as('testAsset')

        cy.intercept( 'GET' ,'/api/t/*/asset/*/control/applicable', (req) => {
            req.continue()
        }).as('applicableFilter')

        cy.get('.list__body-elem').last().click({force:true})
        cy.wait(500)
        cy.get(':nth-child(2) > .wrapper__header >').last().click()
        cy.wait(1000)
        cy.get('.flex-col > .mt-4', {timeout:18000}).should('not.exist')

        //applicable request -> to intercept
        cy.wait('@applicableFilter')

        cy.get(':nth-child(1) > :nth-child(5) > .gap-x-1 > .checkbox-style')
            .check() //first mapping
        cy.wait(250)
        cy.get('.p-checkbox-input').click()
        
        //Checks number of classes for a highlighted control
        let numOfClasses
        let numOfClasses1
        cy.get('.list__body').eq(1).find('.list__body-elem__default') //lists all visible row cells
            .first().invoke('attr', 'class').then((classes) => {
                numOfClasses = classes.split(' ').length
            })
        
        //Checks num of classes for unhighlighted control
        cy.get('.list__body').eq(1).find('.list__body-elem__default') //lists all visible row cells
            .eq(8).invoke('attr', 'class').then((classes) => {
                numOfClasses1 = classes.split(' ').length
                expect(numOfClasses1).to.be.greaterThan(numOfClasses)
            })

        //Potential Benefit
        cy.get('.list__header__row').eq(1).children().last().click()
        cy.wait(250)
        cy.contains('Load Potential Benefit').should('exist').click()
        cy.get('.overflow-y-auto > .flex').click()
        
        cy.wait(250)
        cy.get(':nth-child(1) > :nth-child(8) > .pl-3', {timeout:8000}).should('contain', '635')
        
        cy.get('.primary-btn').click()
        cy.get('.Vue-Toastification__toast-body', {timeout:8000}).should('exist')
        cy.go(-1)
        cy.wait(1000)

        cy.get('.list__body').eq(1).children().first() //first mapped control
            .children().eq(1).should('contain', 'NIPS')
        //ADD ADDITIONAL Checks
    })
})

const riskAttrs = ["peto", "test description", "test treatment strat", "test detail", "test acceptance"]

describe.skip('possible to create risk register report; risk fields fill', () => {
    it('opens risk register & adds risk details into the last asset', () => {
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'tomas_workflow_tests', 'Management', 'Risk Management', 'Risk Report')
        cy.get('.list__body-elem').last().click()
        cy.wait(750)

        //Filling the fields
        cy.get('.p-dropdown-label').click();
        cy.get('.p-dropdown-item-label').eq(2).click();
        cy.get(':nth-child(2) > .p-inputtextarea').type('{selectAll}{del}test description')
        cy.get(':nth-child(3) > .p-inputtextarea').type('{selectAll}{del}test treatment strat');
        cy.get(':nth-child(4) > .p-inputtextarea').type('{selectAll}{del}test detail');
        cy.get(':nth-child(5) > .p-inputtextarea').type('{selectAll}{del}test acceptance');
        cy.get('.p-button-label').last().click();
        cy.wait(750)
        cy.get('.Vue-Toastification__toast-body', {timeout:8000}).should('exist')
        cy.wait(750)
        cy.get('.icon-btn').first().click()
        cy.reload()
        cy.wait(750)
        //PROBLEM BELOW
        //cy.get('.sticky').click()
        cy.wait(750)
        cy.contains('Generate Report').click()

        //cy.contains('Shrink Text to Fit').click({force:true})
        //cy.wait(750)
        cy.wait(750)
    })

    it('opens report manager and views the newly made report', () => {
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'tomas_workflow_tests', 'Dashboard', 'Risk Management', 'Asset Browser')
        cy.get('[data-cy="menu_reports"] > .flex').click()
        cy.wait(750)
        cy.get('.list__body-elem').first().click({force:true})
        cy.wait(750)
        cy.contains('Report Browser').click()
        cy.wait(1000)
        cy.get('.transition', {timeout:6000}).should('not.exist')
        cy.get('.flex-wrap > :nth-child(3) > .flex').should('contain', 'Risk')

        cy.get('.list__body-elem').last().click({force:true})
        cy.wait(250)

        for (let i = 0; i < 4; i++) {
            cy.get(`:nth-child(${i+16}) > .overflow-auto`).should('contain', 'test')
        }

        //CONTROL APPLICABLE FILTER CHECK
        cy.intercept( 'GET' ,'/api/t/*/asset/*/control/applicable', (req) => {
            req.continue()
        }).as('applicableFilter')

        cy.get('.list__body').last().children()
            .its('length').then((length) => {
                cy.get('[data-cy="menu_management"] > .flex').click()
                cy.wait(250)
                cy.contains('Asset Browser').click({force:true})
                cy.get('.transition').should('exist')
                //cy.get('.wrapper__header > .mr-1').click()
                cy.get('.transition', {timeout:8000}).should('not.exist')
                cy.get('.wrapper__header >', {timeout:8000}).should('have.length', 4)

                cy.get('.list__body-elem').last().click({force:true})
                cy.wait(250)
                cy.get(':nth-child(2) > .wrapper__header >').last().click()
                cy.wait(1000)
                cy.get('.flex-col > .mt-4', {timeout:18000}).should('not.exist')

                //applicable request -> to intercept
                cy.wait('@applicableFilter')
                cy.wait(250)
                cy.get('.p-checkbox-input').click()

                //ROZOBRAT
                //SELECT EACH listbodelem
                //now each first child of each listbodelem
                //assert each child against the filter
                // the onest that remains match
            })
    })
})

describe.skip('Risk Register v Risk Report comparison; Browser/Viewer', () => {
    it('Checks if Risk Report Browser has correct risk assessment data', () => {
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'tomas_workflow_tests', 'Reports')
        cy.wait(250)
        cy.get('.wrapper__header >', {timeout:6000}).should('have.length', 3)
        cy.get('.list__body > :nth-child(1) > :nth-child(5) >').click({force:true}) //Open Risk Report -- latest report
        cy.url().then((browserUrl) => {
            expect(browserUrl).to.contain('risk-register')
            expect(browserUrl).to.contain('report_version')
        })
        cy.get('.wrapper__header >', {timeout:6000}).should('have.length', 4)
        cy.get('.list__body > :last').click()

        cy.get(':nth-child(16) > .overflow-auto').should('contain', 'test description')
        cy.get(':nth-child(17) > .overflow-auto').should('contain', 'test treatment strat')
        cy.get(':nth-child(18) > .overflow-auto').should('contain', 'test detail')
        cy.get(':nth-child(19) > .overflow-auto').should('contain', 'test acceptance')

    })
    it('Checks if Risk Report Viewer has correct risk assessment data', () => {
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'tomas_workflow_tests', 'Reports')
        cy.wait(250)
        cy.get('.wrapper__header >', {timeout:6000}).should('have.length', 3)
        cy.get('.list__body > :nth-child(1) > :nth-child(6) >').click({force:true})
        cy.url().then((browserUrl) => {
            expect(browserUrl).to.contain('report-viewer')
            expect(browserUrl).to.contain('risk_report')
        })
        cy.get('.p-progress-spinner').should('exist')
        cy.get('.p-progress-spinner').should('not.exist')

        //15 - 19 th children
        cy.get('.overflow-auto.size-full > > tbody > :last') // selects last item inside the report viewer
            .children().eq(15).invoke('text').then((text) => { //Risk Description
                expect(text).to.contain('test description')
            })
        
        cy.get('.overflow-auto.size-full > > tbody > :last') // selects last item inside the report viewer
            .children().eq(16).invoke('text').then((text) => { //Risk Treatment Strategy
                expect(text).to.contain('test treatment strat')
            })
        
        cy.get('.overflow-auto.size-full > > tbody > :last') // selects last item inside the report viewer
            .children().eq(17).invoke('text').then((text) => { //Risk Detail
                expect(text).to.contain('test detail')
            })
        
        cy.get('.overflow-auto.size-full > > tbody > :last') // selects last item inside the report viewer
            .children().eq(18).invoke('text').then((text) => { //Risk Acceptance
                expect(text).to.contain('test acceptance')
            })
    })
    it('Updates Risk Assessment Data', () => {
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'tomas_workflow_tests', 'Management', 'Risk Management', 'Risk Report')
        cy.wait(250)
        cy.get('.wrapper__header >', {timeout:6000}).should('have.length', 4)

        cy.get('.list__body-elem').last().click()
        cy.wait(750)

        cy.get(':nth-child(2) > .p-inputtextarea').type('{selectAll}{del}newer description')
        cy.get(':nth-child(3) > .p-inputtextarea').type('{selectAll}{del}newer treatment strat');
        cy.get(':nth-child(4) > .p-inputtextarea').type('{selectAll}{del}newer detail');
        cy.get(':nth-child(5) > .p-inputtextarea').type('{selectAll}{del}newer acceptance');
        cy.get('.p-button-label').last().click();
        cy.wait(750)
        cy.get('.Vue-Toastification__toast-body', {timeout:8000}).should('exist')
        cy.wait(750)

    })

    it('Checks if Report Browser is showing historic data', () => {
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'tomas_workflow_tests', 'Reports')
        cy.wait(250)
        cy.get('.wrapper__header >', {timeout:6000}).should('have.length', 3)
        cy.get('.list__body > :nth-child(1) > :nth-child(5) >').click({force:true}) //Open Risk Report -- latest report
        cy.url().then((browserUrl) => {
            expect(browserUrl).to.contain('risk-register')
            expect(browserUrl).to.contain('report_version')
        })
        cy.get('.wrapper__header >', {timeout:6000}).should('have.length', 4)
        cy.get('.list__body > :last').click()

        for (let i = 16; i < 20; i++) {
            cy.get(`:nth-child(${i}) > .overflow-auto`).should('not.contain', 'newer')
            cy.get(`:nth-child(${i}) > .overflow-auto`).should('contain', 'test')
        }
    })

    it('Checks if Report Viewer is showing historic data', () => {
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'tomas_workflow_tests', 'Reports')
        cy.wait(250)
        cy.get('.wrapper__header >', {timeout:6000}).should('have.length', 3)
        cy.get('.list__body > :nth-child(1) > :nth-child(6) >').click({force:true})
        cy.url().then((browserUrl) => {
            expect(browserUrl).to.contain('report-viewer')
            expect(browserUrl).to.contain('risk_report')
        })
        cy.get('.p-progress-spinner').should('exist')
        cy.get('.p-progress-spinner').should('not.exist')

        for (let i = 15; i < 19; i++) {
            cy.get('.overflow-auto.size-full > > tbody > :last') // selects last item inside the report viewer
            .children().eq(i).invoke('text').then((text) => { //Historic data check
                expect(text).to.contain('test')
                expect(text).not.to.contain('newer')
            })
        }
    })

})

describe.skip('Cleanup', () => {
    it('Cleans up asset from risk assessment', () => {
        cy.setupUser(Cypress.env('PRE_USER'), Cypress.env('PRE_PASS'), 'tomas_workflow_tests', 'Management', 'Risk Management', 'Asset Browser')
        cy.wait(250)
        cy.get('.transition', {timeout:8000}).should('not.exist')
        cy.deleteDataEntry('test-add-asset')
    })
})

//TODO
//add check of report versions in time -- DONE
//add check of report browser VS report viewer -- DONE
//add check of download report