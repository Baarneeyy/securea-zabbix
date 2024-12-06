describe.skip('Testing securea.io', () => {
    it('Testing the web site', () => {
      cy.on('uncaught:exception', (err, runnable) => {
        if (err.message.includes('wp is not defined')) {
          return false
        }
      })
  
      cy.visit('https://www.securea.io/') // Open Securea web site
      cy.wait(2000);  
      cy.get('.N24JKK').click() // Decline cookies

      cy.url().should('eq', 'https://www.securea.io/')
      cy.wait(1000)

      cy.get('[style="font-weight:normal;"] > [style="letter-spacing:normal;"] > .color_36').should('contain', 'GRC beyond Excel')
      cy.get('#comp-irqduxb1 > .font_4 > .wixui-rich-text__text').should('contain', 'Dashboard')
      cy.get('#comp-irqduxbr > .font_4 > .wixui-rich-text__text').should('contain', 'Threat Analysis')
      cy.get('#comp-l9bg31r6 > .font_4 > .wixui-rich-text__text').should('contain', 'Compliance')
      cy.get('#comp-lbnqmx7x > .font_4').should('contain', 'Knowledge is Power.')
      cy.get('#comp-l9h3w5i1 > [data-testid="inline-content"] > [data-testid="mesh-container-content"] > [data-testid="richTextElement"] > .font_5').should('contain', 'info@securea.io').click
      cy.wait(1000)

      cy.get('#comp-irqduxg4 > [data-testid="linkElement"]').click()

      cy.get('#comp-irqduxcc > .font_9').click()
      cy.url().should('eq', 'https://www.securea.io/privacy-and-data-protection-policy')
    })
    it.skip('email check', () => {
      cy.on('uncaught:exception', (err, runnable) => {
        if (err.message.includes('wp is not defined')) {
          return false
        }
      })
  
      cy.visit('https://www.securea.io/') // Open Securea web site
      cy.wait(2000);  
      cy.get('.N24JKK').click() // Decline cookies

      cy.get('#input_comp-jxad0a3m').type('Testers from BCR')
      cy.wait(250)
      cy.get('#input_comp-jxad0a4e').type('testing@testing.com')
      cy.wait(250)
      cy.get('#textarea_comp-jxad0a4w').type('Hello there BC :]')
      cy.wait(250)
      cy.get('[data-testid="input"]').click({force:true})
      cy.get('form').submit()
      cy.wait(2500)
    })
  })