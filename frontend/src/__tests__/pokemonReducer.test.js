import pokemonsReducer from '../reducers/pokemonsReducer';
import '@testing-library/jest-dom/extend-expect';
import pokemons from './pokemonsFixture.json';

describe('pokemons reducer', () => {

    it('should return the initial state', () => {
        expect(pokemonsReducer(undefined, {})).toEqual({});
    });

    it('should handle INIT_POKEMONS', () => {
        const action = {
            type: 'INIT_POKEMONS',
            data: pokemons,
        };

        expect(pokemonsReducer({}, action)).toEqual(pokemons);
    });
})

