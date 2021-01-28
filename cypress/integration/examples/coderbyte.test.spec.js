/// <reference types="cypress" />

import homePage from '../pageObjects/homePage'
import intersectPage from '../pageObjects/intersectPage'

describe('Coderbyte Test', function () {

    beforeEach(function () {
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
    it.only('click on each state and assert popup text', () => {
        const intersect = new intersectPage()

        cy.visit('/solution/intersect/')
        intersect.map().scrollIntoView({ duration: 2000 })
            .should('be.visible')

        intersect.stateList().children('option').then(option => {
            var actual = [...option].map(o => o.value)
            actual.shift()
            var popupText = [...option].map(o => o.dataset.popupText)
            popupText.shift()

            var iterator = actual.values()

            for (let elements of iterator) {
                var i = 0
                elements = elements.substring(0, 2)
                var tag = '[data-state="'
                elements = tag.concat(elements).concat('"]')
                cy.get(elements)
                    .invoke('trigger', 'mouseover').click({ force: true }).invoke('show')
                cy.wait(1000)
                cy.get('.block-stats-map__popup-content').invoke('text').then((text) => {
                    const Text = text
                    expect(popupText[i]).eq(Text)
                    i = i + 1
                })
            }
        })
    })
})