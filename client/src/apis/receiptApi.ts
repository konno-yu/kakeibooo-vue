import axios, { AxiosResponse } from 'axios';
import { GetReceipt } from '@/types/receiptType';
import { request } from 'http';
import { Receipt } from '@/store/expenses';

const baseUrl = 'http://localhost:3000/receipts/';

export const getAll = async () => {
    return await axios.get<GetReceipt>(baseUrl);
};

export const getByMonth = async (month: number) => {
    return await axios.get<GetReceipt[]>(baseUrl + month);
}

export const post = async (requestBody: Receipt) => {
    return await axios.post(baseUrl, requestBody);
};

export const postAll = async (requestBody: Receipt[]) => {
    return await axios.post(baseUrl + "all", requestBody);
}

export const update = async (requestBody: {}) => {
    return await axios.put(baseUrl, requestBody)
};

export const deleteById = async (id: number) => {
    return await axios.delete(baseUrl + id);
};