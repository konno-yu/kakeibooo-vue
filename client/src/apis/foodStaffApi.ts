import axios from 'axios';

export const getAll = async () => {
    return await axios.get('http://localhost:3000/foodstaffs');
};

export const getById = async () => {

};

export const post = async (requestBody: {}) => {
    return await axios.post('http://localhost:3000/foodstaffs', requestBody);
};

export const updateById = async (id: number, requestBody: {}) => {
    return await axios.put('http://localhost:3000/foodstaffs/' + id, requestBody)
};

export const deleteById = async (id: number) => {
    return await axios.delete('http://localhost:3000/foodstaffs/' + id);
};