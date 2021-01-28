class intersectPage {
    map() {
        return cy.get('.block-stats-map__map')
    }
    stateList() {
        return cy.get('.block-stats-map__state-dropdown')
    }
}
export default intersectPage