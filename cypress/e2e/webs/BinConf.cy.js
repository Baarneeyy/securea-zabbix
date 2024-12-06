describe('Testing binaryconfidence.com', () => {
  const exampleMail = {
    "name": "Testers",
    "lastName": "From Binary Confidence",
    "phoneNumber": "54321",
    "email": "testing@testing.com",
    "message": "Hello there BC :]",
    "company": "BCR"
  }
  it('Testing the web site', () => {
    cy.on('uncaught:exception', (err, runnable) => {
      if (err.message.includes('wp is not defined')) {
        return false
      }
    })

    cy.visit('https://www.binaryconfidence.com/') // Open BinConf web site

    cy.get('.cky-notice-btn-wrapper > .cky-btn-reject').click() // Rejecting cookies

    cy.url().then((url) => {
      if (url.includes('/en/')) {
        cy.wait(250)
        //Change Lang
        cy.get('a[title=Slovak]:has(>img)').first().click({force:true})
        cy.wait(250)
      }
    })

    cy.get('.elementor-element-1b8d8e3').click() // Clicking Pozrite si video button
    cy.wait(5000) // Wait for the video to load and play
    cy.get('body').click(300, 300, { force:true }) // Exit the video by clicking anywhere but the videoplayer itself
    cy.get('.e-con-inner > .elementor-element > .elementor-widget-container > .elementor-button-wrapper > .elementor-button').click() // Clicking under attack button
  
    cy.get('.elementor-element-8e64af7').should('contain', '+421 949 000 950') // Checking the telephone number
    cy.get('.elementor-element-2604e60').should('contain', 'Podozrivý incident?') // Checking texts
    cy.get('.elementor-element-2604e60').should('contain', 'Zavolajte nám alebo nám pošlite žiadosť s podrobnými informáciami o povahe vášho incidentu. Poskytujeme nepretržitú podporu.') // Checking texts
    cy.url().should('eq', 'https://www.binaryconfidence.com/incident/') // Checking the url

    cy.get('.elementor-element-ac39408 > .e-con-inner > .elementor-element > .elementor-widget-container > a > .attachment-large').click() // Going to main page via clicking the header
 
    cy.get('.elementor-element-0b2ab31').click() // Clicking Naše služby button
    cy.get('.elementor-element-d9019fc > .e-con-inner').click({ force:true }) // Clicking SOC as a service
    cy.get('.elementor-element-7c5ecf9').should('contain', 'SOC as a Service') // Checking text
    cy.url().should('eq', 'https://www.binaryconfidence.com/soc-as-a-service/') // Checking the url
    
    cy.get('.elementor-element-ac39408 > .e-con-inner > .elementor-element > .elementor-widget-container > a > .attachment-large').click() // Going to main page via clicking the header

    cy.get('.elementor-element-0b2ab31').click() // Clicking Naše služby button
    cy.get('.elementor-element-37811d8 > .e-con-inner').click({ force:true}) // Clicking Implementácia technológií
    cy.get('.elementor-element-b838d3c').should('contain', 'Implementácia technológií') // Checking text
    cy.url().should('eq', 'https://www.binaryconfidence.com/implementacia-technologii/') // Checking url

    cy.get('.elementor-element-ac39408 > .e-con-inner > .elementor-element > .elementor-widget-container > a > .attachment-large').click() // Going to main page via clicking the header

    cy.get('.elementor-element-f494609 > .e-con-inner').click({ force:true }) // Clicking Audity a poradenstvo
    cy.get('.elementor-element-5f603c0').should('contain', 'Audity a poradenstvo') // Checking text
    cy.url().should('eq', 'https://www.binaryconfidence.com/audity-a-poradenstvo/') // Checking url

    cy.get('.elementor-element-ac39408 > .e-con-inner > .elementor-element > .elementor-widget-container > a > .attachment-large').click() // Going to main page via clicking the header

    cy.get('.elementor-element-251e1e5 > .e-con-inner').click({ force:true }) // Clicking Výskum a vývoj produktov
    cy.get('.elementor-element-293a14c').should('contain', 'Výskum a vývoj produktov') // Checking Text
    cy.url().should('eq', 'https://www.binaryconfidence.com/vyskum-a-vyvoj-produktov/') // Checking url

  })
  it.skip('Email check 1', () => {
    cy.on('uncaught:exception', (err, runnable) => {
      if (err.message.includes('wp is not defined')) {
        return false
      }
    })

    cy.visit('https://www.binaryconfidence.com/kontakt/') // Open BinConf web site
    cy.wait(500)
    cy.get('.cky-notice-btn-wrapper > .cky-btn-reject').click()
    
    cy.get('[id^=form-field]').as('inputBox')

    for (let i = 0; i < 5; i++) {
      cy.get('@inputBox').eq(i)
        .invoke('attr', 'id')
        .then((id) => {
          let idMatch = id.replace('form-field-', '')
          cy.get('@inputBox').eq(i).type(exampleMail[idMatch], {force:true})
        })
    }
    cy.get('input[type=checkbox]').last().check({force:true})

    cy.get('form').submit()
    //Name, Company, Email, Help, Message
    //most prolly znova captcha
  })
  it.skip('Email check 2', () => {
    cy.on('uncaught:exception', (err, runnable) => {
      if (err.message.includes('wp is not defined')) {
        return false
      }
    })

    cy.visit('https://www.binaryconfidence.com/kontakt-predajcu/') // Open BinConf web site
    cy.wait(500)
    cy.get('.cky-notice-btn-wrapper > .cky-btn-reject').click()
    
    cy.get('[id^=form-field]').as('inputBox')

    for (let i = 0; i < 5; i++) {
      if (i==3) {
        cy.get('#form-field-help').select('Iné')
        continue
      }
      cy.get('@inputBox').eq(i)
        .invoke('attr', 'id')
        .then((id) => {
          let idMatch = id.replace('form-field-', '')
          cy.get('@inputBox').eq(i).type(exampleMail[idMatch], {force:true})
        })
    }
    cy.get('input[type=checkbox]').last().check({force:true})

    cy.get('form').submit()
    //Name, Company, Email, Help, Message
    //most prolly znova captcha
  })
})