/* eslint-disable no-undef */
describe('Search Bar redirects to chosen pokemon', function () {
    beforeEach(function() {
        cy.visit('http://localhost:3000');
    });

    it('typing pikachu or PiKacHu on the search bar redirects to pikachu screen', function (){
        cy.get('[data-cy=searchBar]').type('PiKacHu');
        cy.get('[data-cy=searchBar-button]').click();
        cy.contains('Pikachu');
        cy.contains('ELECTRIC');
        cy.contains('#25');
        cy.contains('Hp: 35');
    });

    it('typing MOLTRES will link to moltres screen', function (){
        cy.get('[data-cy=searchBar]').type('MOLTRES');
        cy.get('[data-cy=searchBar-button]').click();
        cy.contains('Moltres');
        cy.contains('FIRE');
        cy.contains('FLYING');
        cy.contains('#146');
        cy.contains('Hp: 90');
    });
});