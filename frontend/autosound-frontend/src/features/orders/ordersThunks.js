import api from '../../api/orders';

export const fetchOrders = () => async (dispatch) => {
  try {
    const response = await api.getOrders();
    return response;
  } catch (error) {
    throw error;
  }
};

export const createOrder = (orderData) => async (dispatch) => {
  try {
    const response = await api.createOrder(orderData);
    return response;
  } catch (error) {
    throw error;
  }
};

export const fetchOrderDetails = (orderId) => async (dispatch) => {
  try {
    const response = await api.getOrderDetails(orderId);
    return response;
  } catch (error) {
    throw error;
  }
};