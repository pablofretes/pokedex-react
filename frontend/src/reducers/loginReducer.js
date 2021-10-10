import loginService from '../services/login';
import reviewsService from '../services/reviews';
import { notificationSuccess, notificationError } from './notificationReducer';

const loginReducer = (state = null, action) => {
  switch (action.type) {
  case 'LOG_IN':
    return action.data;
  case 'LOGGED_IN':
    return action.data;
  case 'LOGOUT':
    return null
  default: return state;
  }
}

export const existingLogin = () => {

  const loggedUserJSON = window.localStorage.getItem('loggedUser');
  if(loggedUserJSON){
    const userLog = JSON.parse(loggedUserJSON);
    reviewsService.setToken(userLog.token);
    return {
      type: 'LOGGED_IN',
      data: userLog
    };
  };

  return {
    type: 'LOGOUT'
  };
};

export const logoutUser = () => {
  window.localStorage.removeItem('loggedUser');
  return {
    type: 'LOGOUT'
  };
};

export const newLogin = (credentials) => {
  return async dispatch => {
    try {
      const userLog = await loginService.login(credentials);
      window.localStorage.setItem('loggedUser', JSON.stringify(userLog));
      loginService.setToken(userLog.token);
      reviewsService.setToken(userLog.token);
      dispatch({
        type: 'LOG_IN',
        data: userLog
      });
      dispatch(notificationSuccess(`Welcome ${userLog.username}`));
    }
    catch (err) {
      dispatch(notificationError(err));
      dispatch(notificationError('Incorrect Username or Password'));
      window.localStorage.clear();
    }
  }
}

export default loginReducer