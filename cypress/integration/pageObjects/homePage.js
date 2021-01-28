class homePage {
    logo() {
        return cy.get('.site-header__logo')
    }
    alert() {
        return cy.get('.hellobar__close')
    }
    title() {
        return cy.title()
    }
    intersectLearnMoreBtn() {
        return cy.get('.card-home-banner').eq(1).get('.card-home-banner__button').eq(1)
    }
}
export default homePage