import axios from 'axios';

const login = async credentials => {
    const response = await axios.post('/login', credentials);
    return response.data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { login };