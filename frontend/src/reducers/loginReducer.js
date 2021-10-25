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
    return null;
  default: return state;
  }
}

export const existingLogin = () => {
  //IF THERE IS ALREADY A USER LOGGED IN LOCALSTORAGE THEN WE JUST PASS THAT OBJECT TO OUR login STORE
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
  return { type: 'LOGOUT' };
};

export const newLogin = (credentials) => {
  return async dispatch => {
    try {
      //WHEN A USER LOGS IN WE STORE HIS CREDENTIALS IN LOCALSTORAGE AND login STORE
      const userLog = await loginService.login(credentials);
      window.localStorage.setItem('loggedUser', JSON.stringify(userLog));
      reviewsService.setToken(userLog.token);
      dispatch({
        type: 'LOG_IN',
        data: userLog
      });
      dispatch(notificationSuccess(`Welcome ${userLog.username}`));
    }
    catch (err) {
      console.error(err);
      dispatch(notificationError('Incorrect Username or Password'));
      window.localStorage.removeItem('loggedUser');
    }
  }
}

export default loginReducer