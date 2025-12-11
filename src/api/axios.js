import axios from 'axios';

const instance = axios.create({
  baseURL: '/api',
  withCredentials: true,
});

// Request interceptor to add auth token
instance.interceptors.request.use(
  (config) => {
    // The token is automatically sent via cookies (httpOnly)
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Redirect to login if unauthorized
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default instance;
