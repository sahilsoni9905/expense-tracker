import axios from 'axios';

const API_URL = 'https://express-server-2.vercel.app';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Shop endpoints
export const getShops = () => api.get('/shops');
export const getShopById = (shopId: string) => api.get(`/shops/${shopId}`);

// Customer endpoints
export const getCustomers = (shopId: string) => api.get(`/shops/${shopId}/customers`);
export const searchCustomers = (shopId: string, query: string) => 
  api.get(`/shops/${shopId}/customers/search?query=${query}`);
export const getCustomerById = (shopId: string, customerId: string) => 
  api.get(`/shops/${shopId}/customers/${customerId}`);
export const createCustomer = (shopId: string, customerData: any) => 
  api.post(`/shops/${shopId}/customers`, customerData);

// Transaction endpoints
export const getTransactions = (shopId: string, customerId: string) => 
  api.get(`/shops/${shopId}/customers/${customerId}/transactions`);
export const createTransaction = (shopId: string, customerId: string, transactionData: any) => 
  api.post(`/shops/${shopId}/customers/${customerId}/transactions`, transactionData);

// Auth endpoints
export const matchPassword = (password: string) => 
  api.post('/password/match', { password });
export const changePassword = (oldPassword: string, newPassword: string) => 
  api.post('/password/change', { oldPassword, newPassword });

export default api;