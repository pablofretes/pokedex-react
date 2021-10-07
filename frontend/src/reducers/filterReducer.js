const filterReducer = (state = '', action) => {
    switch(action.type) {
        case 'SET_FILTER':
            return action.data;
        default:
            return state;
    };
};

export const setFilter = (word) => {
    return {
        type: 'SET_FILTER',
        data: word
    };
};

export default filterReducer;