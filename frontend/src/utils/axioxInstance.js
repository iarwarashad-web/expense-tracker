import axios from 'axios';
import {BASE_URL} from './apiPath';

const axiosInstance = axios.create({
    baseURL: BASE_URL, 
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    }, 
})
// Add a request interceptor to include the token in the headers
axiosInstance.interceptors.request.use( (config) => {       
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}   , (error) => {
    return Promise.reject(error);
}); 

// Add a response interceptor to handle errors globally
axiosInstance.interceptors.response.use( 
    (response) => {
        return response;
    }, 
    (error) => {
        if (error.response && error.response.status === 401) {
            // Handle unauthorized access, e.g., redirect to login
            console.error('Unauthorized access - redirecting to login');
            window.location.href = '/login'; // Adjust the path as needed
            // You can redirect to login page here
        }else if (error.response && error.response.status === 500) {
            // Handle forbidden access, e.g., show a message
            console.error('Server error - please try again later');
        }else if (error.code === 'ECONNABORTED') {
            // Handle timeout error
            console.error('Request timed out - please try again later');
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
