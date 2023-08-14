///<reference types = "Cypress" />
///<reference types = "Cypress-iframe" />
import 'cypress-iframe'

describe("My Demo Describe Test", function(){
    it('My Demo Test case', function(){
        
        cy.visit(Cypress.env('url')+"/AutomationPractice/")
        cy.frameLoaded("#courses-iframe")

        cy.iframe().find("a[href*='mentorship']").eq(0).click()

        cy.iframe().find("h1[class*='pricing-title']").should('have.length',2)

        


    })
})