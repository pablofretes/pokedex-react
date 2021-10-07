import signUpService from '../services/signUp';
import { newLogin } from './loginReducer';
import { notificationError } from './notificationReducer';

const userReducer = (state = null, action) => {
    switch(action.type) {
        case 'SET_USER':
            return action.data;
        default:
            return state;
    };
};

export const setUser = (credentials) => {
    return async dispatch => {
        try {
            const user = await signUpService.signUp(credentials);
            dispatch({
                type: 'SET_USER',
                data: user
            });
            const username = user.username;
            const password = user.password;
            const loginCredentials = { username: username, password: password };
            newLogin(loginCredentials);
        } catch (error) {
            dispatch(notificationError('Your account was not created, try again!'));
            return null;
        }
    }
};

export default userReducer;