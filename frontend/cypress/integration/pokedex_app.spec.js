/* eslint-disable no-undef */
describe('Pokedex app', function (){

    before(function (){
        cy.visit('http://localhost:3000');
    })

    it('front page can be opened', function () {
        cy.get('[data-cy=home-button]');
        cy.get('[data-cy=pokedex-button]');
    });

    it('pokedex links to pokemons grid', function () {
        cy.get('[data-cy=pokedex-button]').click();
        cy.contains('Bulbasaur');
        cy.contains('#1');
        cy.contains('#19');
        cy.should('not.have.value', 'Pikachu');
        cy.should('not.have.value', '#21');
    });
})