import axios from '../../api/axios';
import { loginStart, loginSuccess, loginFailure } from './authSlice';
import jwtDecode from 'jwt-decode';

export const login = (credentials) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const response = await axios.post('/auth/login/', credentials);
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
    await axios.post('/auth/register/', userData);
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