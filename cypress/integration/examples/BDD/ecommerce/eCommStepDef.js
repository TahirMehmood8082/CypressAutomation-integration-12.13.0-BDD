/// <reference types="Cypress" />
import Home_Page from '../../../pageObjects/HomePage'
import Product_Page from '../../../pageObjects/ProductPage'
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

const hp_obj = new Home_Page()
const pp_obj = new Product_Page()
let name
Given('I open ECommerce Page', () => {
    cy.visit(Cypress.env('url')+"/angularpractice/")
}) 

When('I add items to Cart',function (){
    hp_obj.getShopTab().click()
    
    this.data.productName.forEach(element => {
        cy.selectProduct(element)

    });

    pp_obj.checkOutButton().click()
})

When ('Validate the total prices', ()=>{
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
})

Then('select the country submit and verify Thankyou', () => {
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
//when I fill the form details
When('I fill the form details', function(dataTable){

    name = dataTable.rawTable[1][0]
    hp_obj.getEditBox().type(dataTable.rawTable[1][0])
    hp_obj.getGender().select(dataTable.rawTable[1][1])
})
//Then validate the forms behaviour
Then('validate the forms behaviour', function(){
    
    hp_obj.getTwoWayDataBinding().should('have.value',name)
    hp_obj.getEditBox().should('have.attr','minlength','2')

    hp_obj.getEntrepreneaur().should('be.disabled')
    Cypress.config('defaultCommandTimeout',8000)
})
//Then select the shop Page
Then('select the Shop Page', ()=>{

    hp_obj.getShopTab().click()
})