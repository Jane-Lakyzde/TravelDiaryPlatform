// src/api/auth.js
import http from '../axios.js'

// 登录
export function login(data) {
  return http.post('/api/user/login', data)
}

// 注册
export function register(data) {
  return http.post('/api/user/register', data)
}

// 获取当前用户信息
export const getProfile = () => {
  return request.get('api/users/profile');
};

// 更新用户资料
export const updateProfile = (data) => {
  return request.put('api/users/profile', data);
};