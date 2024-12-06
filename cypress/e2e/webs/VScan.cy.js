describe.skip('Testing vscan.tech', () => {
    const exampleMail = {
      "Name": "BCR testers",
      "Your Name": "BCR testers",
      "Email": "testing@testing.com",
      "Company": "Binary Confidence",
      "Company Name": "Binary Confidence",
      "Number of IP Addresses": '12345',
      "Phone": "54321",
      "Message": "Hello there BC :]"
    }


    it('Testing the web site', () => {
      cy.on('uncaught:exception', (err, runnable) => {
        if (err.message.includes('wp is not defined')) {
          return false
        }
      })
  
      cy.visit('https://www.vscan.tech/') // Open Vscan web site
  
      cy.get('.N24JKK', {timeout:8000}).click() // Decline cookies

      cy.url().should('eq', 'https://www.vscan.tech/') // Check the url

      cy.get('#comp-kui6cpvs > [data-testid="linkElement"] > .StylableButton2545352419__container > [data-testid="stylablebutton-label"]').click() // Click the Product button
      cy.wait(1000)
      cy.get('#comp-kui6cgc5 > [data-testid="linkElement"] > .StylableButton2545352419__container > [data-testid="stylablebutton-label"]').click({ force:true }) // Click the About button
      cy.wait(1000)
      cy.get('#comp-kui6bguo > [data-testid="linkElement"] > .StylableButton2545352419__container > [data-testid="stylablebutton-label"]').click() // Click the Quote button
      cy.wait(1000)
      cy.get('#comp-kui5noee > [data-testid="linkElement"] > .StylableButton2545352419__container > [data-testid="stylablebutton-label"]').click() // Click the Distributors button
      cy.wait(1000)
      cy.get('#comp-kvqxg75w > [data-testid="linkElement"] > .StylableButton2545352419__container > [data-testid="stylablebutton-label"]').click() // Click the Live Demo button
      cy.wait(1000)

      cy.get('#comp-kta9vkvu > [data-testid="linkElement"] > .l7_2fn').should('contain', 'info@vscan.tech') // Check the email adress
      cy.wait(500)

      cy.get('#comp-kuxv9yuw > [data-testid="linkElement"] > .l7_2fn').click()
      cy.url().should('eq', 'https://www.vscan.tech/privacy-policy')
      cy.wait(1000)
      cy.get('#img_comp-kupcto6s > img').click()
      cy.wait(500)


      // Check texts
      cy.get('[style="color:#FFFFFF;"] > .wixui-rich-text__text').should('contain', 'Contact Sales')
      cy.get('#comp-ku2pqrsw > .font_0 > [style="letter-spacing:normal;"] > [style="font-size:40px;"] > [style="color:#000000;"] > [style="font-weight:normal;"] > .wixui-rich-text__text').should('contain', 'international distributors')
      cy.get('#comp-ku2pc5hu > .font_0 > [style="letter-spacing:normal;"] > [style="font-size:40px;"] > [style="color:#000000;"] > [style="font-weight:normal;"] > .wixui-rich-text__text').should('contain', 'your current software')
      cy.get('[style="font-size:37px;"] > span.wixui-rich-text__text').should('contain', 'Reveal vulnerabiliti')
    })
    it.skip('email check', () => {
      cy.on('uncaught:exception', (err, runnable) => {
        if (err.message.includes('wp is not defined')) {
          return false
        }
      })
  
      //Sends emails via both forms
      cy.visit('https://www.vscan.tech/') // Open Vscan web site

      cy.get('.N24JKK').click() // Decline cookies

      cy.get('[id^=input_comp]').as('inputBox')
      
      //Contact Sales form
      for (let i = 0; i < 4; i++) {
        cy.get('@inputBox').eq(i) //Gets the inputBox
        //smol -> textarea in 2nd mail is id^=textarea
          .invoke('attr', 'placeholder')
          .then((placeholder) => {
            cy.log(placeholder)
            cy.get('@inputBox').eq(i).type(exampleMail[placeholder])
          })
      }
      cy.wait(500)
      //cy.get('[data-testid=buttonElement]').first().click()
      cy.get('form').first().submit()

      cy.wait(250)

      //Become Distributor form
      for (let i = 5; i<9; i++) {
        cy.get('@inputBox').eq(i) //Gets the inputBox
          .invoke('attr', 'placeholder')
          .then((placeholder) => {
            cy.log(placeholder)
            cy.get('@inputBox').eq(i).type(exampleMail[placeholder])
          })
      } 
      cy.get('[id^=textarea]').type(exampleMail["Message"])
      //cy.get('[data-testid=buttonElement]').last().click()
      cy.get('form').last().submit()
      cy.wait(2500)
    })
})

/*describe('v2.0', () => {
  it('opens vscan', () => {
    cy.visit('vscan.tech')
  })
})*/