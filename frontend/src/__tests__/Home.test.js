import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import Home from '../components/Home';
import { Router } from 'react-router';
import { createMemoryHistory } from "history";

describe('Home', () => {
    
    const history = createMemoryHistory();
    const component = render(
        <Router history={history}>
            <Home />
        </Router>
    );

    it('pikachu button and pokedex logo are defined', () => {
        const pikachuButton = component.getByTestId('pikachu-button');
        const pokedexLogo = component.getByTestId('pokedex-logo');
        expect(pokedexLogo).toBeDefined();
        expect(pikachuButton).toBeDefined();
    })
});