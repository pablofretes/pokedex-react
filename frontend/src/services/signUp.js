import axios from 'axios';
const baseUrl = '/signUp';

const signUp = async (credentials) => {
    const response = await axios.post(baseUrl, credentials);
    return response.data;
};

const getUsers = async () => {
    const response = await axios.get(baseUrl);
    return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { signUp, getUsers };