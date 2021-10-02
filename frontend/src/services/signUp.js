import axios from 'axios';

const signUp = async (credentials) => {
    const response = await axios.post('/signUp', credentials);
    return response.data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { signUp };