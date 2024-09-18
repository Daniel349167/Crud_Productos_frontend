// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api', // URL base de tu API Laravel
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
