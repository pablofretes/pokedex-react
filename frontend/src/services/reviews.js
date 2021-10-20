/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';
const baseUrl = '/reviews';

let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const request = await axios.get(baseUrl);
  return request.data;
};

const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const deleteReview = async (id) => {
  const config = {
    headers: { Authorization: token }
  };

  await axios.delete(`${baseUrl}/${id}`, config);
};

const editReview = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject);
  return response.data;
};

export default { getAll, create, setToken, deleteReview, editReview };