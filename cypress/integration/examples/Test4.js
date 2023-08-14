/// <reference types="cypress"/>

describe("My Fourth Test", function(){
    it('My Fourth Test case', function(){
        
        cy.visit(Cypress.env('url')+"/AutomationPractice/")
        cy.get('#alertbtn').click()
        cy.get('[value="Confirm"]').click()
        //window:alert
        cy.on('window:alert',(str)=>{
            //Mocha
            //expect(str).to.equal('Hello , share this practice page and share your knowledge')
        })

         //confirm
        cy.on('window:confirm',(str)=>{
            //Mocha
            //expect(str).to.equal('Hello , Are you sure you want to confirm?')
        })

        cy.get('#opentab').invoke('removeAttr', 'target').click()

        

        cy.url().should('include','qaclickacademy')

        cy.go('back')

    })

})