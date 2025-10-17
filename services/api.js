import axios from 'axios';

const baseURL = 'http://192.168.1.64:8080';

const api = axios.create({
  baseURL: baseURL,
});

export default api;