const individualPokemonReducer = (state = {}, action) => {
    switch(action.type) {
        case 'GET_POKEMON':
            const newState = action.data;
            console.log(action);
            console.log(newState);
            return newState;
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