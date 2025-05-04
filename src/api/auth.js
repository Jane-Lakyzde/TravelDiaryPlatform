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
