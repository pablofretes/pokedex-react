const currentPageReducer = (state = 1, action) => {
    switch(action.type) {
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        case 'SELECTION':
            return action.data;
        default:
            return state;
    };
};

export const pageSelection = (page) => {
    return {
        type: 'SELECTION',
        data: page,
    };
};

export default currentPageReducer;