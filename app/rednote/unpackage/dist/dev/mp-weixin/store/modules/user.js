"use strict";
const common_vendor = require("../../common/vendor.js");
const api_user = require("../../api/user.js");
const useUserStore = common_vendor.defineStore("user", {
  state: () => ({
    token: common_vendor.index.getStorageSync("token") || "",
    userInfo: common_vendor.index.getStorageSync("userInfo") || {
      email: "",
      username: "",
      avatar: "",
      bio: "",
      posts: 0,
      followers: 0,
      following: 0
    },
    isLogin: !!common_vendor.index.getStorageSync("token")
  }),
  getters: {
    getToken: (state) => state.token,
    getUserInfo: (state) => state.userInfo,
    getIsLogin: (state) => state.isLogin,
    getUsername: (state) => state.userInfo.username,
    getAvatar: (state) => state.userInfo.avatar
  },
  actions: {
    /**
     * 设置用户token
     *
     * @param {string} token - 用户token
     */
    setToken(token) {
      this.token = token;
      common_vendor.index.setStorageSync("token", token);
    },
    setUserInfo(userInfo) {
      const defaultInfo = {
        email: "",
        username: "",
        avatar: "",
        bio: "",
        posts: 0,
        followers: 0,
        following: 0
      };
      this.userInfo = { ...defaultInfo, ...userInfo };
      common_vendor.index.setStorageSync("userInfo", userInfo);
    },
    setLoginStatus(status) {
      this.isLogin = status;
    },
    clearUserData() {
      this.token = "";
      this.userInfo = {
        email: "",
        username: "",
        avatar: "",
        bio: "",
        posts: 0,
        followers: 0,
        following: 0
      };
      this.isLogin = false;
      common_vendor.index.removeStorageSync("token");
      common_vendor.index.removeStorageSync("userInfo");
    },
    // 微信登录
    async wxLogin(loginData) {
      try {
        const response = await api_user.login(loginData);
        if (response.data && response.data.token) {
          this.setToken(response.data.token);
          this.setUserInfo(response.data.userInfo);
          this.setLoginStatus(true);
          return Promise.resolve(response.data);
        }
      } catch (error) {
        return Promise.reject(error);
      }
    },
    // 更新用户信息
    updateUserInfo(newInfo) {
      this.userInfo = newInfo;
    },
    // 更新帖子数量
    updatePostsCount(count) {
      if (this.userInfo) {
        this.userInfo.posts = count;
        common_vendor.index.setStorageSync("userInfo", this.userInfo);
      }
    },
    // 获取用户信息
    getUserInfo() {
      return this.userInfo;
    },
    // 退出登录
    logout() {
      this.clearUserData();
    }
  }
});
exports.useUserStore = useUserStore;
//# sourceMappingURL=../../../.sourcemap/mp-weixin/store/modules/user.js.map
