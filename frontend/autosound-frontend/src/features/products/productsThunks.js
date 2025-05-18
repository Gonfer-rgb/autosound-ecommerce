import api from '../../api/products';

export const fetchProducts = (params = {}) => async (dispatch) => {
  try {
    const response = await api.getProducts(params);
    return response;
  } catch (error) {
    throw error;
  }
};

export const fetchFeaturedProducts = () => async (dispatch) => {
  try {
    const response = await api.getProducts({ featured: true });
    return response;
  } catch (error) {
    throw error;
  }
};

export const fetchProductBySlug = (slug) => async (dispatch) => {
  try {
    const response = await api.getProductBySlug(slug);
    return response;
  } catch (error) {
    throw error;
  }
};

export const fetchCategories = () => async (dispatch) => {
  try {
    const response = await api.getCategories();
    return response;
  } catch (error) {
    throw error;
  }
};

export const fetchBrands = () => async (dispatch) => {
  try {
    const response = await api.getBrands();
    return response;
  } catch (error) {
    throw error;
  }
};

export const createProductReview = (slug, reviewData) => async (dispatch) => {
  try {
    const response = await api.createProductReview(slug, reviewData);
    return response;
  } catch (error) {
    throw error;
  }
};