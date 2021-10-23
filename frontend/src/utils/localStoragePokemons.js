const manyPokemonsKey = (limit,  offset) => {
    return `pokemon-offset:${offset}-limit:${limit}`;
};

export const loadPokemonsFromLS = (limit = 20, offset = 0) => {
    const pokemons = JSON.parse(localStorage.getItem(manyPokemonsKey(limit, offset)));
    if(pokemons === null) throw new Error(`Pokemons with offset: ${offset} and limit: ${limit} not found`);

    return pokemons;
};

export const savePokemonsList = (limit, offset, pokemons) => {
    if(offset === undefined || limit === undefined || typeof pokemons !== 'object'){
        throw new Error('offset, limit and pokemons are needed to save in localStorage');
    };

    localStorage.setItem(manyPokemonsKey(limit, offset), JSON.stringify(pokemons));
};