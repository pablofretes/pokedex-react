const offsetReducer = (state = 0, action) => {
    switch (action.type) {
        case 'OFFSET':
            return action.data;
        default:
            return state;
    };
};

export const setOffset = (value) => {
    const offset = Number((value * 20) - 20);
    return {
        type: 'OFFSET',
        data: offset,
    };
};

export default offsetReducer;