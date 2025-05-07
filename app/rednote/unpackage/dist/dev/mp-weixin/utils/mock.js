"use strict";
const DELAY = 800;
const mockUserData = {
  token: "mock_token_abcdef123456",
  userInfo: {
    userId: "10001",
    nickname: "旅行者",
    avatar: "https://via.placeholder.com/100x100",
    gender: 1,
    points: 1280,
    followCount: 56,
    fansCount: 128,
    likeCount: 320
  }
};
const mockAccounts = [
  { phone: "13800138000", password: "123456" },
  { phone: "13900139000", password: "123456" }
];
const mockResponse = (data, message = "success", code = 0) => {
  return {
    code,
    message,
    data
  };
};
const mockRequest = (api, params) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let result;
      switch (api) {
        case "/api/user/login":
          if (params.loginType === "wechat" && params.code) {
            result = mockResponse(mockUserData);
          } else {
            result = mockResponse(null, "无效的登录参数", -1);
          }
          break;
        case "/api/user/phone-login":
          if (params.phone && params.password) {
            const matchedAccount = mockAccounts.find(
              (account) => account.phone === params.phone && account.password === params.password
            );
            if (matchedAccount) {
              result = mockResponse(mockUserData);
            } else {
              result = mockResponse(null, "手机号或密码错误", -1);
            }
          } else if (params.phone && params.code) {
            result = mockResponse(mockUserData);
          } else {
            result = mockResponse(null, "登录参数错误", -1);
          }
          break;
        case "/api/user/info":
          result = mockResponse(mockUserData.userInfo);
          break;
        default:
          result = mockResponse(null, "未知的API", -1);
      }
      resolve(result);
    }, DELAY);
  });
};
exports.mockRequest = mockRequest;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/mock.js.map
