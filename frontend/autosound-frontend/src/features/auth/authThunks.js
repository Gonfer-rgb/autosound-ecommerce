import api from '../../api/axios';
import { loginStart, loginSuccess, loginFailure, logout } from './authSlice';
import jwtDecode from 'jwt-decode';

export const login = (credentials) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const response = await api.post('/auth/login/', credentials);
    const { access } = response.data;
    const user = jwtDecode(access);
    
    localStorage.setItem('token', access);
    dispatch(loginSuccess({ user, token: access }));
  } catch (error) {
    dispatch(loginFailure(error.response?.data?.detail || 'Login failed'));
  }
};

export const register = (userData) => async (dispatch) => {
  dispatch(loginStart());
  try {
    await api.post('/auth/register/', userData);
    // After registration, automatically log in the user
    const credentials = {
      email: userData.email,
      password: userData.password,
    };
    dispatch(login(credentials));
  } catch (error) {
    dispatch(loginFailure(error.response?.data || 'Registration failed'));
  }
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('token');
  dispatch(logout());
};

export const updateProfile = (userData) => async (dispatch) => {
  try {
    const formData = new FormData();
    
    // Append all user data to formData
    Object.keys(userData).forEach(key => {
      if (userData[key] !== null && userData[key] !== undefined) {
        formData.append(key, userData[key]);
      }
    });

    const response = await api.patch('/auth/profile/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    // If the backend returns a new token with updated user info
    if (response.data.access) {
      const { access } = response.data;
      const user = jwtDecode(access);
      
      localStorage.setItem('token', access);
      dispatch(loginSuccess({ user, token: access }));
    }

    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const refreshToken = () => async (dispatch) => {
  try {
    const response = await api.post('/auth/token/refresh/');
    const { access } = response.data;
    const user = jwtDecode(access);
    
    localStorage.setItem('token', access);
    dispatch(loginSuccess({ user, token: access }));
    return access;
  } catch (error) {
    dispatch(logoutUser());
    throw error;
  }
};