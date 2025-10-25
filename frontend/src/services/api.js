import axios from 'axios';

const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api`;

// Get auth token from localStorage
const getAuthHeader = () => {
  const token = localStorage.getItem('adminToken');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Reservations API
export const createReservation = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/reservations`, data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getReservations = async () => {
  try {
    const response = await axios.get(`${API_URL}/reservations`, {
      headers: getAuthHeader()
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const deleteReservation = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/reservations/${id}`, {
      headers: getAuthHeader()
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Promotions API
export const getPromotions = async () => {
  try {
    const response = await axios.get(`${API_URL}/promotions`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const createPromotion = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/promotions`, data, {
      headers: getAuthHeader()
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const updatePromotion = async (id, data) => {
  try {
    const response = await axios.put(`${API_URL}/promotions/${id}`, data, {
      headers: getAuthHeader()
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const deletePromotion = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/promotions/${id}`, {
      headers: getAuthHeader()
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Auth API
export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    if (response.data.token) {
      localStorage.setItem('adminToken', response.data.token);
      localStorage.setItem('adminEmail', response.data.email);
    }
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const logout = () => {
  localStorage.removeItem('adminToken');
  localStorage.removeItem('adminEmail');
  localStorage.removeItem('adminAuth');
};
