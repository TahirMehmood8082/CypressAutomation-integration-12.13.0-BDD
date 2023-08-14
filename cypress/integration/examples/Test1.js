/// <reference types="cypress"/>

describe("My First Test", function(){
    it('My First Test case', function(){
        cy.visit(Cypress.env('url')+"/seleniumPractise/#/");
        //cy.visit(Cypress.env('url')+"/AutomationPractice/");
        cy.get('.search-keyword').type('ca')
        cy.wait(2000)

        cy.get('.product:visible').should('have.length',4)
        cy.get('.products').find('.product').should('have.length',4)
        cy.get('.products').find('.product').eq(2).contains('ADD TO CART').click()

        cy.get('.products').as('productLocator')
        cy.get('@productLocator').find('.product').each(($el, index, $list)=>{
            const textVeg = $el.find('h4.product-name').text()
            if (textVeg.includes('Cashews')){
                cy.wrap($el).find('button').click()
            }
        })
        //assert if logo is correctly displayed
        cy.get('.brand').should('have.text','GREENKART')

        cy.get('.brand').then(function(logo){
            cy.log(logo.text())
        })
    })

})