import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = 'http://localhost:8000/api/auth/';

const register = (username, email, password) => {
  return axios.post(API_URL + 'register', {
    username,
    email,
    password,
  });
};

const login = (email, password) => {
  return axios
    .post(API_URL + 'login', {
      email,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        Cookies.set('token', response.data.token, { expires: 1 }); // expires in 1 day
      }
      return response.data;
    });
};

const logout = () => {
  Cookies.remove('token');
};

const getCurrentUser = () => {
  const token = Cookies.get('token');
  return axios.get(API_URL + 'profile', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const updateFavorites = async (favorites) => {
  const token = Cookies.get('token');
  return axios.put(API_URL + 'favorites', favorites, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
  updateFavorites,
};
