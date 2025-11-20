import axios from 'axios';

const API_BASE = 'https://dev-project-ecommerce.upgrad.dev/api';

const axiosClient = axios.create({
    baseURL: API_BASE,
    headers: { 'Content-Type': 'application/json' },
});

// Add token automatically if present
axiosClient.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export default axiosClient;