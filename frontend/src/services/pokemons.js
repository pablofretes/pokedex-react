import axios from 'axios';

const baseUrl = 'https://pokeapi.co/api/v2/';

const getPokemons = async (limit, offset) => {
    const response = await axios.get(`${baseUrl}pokemon?limit=${limit}&offset=${offset}`);
    return response.data;
};

const getPokemonByName = async (name) => {
    const response = await axios.get(`${baseUrl}pokemon/${name}`);
    return response.data
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getPokemons, getPokemonByName };