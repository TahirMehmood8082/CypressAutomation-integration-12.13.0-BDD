/// <reference types="cypress" />
import Home_Page from '../pageObjects/HomePage'
import Product_Page from '../pageObjects/ProductPage'


describe("My Framework Test", function(){

    before(function(){
        cy.fixture('example').then(function(data){
            this.data = data
        })
    })
it('My framework case',function(){

    const hp_obj = new Home_Page()
    const pp_obj = new Product_Page()

    cy.visit(Cypress.env('url')+'/angularpractice/')

    hp_obj.getEditBox().type(this.data.name)
    hp_obj.getGender().select(this.data.gender)

    hp_obj.getTwoWayDataBinding().should('have.value',this.data.name)
    hp_obj.getEditBox().should('have.attr','minlength','2')

    hp_obj.getEntrepreneaur().should('be.disabled')
    Cypress.config('defaultCommandTimeout',8000)

    //cy.pause()

    hp_obj.getShopTab().click()
    
    this.data.productName.forEach(element => {
        cy.selectProduct(element)

    });

    pp_obj.checkOutButton().click()

    var sum = 0
    cy.get('tr td:nth-child(4) strong').each(($el, index, $list) => {
        const amount = $el.text()
        var res = amount.split(" ")
        res = res[1].trim()
        sum = Number(sum) + Number(res)

    }).then(function(){
        cy.log(sum)
    })

    cy.get('h3 strong').then(function(element){
        const amount = element.text()
        var res = amount.split(" ")
        var total = res[1].trim()
        expect(Number(total)).to.equal(sum)
    })


    cy.contains('Checkout').click()
    cy.get('#country').type('India')
    cy.get('.suggestions > ul > li > a').click()
    cy.get('#checkbox2').click({force: true})
    cy.get('input[type="submit"]').click()
    //cy.get('.alert').should('have.text','\n          ×\n          Success! Thank you! Your order will be delivered in next few weeks :-).\n        ')
    //cy.get('.alert').should('have.text','Success! Thank you! Your order will be delivered in next few weeks :-).')

    cy.get('.alert').then(function(element){
        const actualText = element.text()
        expect(actualText.includes("Success! Thank you! Your order will be delivered in next few weeks :-).")).to.be.true
    })
    

})
})