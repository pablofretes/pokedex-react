import getPokemons from '../services/pokemons';
import axios from 'axios';
import { loadPokemonsFromLS, savePokemonsList } from '../utils/localStoragePokemons';

const pokemonsReducer = (state = [], action) => {
    switch(action.type){
        case 'INIT_POKEMONS':
            console.log(action);
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
export const initPokemons = (pokemons) => {
    return { type: 'INIT_POKEMONS', data: pokemons };
};

export const fetchEverything = async (limit, offset) => {
    try {
        const pokemons = loadPokemonsFromLS(limit, offset);
        return pokemons;
    } catch (error) {
        const pokemonsData = await getPokemons.getPokemons(limit, offset);
        let pokemons = [];
        let pokemonsObject = {};
        console.log(pokemonsData)
        pokemonsData.results.forEach(async (r, i) => {
            //FETCHES EACH POKEMON URL AND STORES ITS DATA ON pokemons STATE
            const pokemonNow = await axios.get(r.url);
            pokemonsObject[i] = pokemonNow.data;
            //console.log([pokemonNow.data][0]);
            pokemons.push(pokemonNow.data);
        });
        console.log(pokemons);
        console.log(pokemonsObject);
        savePokemonsList(limit, offset, pokemonsObject);
        return pokemons;
    };
};

/*
export const fetchPokemons = (limit, offset) => {
    return async dispatch => {
        try {
            const pokemons = loadPokemonsFromLS(limit, offset);
            dispatch({ type: 'INIT_POKEMONS', data: pokemons });
        } catch (error) {
            const pokemons = await getPokemons.getPokemons(limit, offset);
            let pokemonsArray = [];
            let pokemonsObject = {};
            pokemons.results.forEach(async (r, i) => {
                //FETCHES EACH POKEMON URL AND STORES ITS DATA ON pokemons STATE
                const pokemonNow = await axios.get(r.url);
                pokemonsArray.push(pokemonNow.data);
                pokemonsObject[i] = pokemonNow.data
            });
            savePokemonsList(limit, offset, pokemonsObject);
            dispatch({ type: 'INIT_POKEMONS', data: pokemonsArray });
        };
    };   
};*/

export default pokemonsReducer;