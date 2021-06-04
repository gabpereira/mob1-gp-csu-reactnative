import axios from 'axios';
import 'react-native-gesture-handler';

let API = axios.create({
  baseURL: `http://localhost:8000/api/`,
  timeout: 10000,
});

export default API;
export const token = localStorage.getItem('user_token')