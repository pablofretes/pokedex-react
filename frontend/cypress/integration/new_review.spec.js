describe('new review works', function (){
    const username = 'testing1234';
    const password = 'secret1234';
    const name = 'test1234';
    
    before(function (){
        cy.request('POST', 'http://localhost:3001/testing/reset')
        cy.intercept('GET', 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0', { fixture: 'pokemons1-20/pokemons1-20.json' }).as('getPokemonsList');
        cy.intercept('GET', 'https://pokeapi.co/api/v2/pokemon/1/', { fixture: 'pokemons1-20/bulbasaur.json' }).as('getBulbasaur');
    });

    beforeEach(function (){
        cy.visit('http://localhost:3000');
        cy.waitForReact();
    });

    it('new review', function (){
        cy.get('[data-cy=signUp-button]').click();
        cy.react('TextField', { props: { field: { name: 'username' } } }).type(username);
        cy.react('TextField', { props: { field: { name: 'password' } } }).type(password);
        cy.react('TextField', { props: { field: { name: 'passwordConfirmation' } } }).type(password);
        cy.react('TextField', { props: { field: { name: 'name' } } }).type(name);
        cy.get('[data-cy=button-signUp]').click();
        cy.contains(`Welcome ${username}`);
        cy.get('[data-cy=searchBar]').type('bulbasaur');
        cy.get('[data-cy=searchBar-button]').click();
        cy.contains('Attack');
        cy.contains('Defense');
        cy.contains('#1');
        cy.get('[data-cy=review-button-bulbasaur]').click();
        cy.get('[data-cy=new-review-input]').type('this little cabbage dino is cute!');
        cy.get('[data-cy=review-form-button]').click();
        cy.get('[data-cy=delete-review-button]');
        cy.contains('This little cabbage dino is cute!');
    });
})