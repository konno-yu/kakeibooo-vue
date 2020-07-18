import axios from 'axios';

const baseUrl = 'http://localhost:3000/foodstaffs/';

export const getAll = async () => {
    return await axios.get(baseUrl);
};

export const getById = async () => {

};

export const post = async (requestBody: {}) => {
    return await axios.post(baseUrl, requestBody);
};

export const updateById = async (id: number, requestBody: {}) => {
    return await axios.put(baseUrl + id, requestBody)
};

export const deleteById = async (id: number) => {
    return await axios.delete(baseUrl + id);
};