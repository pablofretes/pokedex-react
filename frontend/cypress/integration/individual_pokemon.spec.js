/* eslint-disable no-undef */
describe('Pikachu Button', function() {
    it('Clicking a pokemon leads to another page with more specified info', function() {
        cy.visit('http://localhost:3000');
        cy.get('[data-cy=pokedex-pikachu]').click();
        cy.get('[data-cy=pokemon-button-bulbasaur]').click();
        cy.contains('Attack');
        cy.contains('Defense');
        cy.contains('#1')
        cy.should('not.have.value', 'Pikachu');
        cy.should('not.have.value', '#21');
    });
});