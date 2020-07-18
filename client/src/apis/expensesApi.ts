import axios from 'axios';

const baseUrl = 'http://localhost:3000/expenses/';

export const getAll = async () => {
    return await axios.get(baseUrl);
};

export const getByMonth = async (month: number) => {
    return await axios.get(baseUrl + month);
};

export const getByDate = async (date: Date) => {
    // DateクラスのgetMonth()は実際よりも-1した値を取得するため手動で+1しておく
    return await axios.get(baseUrl + date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate());
}

export const post = async (requestBody: {}) => {
    return await axios.post(baseUrl, requestBody);
};

export const update = async (id: number, requestBody: {}) => {
    return await axios.put(baseUrl + id, requestBody);
}