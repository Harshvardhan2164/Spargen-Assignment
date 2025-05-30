import axios from 'axios';

const API = axios.create({
    baseURL: 'https://homecraft-backend-eos4.onrender.com/api',
    withCredentials: true,
});

API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if(token) config.headers.Authorization = `Bearer ${token}`;

    return config;
});

export default API;