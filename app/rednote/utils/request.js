/**
 * 请求封装模块
 * 处理通用的请求逻辑，如添加token、错误处理等
 */

// 导入模拟数据工具
import { MOCK_ENABLED, mockRequest } from './mock';

// 服务器API基础URL，根据实际环境配置
const BASE_URL = 'https://127.0.0.1.3000'; // 替换为你的实际API地址

// 创建请求对象
const http = {
  request(options = {}) {
    const url = options.url;
    
    // 如果启用了模拟数据且不是生产环境
    if (MOCK_ENABLED && process.env.NODE_ENV !== 'production') {
      console.log('使用模拟数据', url, options.data);
      return mockRequest(url, options.data);
    }
    
    // 合并请求参数
    options.url = BASE_URL + options.url;
    options.header = options.header || {};
    
    // 添加token认证
    const token = uni.getStorageSync('token');
    if (token) {
      options.header['Authorization'] = `Bearer ${token}`;
    }
    
    // 添加内容类型
    if (options.method !== 'GET') {
      options.header['Content-Type'] = options.header['Content-Type'] || 'application/json';
    }
    
    // 处理请求超时
    options.timeout = options.timeout || 60000;
    
    // 返回Promise
    return new Promise((resolve, reject) => {
      uni.request({
        ...options,
        success: (res) => {
          // 请求成功，但需要检查业务状态码
          if (res.statusCode >= 200 && res.statusCode < 300) {
            // API正常响应
            if (res.data && res.data.code === 0) {
              resolve(res.data);
            } else {
              // 业务错误
              const errMsg = (res.data && res.data.message) || '请求失败';
              uni.showToast({
                title: errMsg,
                icon: 'none',
                duration: 2000
              });
              reject(res.data);
            }
          } else if (res.statusCode === 401) {
            // 未授权，清除token并跳转到登录页
            uni.removeStorageSync('token');
            uni.removeStorageSync('userInfo');
            uni.showToast({
              title: '登录已过期，请重新登录',
              icon: 'none',
              duration: 2000
            });
            setTimeout(() => {
              uni.reLaunch({
                url: '/pages/login/login'
              });
            }, 1500);
            reject(res.data);
          } else {
            // 其他HTTP错误
            uni.showToast({
              title: `网络错误(${res.statusCode})`,
              icon: 'none',
              duration: 2000
            });
            reject(res.data);
          }
        },
        fail: (err) => {
          // 请求失败（网络错误等）
          uni.showToast({
            title: '网络请求失败，请检查网络',
            icon: 'none',
            duration: 2000
          });
          reject(err);
        }
      });
    });
  },
  
  // GET请求
  get(url, data = {}, options = {}) {
    return this.request({
      url,
      data,
      method: 'GET',
      ...options
    });
  },
  
  // POST请求
  post(url, data = {}, options = {}) {
    return this.request({
      url,
      data,
      method: 'POST',
      ...options
    });
  },
  
  // PUT请求
  put(url, data = {}, options = {}) {
    return this.request({
      url,
      data,
      method: 'PUT',
      ...options
    });
  },
  
  // DELETE请求
  delete(url, data = {}, options = {}) {
    return this.request({
      url,
      data,
      method: 'DELETE',
      ...options
    });
  }
};

export default http; 