/* eslint-disable no-undef */
describe('sign Up', function (){
    const username = 'testing123';
    const password = 'secret123';
    const name = 'test123';
    
    before(function (){
        cy.request('POST', 'http://localhost:3001/testing/reset')
    });

    beforeEach(function (){
        cy.visit('http://localhost:3000');
        cy.waitForReact();
    });

    it('sign Up throws error if username/password are shorter than 5 characters', function (){
        cy.get('[data-cy=signUp-button]').click();
        cy.react('TextField', { props: { field: { name: 'username' } } }).type('1234');
        cy.react('TextField', { props: { field: { name: 'password' } } }).type('1234');
        cy.react('TextField', { props: { field: { name: 'passwordConfirmation' } } }).type('1234');
        cy.react('TextField', { props: { field: { name: 'name' } } }).type(name);
        cy.contains('Username must contain at least 5 characters');
        cy.contains('Password must contain at least 5 characters');
    });

    it('sign Up works', function (){
        cy.get('[data-cy=signUp-button]').click();
        cy.react('TextField', { props: { field: { name: 'username' } } }).type(username);
        cy.react('TextField', { props: { field: { name: 'password' } } }).type(password);
        cy.react('TextField', { props: { field: { name: 'passwordConfirmation' } } }).type(password);
        cy.react('TextField', { props: { field: { name: 'name' } } }).type(name);
        cy.get('[data-cy=button-signUp]').click();
        cy.contains(`Welcome ${username}`);
    });

    it('login doesnt work with incorrect credentials', function() {
        cy.get('[data-cy=login-button]').click();
        cy.react('TextField', { props: { field: { name: 'username' } } }).type('1234');
        cy.react('TextField', { props: { field: { name: 'password' } } }).type('1234');
        cy.contains('Username must contain at least 5 characters');
    });

    it('logout button works, and login works with correct credentials', function() {
        cy.get('[data-cy=login-button]').click();
        cy.react('TextField', { props: { field: { name: 'username' } } }).type(username);
        cy.react('TextField', { props: { field: { name: 'password' } } }).type(password);
        cy.get('[data-cy=login-form-button]').click();
        cy.wait(2000);
        cy.contains(`Welcome ${username}`);
        cy.get('[data-cy=logout-button]').click();
        cy.get('[data-cy=login-button]').click();
    });
})