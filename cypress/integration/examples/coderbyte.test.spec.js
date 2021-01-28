/// <reference types="cypress" />

import homePage from '../pageObjects/homePage'
import intersectPage from '../pageObjects/intersectPage'

describe('Coderbyte Test', function () {

    beforeEach(function () {
        cy.cleanup()
        cy.fixture('data').then((data) => {
            this.data = data
        })
        cy.viewport(1440, 900)
    })
    it('visit homePage and click on Intersects learn more link', function () {
        const home = new homePage()

        cy.visit('/')
        home.logo().should('be.visible')
        home.alert().click()
        home.title().should('eq', this.data.title)
        home.intersectLearnMoreBtn().click({ force: true })
        cy.url().should('include', '/solution/intersect/')
    })
    it('click on each state and assert popup text', () => {
        const intersect = new intersectPage()

        cy.visit('/solution/intersect/')
        intersect.map().scrollIntoView({ duration: 2000 })
            .should('be.visible')
        cy.statePopup()
    })
})