// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add('cleanup', () => {
    cy.clearCookies();
    cy.clearLocalStorage();
    sessionStorage.clear();
  });

Cypress.Commands.add("statePopup", () => {
    cy.get('.block-stats-map__state-dropdown').children('option').then(option => {
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
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
