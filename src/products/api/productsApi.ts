import axios from 'axios';

const productsApi = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

export { productsApi };
