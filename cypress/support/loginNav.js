//This JS file contains commands used for login and overall setup of the Securea user AND also navigation throughout Securea

//Base Setup For Tests -> login; switches to desired tenant; opens desired section -> waits
Cypress.Commands.add('setupUser', (tenantName, pageName='') => {
    cy.login()
    cy.switchTenant(tenantName)
    if (pageName != '') {
        cy.goToPage(pageName)
    }
})


////////////////////////LOGIN//////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
//Finished Functionality for now -> logs in; verifies if login is successful via api call
Cypress.Commands.add('login', () => {
    cy.intercept('GET', '/api/version').as('successLogin'); //-> request | login is successful => version of securea is requested
    
    cy.visit(Cypress.env('url'))
    
    cy.get('[type="username"]').type(Cypress.env('username'))

    cy.get('[type="password"]').type(Cypress.env('password'))

    cy.get('.submit__btn').click()

    cy.wait('@successLogin').then((interception) => {
        //Verify if request was successful
        expect(interception.response.statusCode).to.eq(200);
    });
})

////////////////////////SWITCH TENANT//////////////////////////////////////
/////////////////////////////////////////////////////////////////////////// 
//onDashboard == use true|false for dashboard dropdownSelect/tenantScreenSelect
//BETA DONE -> add differences between dashboard and other screens
//TODO -> dropdown text verify => ater rbac implementation
Cypress.Commands.add('switchTenant', (onDashboard=true, tenantName) => {
    let tenantID; //this will be used later for asserting the url is correct
    
    //Dashboard Dropdown
    if (onDashboard) {
        cy.intercept('GET', '/api/tenant/*').as('tenantLoad'); //-> request | screen is loaded for user
        cy.intercept('GET', '/api/tenant').as('tenantListLoad'); //-> request | screen is loaded for user
        cy.wait('@tenantLoad').then((interception) => {
            //Verify if request was successful
            expect(interception.response.statusCode).to.eq(200);
        });
        cy.get('.flex > .overflow-hidden').click()
        cy.wait('@tenantListLoad').then((interception) => {
            //Verify if request was successful
            expect(interception.response.statusCode).to.eq(200);
        });
        cy.get('.option-item').each(($el) => {
            cy.wrap($el).find('p').invoke('text').then((itemName) => {
                if (itemName.trim() == tenantName) {
                    $el.click()
                }
            })
        })
    
    //Select Tenant Screen
    } else {
        cy.intercept('GET', '/api/user/*').as('getUser'); //-> request | screen is loaded for user
        cy.get('.flex-wrap > :nth-child(1) > .flex > span').should('exist').click() //click on breadcrumb of tenant
        cy.wait('@getUser').then((interception) => {
            //Verify if request was successful
            expect(interception.response.statusCode).to.eq(200);
        });
        //Gets the index of desired tenant -> saves into tenantID
        cy.get('.tenant-selection__content-wrapper__card > p').each(($el, index) => {
            if ($el.text().includes(tenantName)) {
                cy.wrap(null).then(() => {
                    tenantID = index+1;
                })
            }
        })
        //Click on desired tenant
        cy.get('.tenant-selection__content-wrapper').contains(tenantName).click()
        //Assert we'll get thrown onto Dashboard
        cy.url().should('include', '/dashboard')
        //Assert tenantID is set correctly
        cy.url().then((url) => {
            expect(url).to.contain(tenantID)
        })
    }
})

////////////////////////OPEN MANAGEMENT////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
//Opens Any Management/Browser/Reports/...... -> TODO: wait times based on wrapper__header children length
Cypress.Commands.add('openManagement', (sectionName, pageName) => {
    let assertUrl;

    //Prepare strings for finding the correct screen
    let sidebarName = sectionName
    if (sectionName =='Thresholds'|| sectionName =='Configuration') {
        sidebarName = 'Tenant';
    } else if (sectionName.includes('Management') || pageName == 'Business Processes') {
        sidebarName = 'Management'
    }
    //Create selector string for sidebar element
    let string = '[data-cy="menu_' + sidebarName.replace(/\s+/g, '').toLowerCase() + '"]'
    cy.get(string).click();
    
    //Switch Statement for the entirety of Securea -> no explicit times/api based timing
    switch (sectionName) {
    //DONE
        case 'Dashboard':
            cy.get('.dropdown__sub-category-link').click()
            cy.wrap(null).then(() => {
                assertUrl = '/dashboard';
            })
        break;
    //DONE
        case 'Reports':
            cy.intercept('GET', '/api/t/50/report/save').as('pageLoad'); //-> request | screen is loaded for user
            cy.wrap(null).then(() => {
                assertUrl = '/report-manager';
            })
            cy.wait('@pageLoad').then((interception) => {
                //Verify if request was successful
                expect(interception.response.statusCode).to.eq(200);
            });
        break;
    //DONE   
        case 'Account':
            cy.wait('@tenantListLoad').then((interception) => {
                //Verify if request was successful
                expect(interception.response.statusCode).to.eq(200);
            });
            cy.wrap(null).then(() => {
                assertUrl = '/user-settings/user';
            })
        break;
    //DONE    
        case 'Admin Tools':
            const adminPages = {
                'Tenant Management':'/tenant-management', 
                'Users Management':'/user-management', 
                'Export Data': '/distribution/export', 
                'Import Data': '/distribution/import'
            };
            if (Object.keys(adminPages).includes(pageName)) {
                cy.contains(pageName).should('exist').click();
                cy.wrap(null).then(() => {
                    assertUrl = adminPages[pageName]
                    cy.log(assertUrl)
                })
                if (pageName.includes('Management')) {
                    cy.wait('@tenantListLoad').then((interception) => {
                        //Verify if request was successful
                        expect(interception.response.statusCode).to.eq(200);
                    });
                }
            } else {
                return;
            }
        break;
    //DONE
        case 'Security Posture':
            cy.intercept('GET', '/api/t/*/asset?header_only=false&expand=true').as('pageLoad'); //-> request | screen is loaded for user
            cy.contains('Security Requirements Fulfillment').click();
            cy.wait('@pageLoad').then((interception) => {
                //Verify if request was successful
                expect(interception.response.statusCode).to.eq(200);
            });
            cy.wrap(null).then(() => {
                assertUrl = '/requirement-fulfillment';
            })
        break;
    //DONE
        case 'Tenant':
            cy.intercept('GET', '/api/tenant*').as('pageLoad'); //-> request | screen is loaded for user
            const tenantPages = {
                'Select Tenant':'/select-tenant', 
                'User Settings':'/user-settings/user'
            };
            if (Object.keys(tenantPages).includes(pageName)) {
                cy.contains(pageName).click();
                
            }
            cy.wait('@pageLoad').then((interception) => {
                //Verify if request was successful
                expect(interception.response.statusCode).to.eq(200);
                assertUrl = tenantPages[pageName];
            });
        break;
    //DONE
        case 'Configuration':
            cy.intercept('GET', '/api/*/schema').as('pageLoad'); //-> request | screen is loaded for user
            cy.contains('Configuration').click()
            const configPages = {
                'Asset Class Catalogue': '/asset_class-browser',
                'Owner Browser': '/owner-browser',
                'Regulation Catalogue': '/regulation-catalogue',
                'Security Requirements Catalogue': '/requirement-catalogue',
                'Impacts': '/impact-browser'
            }
            if (Object.keys(configPages).includes(pageName)) {
                if(pageName == 'Impacts') {
                    cy.contains('BCM').click();
                }
                cy.contains(pageName).click();
            }
            cy.wait('@pageLoad').then((interception) => {
                //Verify if request was successful
                expect(interception.response.statusCode).to.eq(200);
                assertUrl = configPages[pageName];
            });
        break;
    //DONE
        case 'Thresholds':
            cy.intercept('GET', '/api/t/*/thresholds/category/*').as('pageLoad'); //-> request | screen is loaded for user
            cy.contains('Configuration').click()
            cy.contains('Thresholds').click()
            const thresholdPages = {
                'Risk Thresholds': '/thresholds/risk',
                'Bia Thresholds': '/thresholds/bia'
            }
            if (Object.keys(thresholdPages).includes(pageName)) {
                cy.contains(pageName).click();
            }
            cy.wait('@pageLoad').then((interception) => {
                //Verify if request was successful
                expect(interception.response.statusCode).to.eq(200);
                assertUrl = thresholdPages[pageName];
            });
        break;
    //DONE        
        case 'Risk Management':
            cy.intercept('GET', '/api/*/schema').as('pageLoad'); //-> request | screen is loaded for user
            cy.contains('Risk Management').click()
            const riskPages = {
                'Asset Browser': '/asset-browser',
                'Threat Browser': '/threat-browser',
                'Control Browser': '/control-browser',
                'Risk Register': '/risk-register'
            }
            if (Object.keys(riskPages).includes(pageName)) {
                cy.contains(pageName).click();
            }
            cy.wait('@pageLoad').then((interception) => {
                //Verify if request was successful
                expect(interception.response.statusCode).to.eq(200);
                assertUrl = riskPages[pageName];
            });
        break;
    //DONE
        case 'Compliance Management':
            cy.intercept('GET', '/api/*/schema').as('pageLoad'); //-> request | screen is loaded for user
            cy.contains('Compliance Management').click()
            const compliancePages = {
                'Regulations': '/regulation',
                'Governing Documentation': '/governing_document-browser',
            }
            if (Object.keys(compliancePages).includes(pageName)) {
                cy.contains(pageName).click();
            }
            cy.wait('@pageLoad').then((interception) => {
                //Verify if request was successful
                expect(interception.response.statusCode).to.eq(200);
                assertUrl = compliancePages[pageName];
            });
        break;
    //ODNE
        case 'BCM':
            cy.intercept('GET', '/api/*/schema').as('pageLoad'); //-> request | screen is loaded for user
            cy.contains('BCM').click()
            cy.contains(pageName).click()
            cy.wait('@pageLoad').then((interception) => {
                //Verify if request was successful
                expect(interception.response.statusCode).to.eq(200);
                assertUrl = '/business_process-browser';
            });
        break;

        default:
            console.log('sory')
        break;

    };

    cy.url().then((url) => {
        expect(url).to.contain(assertUrl)
    })
})

////////////////////////FIND LINK//////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
//BETA DONE -> Goes through manually made list to find 
//--which section of sidebar does the inputted link belong to
Cypress.Commands.add('findLink', (pageName) => {
    const menuToScreen = {
        "Tenant" : [
            'Select Tenant', 
            'User Settings'
        ],
        'Configuration': [
            'Asset Class Catalogue',
            'Owner Browser',
            'Regulation Catalogue',
            'Security Requirements Catalogue'
        ],
        'Thresholds': [
            'Risk Thresholds',
            'Bia Thresholds'
        ],
        "Dashboard" : ['Dashboard'],
        "Security Posture": ["Security Requirements Fulfillment"],
        "Risk Management" : [
            'Asset Browser',
            'Threat Browser',
            'Control Browser',
            'Risk Register'
        ],
        'Compliance Management': [
            'Governing Documentation',
            'Regulations'
        ],
        'BCM': ['Business Processes'],
        "Reports": ['Reports'],
        'Admin Tools': [
            'Tenant Management',
            'Users management',
            'Import Data',
            'Export Data'
        ],
        'Account': ['Account']
    }
    let assertUrl;
    let sectionName;
    for (const section in menuToScreen) {
        if (menuToScreen[section].includes(pageName)) {
            cy.wrap(null).then(() => {
                cy.openManagement(section, pageName)
            })
        }
    }

})

////////////////////////GO TO PAGE/////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
//BETA DONE -> Needs only the name of said page to navigate to it -> wait times included with api
Cypress.Commands.add('goToPage', (pageName) => {
    cy.findLink(pageName)
})

