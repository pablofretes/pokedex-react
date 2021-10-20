/* eslint-disable no-undef */
describe('Pagination', function (){

    before(function (){
        cy.visit('http://localhost:3000');
    });

    it('Next button leads to next page, and Previous to the Previous page', function (){
        cy.get('[data-cy=pokedex-button]').click();
        cy.get('[data-cy=next-button]').click();
        cy.contains('Spearow');
        cy.get('[data-cy=previous-button]').click();
        cy.contains('Bulbasaur');  
    })

    it('Pagination buttons load a different set of 20 pokemons', function(){
        cy.get('[data-cy=pokedex-button]').click();
        cy.get('[data-cy=pagination-button-2]').click();
        cy.should('not.have.value', 'Bulbasaur');
        cy.should('not.have.value', 'Charmander');
        cy.should('not.have.value', 'Squirtle');
        cy.contains('Spearow');
    });
})