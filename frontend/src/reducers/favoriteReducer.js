const favoriteReducer = (state = {}, action) => {
    switch(action.type) {
        case 'FAVORITE':
            return action.data;
        default:
            return state;
    };
};

export const setFavorite = (pokemon) => {
    return {
        type: 'FAVORITE',
        data: pokemon
    };
};

export default favoriteReducer;