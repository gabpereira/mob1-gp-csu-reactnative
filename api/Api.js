import axios from 'axios';
import 'react-native-gesture-handler';

export default axios.create({
  baseURL: `http://localhost:8000/api/`
});