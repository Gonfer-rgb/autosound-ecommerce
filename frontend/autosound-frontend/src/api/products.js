import api from './http';

export const getProducts = async (params = {}) => {
  const response = await api.get('/products/products/', { params });
  return response.data;
};

export const getProductBySlug = async (slug) => {
  const response = await api.get(`/products/products/${slug}/`);
  return response.data;
};

export const getCategories = async () => {
  const response = await api.get('/products/categories/');
  return response.data;
};

export const getBrands = async () => {
  const response = await api.get('/products/brands/');
  return response.data;
};

export const createProductReview = async (slug, reviewData) => {
  const response = await api.post(`/products/products/${slug}/reviews/`, reviewData);
  return response.data;
};