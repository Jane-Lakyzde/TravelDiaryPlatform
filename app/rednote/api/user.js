import http from '../utils/request'

// 微信登录
export function login(data) {
  return http.post('/api/user/login', data)
}

// 手机号登录
export function phoneLogin(data) {
  return http.post('/api/user/phone-login', data)
}

// 获取用户信息
export function getUserInfo() {
  return http.get('/api/user/info')
}

// 更新用户信息
export function updateUserInfo(data) {
  return http.put('/api/user/info', data)
}

// 登出
export function logout() {
  return http.post('/api/user/logout')
} 