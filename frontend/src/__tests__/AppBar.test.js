import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import AppBar from '../components/AppBar';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from "history";

describe('<Home />', () => {
    let component
    const history = createMemoryHistory();

    beforeEach(() => {
        component = render(
            <Router history={history}>
                <AppBar/>
            </Router>
        );
    });

    test('renders content', () => {
        expect(component.container).toHaveTextContent('Home');
        expect(component.container).toHaveTextContent('Pokedex');
    });

    test('path name is /', () => {
        expect(history.location.pathname).toBe('/');
    });

    test('pokedex path name is /pokemons', () => {
        const pokedex = component.getByText('Pokedex');
        fireEvent.click(pokedex);
        expect(history.location.pathname).toBe('/pokemons');
    });
})
