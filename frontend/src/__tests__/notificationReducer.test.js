import notificationReducer from '../reducers/notificationReducer';
import '@testing-library/jest-dom/extend-expect';

const notificationError = {
    message: 'this is a test message',
    type: 'error'
};

const notificationSuccess = {
    message: 'this is a test message',
    type: 'success'
};

describe('notifications reducer', () => {

    it('should return the initial state', () => {
        expect(notificationReducer(undefined, {})).toEqual(null);
    });

    it('should handle NOTIFICATION_ERROR', () => {
        const action = {
            type: 'NOTIFICATION_ERROR',
            data: {
                message: notificationError.message,
                type: notificationError.type
            }
        };

        expect(notificationReducer({}, action)).toEqual({ message: 'this is a test message', type: 'error' });
    });

    it('should handle NOTIFICATION_SUCCESS', () => {
        const action = {
            type: 'NOTIFICATION_SUCCESS',
            data: {
                message: notificationSuccess.message,
                type: notificationSuccess.type
            }
        };

        expect(notificationReducer({}, action)).toEqual({ message: 'this is a test message', type: 'success' });
    });

    it('should handle NOTIFICATION_DELETE', () => {
        const action = {
            type: 'NOTIFICATION_DELETE',
        };

        expect(notificationReducer({}, action)).toEqual(null);
    });
});