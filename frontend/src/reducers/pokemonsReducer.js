import getPokemons from '../services/pokemons';
import { loadPokemonsFromLS, savePokemonsList } from '../utils/localStoragePokemons';

const pokemonsReducer = (state = [], action) => { 
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

export const fetchEverything = async (limit, offset, dispatch) => {
    try {
        const pokemons = loadPokemonsFromLS(limit, offset);
        console.log(pokemons);
        return dispatch(initPokemons(pokemons));
    } catch (error) {
        const pokemonsData = await getPokemons.getPokemons(limit, offset);
        let pokemonsObject = { pokemons: pokemonsData };
        savePokemonsList(limit, offset, pokemonsObject);
        return dispatch(initPokemons(pokemonsData.results));
    };
};

export default pokemonsReducer;