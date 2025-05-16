import axios from 'axios';

const BASE_URL = 'http://localhost:3000/inventory';

export const getInventory = () => axios.get(BASE_URL);
export const createInventory = (item) => axios.post(BASE_URL, item);
export const updateInventory = (id, item) => axios.put(`${BASE_URL}/${id}`, item);
export const deleteInventory = (id) => axios.delete(`${BASE_URL}/${id}`);
