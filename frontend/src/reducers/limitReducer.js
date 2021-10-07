const limitReducer = (state = 20, action) => {
    switch (action.type) {
        case 'LIMIT':
            if(action.data === 18){
                return action.data
            };
            return 20;
        default:
            return state;
    };
};

export const setLimit = value => {
    const limit = Number(value);
    return {
        type: 'LIMIT',
        data: limit,
    };
}

export default limitReducer;