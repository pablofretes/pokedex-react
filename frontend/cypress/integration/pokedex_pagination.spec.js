/* eslint-disable no-undef */
describe('Pagination', function (){

    before(function () {
        cy.intercept('GET', 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0', { fixture: 'pokemons1-20/pokemons1-20.json' }).as('getPokemonsList');
        cy.intercept('GET', 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=20', { fixture: 'pokemons20-40/pokemons20-40.json' }).as('getSecondPokemonList');
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
        cy.intercept('GET', 'https://pokeapi.co/api/v2/pokemon/21/', { fixture: 'pokemons20-40/spearow.json' }).as('getSpearow');
        cy.intercept('GET', 'https://pokeapi.co/api/v2/pokemon/22/', { fixture: 'pokemons20-40/fearow.json' }).as('getFearow');
        cy.intercept('GET', 'https://pokeapi.co/api/v2/pokemon/23/', { fixture: 'pokemons20-40/ekans.json' }).as('getEkans');
        cy.intercept('GET', 'https://pokeapi.co/api/v2/pokemon/24/', { fixture: 'pokemons20-40/arbok.json' }).as('getArbok');
        cy.intercept('GET', 'https://pokeapi.co/api/v2/pokemon/25/', { fixture: 'pokemons20-40/pikachu.json' }).as('getPikachu');
        cy.intercept('GET', 'https://pokeapi.co/api/v2/pokemon/26/', { fixture: 'pokemons20-40/raichu.json' }).as('getRaichu');
        cy.intercept('GET', 'https://pokeapi.co/api/v2/pokemon/29/', { fixture: 'pokemons20-40/nidoran-f.json' }).as('getNidoran-f');
        cy.intercept('GET', 'https://pokeapi.co/api/v2/pokemon/30/', { fixture: 'pokemons20-40/nidorina.json' }).as('getNidorina');
        cy.intercept('GET', 'https://pokeapi.co/api/v2/pokemon/31/', { fixture: 'pokemons20-40/nidoqueen.json' }).as('getNidoqueen');
        cy.intercept('GET', 'https://pokeapi.co/api/v2/pokemon/32/', { fixture: 'pokemons20-40/nidoran-m.json' }).as('getNidoran-m');
        cy.intercept('GET', 'https://pokeapi.co/api/v2/pokemon/33/', { fixture: 'pokemons20-40/nidorino.json' }).as('getNidorino');
        cy.intercept('GET', 'https://pokeapi.co/api/v2/pokemon/34/', { fixture: 'pokemons20-40/nidoking.json' }).as('getNidoking');
        cy.intercept('GET', 'https://pokeapi.co/api/v2/pokemon/35/', { fixture: 'pokemons20-40/clefairy.json' }).as('getClefairy');
        cy.intercept('GET', 'https://pokeapi.co/api/v2/pokemon/36/', { fixture: 'pokemons20-40/clefable.json' }).as('getClefable');
        cy.intercept('GET', 'https://pokeapi.co/api/v2/pokemon/37/', { fixture: 'pokemons20-40/vulpix.json' }).as('getVulpix');
        cy.intercept('GET', 'https://pokeapi.co/api/v2/pokemon/38/', { fixture: 'pokemons20-40/ninetales.json' }).as('getNinetales');
        cy.intercept('GET', 'https://pokeapi.co/api/v2/pokemon/39/', { fixture: 'pokemons20-40/jigglypuff.json' }).as('getJigglypuff');
        cy.intercept('GET', 'https://pokeapi.co/api/v2/pokemon/40/', { fixture: 'pokemons20-40/wigglytuff.json' }).as('getWigglytuff');
        cy.intercept('GET', 'https://pokeapi.co/api/v2/pokemon/27/', { fixture: 'pokemons20-40/sandshrew.json' }).as('getSandshrew');
        cy.intercept('GET', 'https://pokeapi.co/api/v2/pokemon/28/', { fixture: 'pokemons20-40/sandslash.json' }).as('getSandslash');
    });

    beforeEach(function () {
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
        cy.contains('#28');
        cy.contains('#21');
        cy.contains('#24');
        cy.contains('#37');
        cy.contains('#33');
        cy.should('not.have.value', '#7');
        cy.should('not.have.value', '#107');
    });
})