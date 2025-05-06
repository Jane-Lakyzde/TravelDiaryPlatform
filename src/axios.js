// axios.js
import axios from 'axios';

const http = axios.create({
  baseURL: 'http://127.0.0.1:3000/', // 后端接口地址前缀
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// 请求拦截器
http.interceptors.request.use(config => {
  // 例如附带 token
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
}, error => Promise.reject(error));

// 响应拦截器
http.interceptors.response.use(response => {
  return response.data;  //服务器的数据
}, error => {
  return Promise.reject(error.response?.data || error);
});

export default http;