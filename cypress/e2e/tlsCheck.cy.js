describe('check for website certificates', { testIsolation: false }, () => {
    
    it('QualyS ssl labs report', () => {
        cy.visit('https://www.ssllabs.com/ssltest/')

        let securea = 'https://securea-preprod.germanywestcentral.cloudapp.azure.com/';
        cy.contains('Hostname').parent().as('submitForm')   //gets the whole submit 
        
        cy.get('@submitForm').children().eq(1).type(securea)    //gets the input field
        //cy.wait(10000)
        cy.get('#hideResults').click()

        cy.get('@submitForm').children().last().click()

        //cy.contains('Clear cache').click()
        cy.get('.reportSection', {timeout: 60000}).should('have.length', 3)
        /*check-site: ssllabs.com*/

        //cy.wait(12000)
    })
    
    it('cert fingerprint', () => {
        // 792975717d748834d964da0b935d6375a7fd27f96a709f304201f93455920855
        cy.get('.reportTable').first().find('tbody').as('rsaCert') //info bout RSA certificate
            .find('.tableRow').first().find('.tableCell').find('span').invoke('text').then((text) => {
                text = text.substring(38, 102);
                
                cy.addContext(text);
            })
    })

    it('valid until', () => {
        cy.get('.reportTable').first().find('tbody').as('rsaCert') //gets info bout RSA certificate (first table in ssl test)
            .children().eq(5).children('.tableCell').invoke('text').then((text) => {
                let months = {'Jan': '01', 'Feb': '02', 'Mar': '03', 'Apr': '04', 'May': '05', 'Jun': '06', 
                'Jul': '07', 'Aug': '08', 'Sep': '09', 'Oct': '10', 'Nov': '11', 'Dec': '12'};
                let monthsWord = Object.keys(months)
                let textMonth = text.substring(8, 11);//5, 16
                
                for (let i = 0; i < monthsWord.length; i++) {
                    if (textMonth == monthsWord[i]) {
                        cy.log('yes')
                        text = text.replace(textMonth, months[textMonth]);
                        text = text.replace(/\D/g, '');
                        text = text.substring(0, 8)
                    }
                }


                
                //cy.addContext();
                cy.addContext(text);
                //remove text until only the (expires in x years y months z days) remains
                //feed that
            })
    })
    
    it('testTls13', () => {
        cy.get('.reportTable').eq(4).children().last().as('protocols')
        cy.get('@protocols').children().first().as('tls13')
        cy.get('@tls13').children('.tableRight').should('have.text', 'Yes')
    })
    
    it('testTls12', () => {
        cy.get('.reportTable').eq(4).children().last().as('protocols')
        cy.get('@protocols').children().eq(1).as('tls12')
        cy.get('@tls12').children('.tableRight').should('have.text', 'Yes')
    })
    //TODO -> cert fingerprints
    
    //checks if all children of one tls are in green -> one test
    //maybe make a custom command??
    it('cipher suite TLS 1.3', () => {
        cy.get('.sectionBody').last().find('.reportTable').eq(1)
            .children().eq(2).as('tls13Suite') //selects table with tls 1.3 suites

        cy.get('@tls13Suite').children().as('tls13Suites').then((tls13Suites) => {
            for (let i = 0; i < tls13Suites.length; i++) {
                cy.get('@tls13Suites').eq(i).find('.tableLeft').children().first().should('have.class', 'color-green')
            }
        })
    })

    it('cipher suite TLS 1.2', () => {
        cy.get('.sectionBody').last().find('.reportTable').eq(1)
            .children().eq(4).as('tls12Suite') //selects table with tls 1.3 suites

        cy.get('@tls12Suite').children().as('tls12Suites').then((tls12Suites) => {
            for (let i = 0; i < tls12Suites.length; i++) {
                cy.get('@tls12Suites').eq(i).find('.tableLeft').children().first().should('have.class', 'color-green')
            }
        })
    })
})