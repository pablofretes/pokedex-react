const individualPokemonReducer = (state = {}, action) => {
    switch(action.type) {
        case 'GET_POKEMON':
            console.log(action);
            return action.data;
        default:
            return state;
    };
};

export const getOnePokemon = (pokemon) => {
    return {
        type: 'GET_POKEMON',
        data: pokemon
    };
};

export default individualPokemonReducer;