import axios from 'axios';

export const getAll = async () => {
    return await axios.get('http://localhost:3000/foodstaffs');
};

export const getById = async () => {

};

export const post = async (requestBody: {}) => {
    return await axios.post('http://localhost:3000/foodstaffs', requestBody);
};

export const updateById = async () => {

};

export const deleteById = async () => {

};