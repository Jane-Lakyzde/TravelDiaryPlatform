/**
 * 模拟API数据
 * 用于前端开发阶段测试，实际项目中应替换为真实API
 */

// 开启模拟数据开关（在正式环境中改为false）
export const MOCK_ENABLED = true;

// 模拟延迟时间(ms)
const DELAY = 800;

// 模拟用户数据
const mockUserData = {
  token: 'mock_token_abcdef123456',
  userInfo: {
    userId: '10001',
    nickname: '旅行者',
    avatar: 'https://via.placeholder.com/100x100',
    gender: 1,
    points: 1280,
    followCount: 56,
    fansCount: 128,
    likeCount: 320
  }
};

// 模拟测试账号
const mockAccounts = [
  { phone: '13800138000', password: '123456' },
  { phone: '13900139000', password: '123456' }
];

// 模拟响应结构
const mockResponse = (data, message = 'success', code = 0) => {
  return {
    code,
    message,
    data
  };
};

// 模拟API请求
export const mockRequest = (api, params) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let result;
      
      // 根据API路径模拟不同的响应数据
      switch (api) {
        case '/api/user/login':
          // 微信登录
          if (params.loginType === 'wechat' && params.code) {
            result = mockResponse(mockUserData);
          } else {
            result = mockResponse(null, '无效的登录参数', -1);
          }
          break;
          
        case '/api/user/phone-login':
          // 手机号登录
          if (params.phone && params.password) {
            // 检查账号密码是否匹配
            const matchedAccount = mockAccounts.find(
              account => account.phone === params.phone && account.password === params.password
            );
            
            if (matchedAccount) {
              result = mockResponse(mockUserData);
            } else {
              result = mockResponse(null, '手机号或密码错误', -1);
            }
          } else if (params.phone && params.code) {
            // 验证码登录
            result = mockResponse(mockUserData);
          } else {
            result = mockResponse(null, '登录参数错误', -1);
          }
          break;
          
        case '/api/user/info':
          // 获取用户信息
          result = mockResponse(mockUserData.userInfo);
          break;
          
        default:
          result = mockResponse(null, '未知的API', -1);
      }
      
      resolve(result);
    }, DELAY);
  });
};

export default {
  MOCK_ENABLED,
  mockRequest
}; 