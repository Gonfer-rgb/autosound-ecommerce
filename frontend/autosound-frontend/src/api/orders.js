import api from './axios';

export const getOrders = async () => {
  const response = await api.get('/orders/orders/');
  return response.data;
};

export const getOrderDetails = async (orderId) => {
  const response = await api.get(`/orders/orders/${orderId}/`);
  return response.data;
};

export const createOrder = async (orderData) => {
  const response = await api.post('/orders/orders/', orderData);
  return response.data;
};

export default {
  getOrders,
  getOrderDetails,
  createOrder
};