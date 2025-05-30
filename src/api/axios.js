import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api', // Update this if your backend is hosted elsewhere
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
