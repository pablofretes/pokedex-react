import individualPokemonReducer from '../reducers/individualPokemonReducer';
import '@testing-library/jest-dom/extend-expect';

const pokemon = {
    name: 'bulbasaur',
    id: 1,
    sprites: {
        other: {
            official_artwork: {
                front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"
            },
        },
    },
};


describe('individual pokemon reducer', () => {

    it('should return the initial state', () => {
        expect(individualPokemonReducer(undefined, {})).toEqual({});
    });

    it('should handle GET_POKEMON', () => {
        const action = {
            type: 'GET_POKEMON',
            data: pokemon,
        };

        expect(individualPokemonReducer({}, action)).toEqual(pokemon);
    });
});