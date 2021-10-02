import axios from 'axios';

let token = null;

const setToken = newToken => {
    token = `bearer ${newToken}`;
};

const login = async credentials => {
    const response = await axios.post('/login', credentials);
    return response.data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { login, setToken };