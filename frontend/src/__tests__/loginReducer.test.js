import loginReducer from '../reducers/loginReducer';
import '@testing-library/jest-dom/extend-expect';

const user = {
    username: 'testing123',
    password: 'secret123',
};

const newUser = {
    username: 'testing987',
    password: 'secret987',
};

describe('login reducer', () => {

    it('should return the initial state', () => {
        expect(loginReducer(undefined, {})).toEqual(null);
    });

    it('should handle LOG_IN', () => {
        const action = {
            type: 'LOG_IN',
            data: user,
        };

        expect(loginReducer(null, action)).toEqual(user);
    });

    it('should handle LOGOUT', () => {
        const action = {
            type: 'LOGOUT',
        };

        expect(loginReducer(user, action)).toEqual(null);
    });

    it('should handle LOGGED_IN', () => {
        const action = {
            type: 'LOGGED_IN',
            data: newUser
        };

        expect(loginReducer({}, action)).toEqual(newUser);
    });
});