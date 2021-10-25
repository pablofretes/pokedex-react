const manyPokemonsKey = (offset) => {
    return `pokemon-offset:${offset}-limit:20`;
};

export const loadPokemonsFromLS = (offset = 0) => {
    const pokemons = JSON.parse(localStorage.getItem(manyPokemonsKey(offset)));

    if(pokemons === null) {
        throw new Error(`Pokemons with offset: ${offset} not found`);
    };

    return pokemons;
};

export const savePokemonsList = (offset, pokemons) => {
    if(offset === undefined || typeof pokemons !== 'object'){
        throw new Error('offset and pokemons are needed to save in localStorage');
    };

    localStorage.setItem(manyPokemonsKey(offset), JSON.stringify(pokemons));
};