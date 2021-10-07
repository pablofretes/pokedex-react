import getPokemons from '../services/pokemons';
import axios from 'axios';

const pokemonsReducer = (state = [], action) => {
    console.log('state is:', state)
    switch(action.type){
        case 'INIT_POKEMONS':
            return action.data;
        default:
            return state;
    };
};

export const fetchPokemons = (limit, offset) => {
    return async dispatch => {
        try {
            const pokemons = await getPokemons.getPokemons(limit, offset);
            let urlArray = [];
            pokemons.results.forEach(async (r) => {
                //FETCHES EACH POKEMON URL AND STORES ITS DATA ON pokemons STATE
                const pokemonNow = await axios.get(r.url);
                urlArray.push(pokemonNow.data);
            });
            dispatch({
                type: 'INIT_POKEMONS',
                data: urlArray
            });
        } catch (error) {
            console.log(error);
            return null;
        }
    };
};

export default pokemonsReducer;