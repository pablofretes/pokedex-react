import getPokemons from '../services/pokemons';
import { loadPokemonsFromLS, savePokemonsList } from '../utils/localStoragePokemons';

const pokemonsReducer = (state = {}, action) => { 
    switch(action.type){
        case 'INIT_POKEMONS':
            return action.data;
        default:
            return state;
    };
};

export const initPokemons = (pokemons) => {
    return { type: 'INIT_POKEMONS', data: pokemons };
};

export const fetchEverything = async (offset, dispatch) => {
    try {
        const pokemons = loadPokemonsFromLS(offset);
        return dispatch(initPokemons(pokemons));
    } catch (error) {
        const pokemonsData = await getPokemons.getPokemons(offset);
        let pokemonsObject = pokemonsData;
        savePokemonsList(offset, pokemonsObject);
        return dispatch(initPokemons(pokemonsData));
    };
};

export default pokemonsReducer;