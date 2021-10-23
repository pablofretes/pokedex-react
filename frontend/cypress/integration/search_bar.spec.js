/* eslint-disable no-undef */
describe('Search Bar redirects to chosen pokemon', function () {
    before(function () {
        cy.intercept('GET', 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0', { fixture: 'pokemons1-20/pokemons1-20.json' }).as('getPokemonsList');
        cy.intercept('GET', 'https://pokeapi.co/api/v2/pokemon/1/', { fixture: 'pokemons1-20/bulbasaur.json' }).as('getBulbasaur');
        cy.intercept('GET', 'https://pokeapi.co/api/v2/pokemon/2/', { fixture: 'pokemons1-20/ivysaur.json' }).as('getIvysaur');
        cy.intercept('GET', 'https://pokeapi.co/api/v2/pokemon/3/', { fixture: 'pokemons1-20/venusaur.json' }).as('getVenusaur');
        cy.intercept('GET', 'https://pokeapi.co/api/v2/pokemon/4/', { fixture: 'pokemons1-20/charmander.json' }).as('getCharmander');
        cy.intercept('GET', 'https://pokeapi.co/api/v2/pokemon/5/', { fixture: 'pokemons1-20/charmeleon.json' }).as('getCharmeleon');
        cy.intercept('GET', 'https://pokeapi.co/api/v2/pokemon/6/', { fixture: 'pokemons1-20/charizard.json' }).as('getCharizard');
        cy.intercept('GET', 'https://pokeapi.co/api/v2/pokemon/7/', { fixture: 'pokemons1-20/squirtle.json' }).as('getSquirtle');
        cy.intercept('GET', 'https://pokeapi.co/api/v2/pokemon/8/', { fixture: 'pokemons1-20/wartortle.json' }).as('getWartortle');
        cy.intercept('GET', 'https://pokeapi.co/api/v2/pokemon/9/', { fixture: 'pokemons1-20/blastoise.json' }).as('getBlastoise');
        cy.intercept('GET', 'https://pokeapi.co/api/v2/pokemon/10/', { fixture: 'pokemons1-20/caterpie.json' }).as('getCaterpie');
        cy.intercept('GET', 'https://pokeapi.co/api/v2/pokemon/11/', { fixture: 'pokemons1-20/metapod.json' }).as('getMetapod');
        cy.intercept('GET', 'https://pokeapi.co/api/v2/pokemon/12/', { fixture: 'pokemons1-20/butterfree.json' }).as('getButterfree');
        cy.intercept('GET', 'https://pokeapi.co/api/v2/pokemon/13/', { fixture: 'pokemons1-20/weedle.json' }).as('getWeedle');
        cy.intercept('GET', 'https://pokeapi.co/api/v2/pokemon/14/', { fixture: 'pokemons1-20/kakuna.json' }).as('getKakuna');
        cy.intercept('GET', 'https://pokeapi.co/api/v2/pokemon/15/', { fixture: 'pokemons1-20/beedrill.json' }).as('getBeedrill');
        cy.intercept('GET', 'https://pokeapi.co/api/v2/pokemon/16/', { fixture: 'pokemons1-20/pidgey.json' }).as('getPidgey');
        cy.intercept('GET', 'https://pokeapi.co/api/v2/pokemon/17/', { fixture: 'pokemons1-20/pidgeotto.json' }).as('getPidgeotto');
        cy.intercept('GET', 'https://pokeapi.co/api/v2/pokemon/18/', { fixture: 'pokemons1-20/pidgeot.json' }).as('getPidgeot');
        cy.intercept('GET', 'https://pokeapi.co/api/v2/pokemon/19/', { fixture: 'pokemons1-20/rattata.json' }).as('getRattata');
        cy.intercept('GET', 'https://pokeapi.co/api/v2/pokemon/20/', { fixture: 'pokemons1-20/raticate.json' }).as('getRaticate');
        cy.intercept('GET', 'https://pokeapi.co/api/v2/pokemon/25/', { fixture: 'pokemons20-40/pikachu.json' }).as('getPikachu');
        cy.intercept('GET', 'https://pokeapi.co/api/v2/pokemon/146/', { fixture: 'moltres.json' }).as('getMoltres');
    });

    beforeEach(function() {
        cy.visit('http://localhost:3000');
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