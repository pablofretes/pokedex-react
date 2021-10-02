const limitReducer = (state = 20, action) => {
    switch (action.type) {
        case 'LIMIT':
            return action.data;
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