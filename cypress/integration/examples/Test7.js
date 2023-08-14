/// <reference types="Cypress"/>

describe("My Seventh Test", function(){
    it('My Seventh Test case', function(){

        cy.visit(Cypress.env('url')+'/AutomationPractice/')
        
        cy.get('#opentab').then(function(el){
            const url = el.prop('href')
            cy.log(url)
            cy.visit(url)
        })
       
    })

})