import axios from 'axios';
import { storage, AUTH_TOKEN } from '../storage';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: process.env.REACT_APP_API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json'
  }
});

axiosInstance.interceptors.request.use(
  (config) => {
    // Do something before sending the request
    const token = storage.getItem(AUTH_TOKEN);
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
   console.log(error)
    // Do something with the request error
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    // Do something with the response data
    return response;
  },
  (error) => {
    console.log(error)
    // Do something with the response error
    return Promise.reject(error);
  }
);

export default axiosInstance;
