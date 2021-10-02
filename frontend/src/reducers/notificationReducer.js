const notificationReducer = (state = null, action) => {
    switch(action.type) {
        case 'NOTIFICATION_ERROR':
            return action.data;
        case 'NOTIFICATION_SUCCESS':
            return action.data;
        case 'NOTIFICATION_DELETE':
            return null;
        default: 
            return state;
    };
};

let timeout;

export const notificationError = (message) => {
    return async dispatch => {
        clearInterval(timeout);
        timeout = setTimeout(() => {
            dispatch({
                type: 'NOTIFICATION_DELETE',
            })
        }, 4000);

        dispatch({
            type: 'NOTIFICATION_ERROR',
            data: {
                message,
                type: 'error'
            },
        });
    };
};

export const notificationSuccess = (message) => {
    return async dispatch => {
        clearInterval(timeout);
        timeout = setTimeout(() => {
            dispatch({
                type: 'NOTIFICATION_DELETE',
            })
        }, 4000);

        dispatch({
            type: 'NOTIFICATION_SUCCESS',
            data: {
                message,
                type: 'success'
            },
        });
    };
};

export default notificationReducer;