import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { REQRES_API_KEY } from '@env';

const api = axios.create({
  baseURL: 'https://reqres.in/api',
  headers: {
    'x-api-key': REQRES_API_KEY,
  },
});

api.interceptors.request.use(async (config) => {
  const savedToken = await AsyncStorage.getItem('@token');
  if (savedToken) {
    config.headers.Authorization = `Bearer ${savedToken}`;
  }
  return config;
});

export default api;
export {api};
