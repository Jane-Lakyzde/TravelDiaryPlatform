import { defineStore } from 'pinia'
import { login } from '@/api/user'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: uni.getStorageSync('token') || '',
    userInfo: uni.getStorageSync('userInfo') || {
      email: '',
      username: '',
      avatar: '',
      bio: '',
      posts: 0,
      followers: 0,
      following: 0
    },
    isLogin: !!uni.getStorageSync('token')
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
      this.token = token
      uni.setStorageSync('token', token)
    },

    setUserInfo(userInfo) {
      const defaultInfo = {
        email: '',
        username: '',
        avatar: '',
        bio: '',
        posts: 0,
        followers: 0,
        following: 0
      }
      this.userInfo = { ...defaultInfo, ...userInfo }
      uni.setStorageSync('userInfo', userInfo)
    },

    setLoginStatus(status) {
      this.isLogin = status
    },

    clearUserData() {
      this.token = ''
      this.userInfo = {
        email: '',
        username: '',
        avatar: '',
        bio: '',
        posts: 0,
        followers: 0,
        following: 0
      }
      this.isLogin = false
      uni.removeStorageSync('token')
      uni.removeStorageSync('userInfo')
    },

    // 微信登录
    async wxLogin(loginData) {
      try {
        const response = await login(loginData)
        if (response.data && response.data.token) {
          this.setToken(response.data.token)
          this.setUserInfo(response.data.userInfo)
          this.setLoginStatus(true)
          return Promise.resolve(response.data)
        }
      } catch (error) {
        return Promise.reject(error)
      }
    },

    // 更新用户信息
    updateUserInfo(newInfo) {
      this.userInfo = newInfo;
    },

    // 更新帖子数量
    updatePostsCount(count) {
      if (this.userInfo) {
        this.userInfo.posts = count
        // 保存到本地存储
        uni.setStorageSync('userInfo', this.userInfo)
      }
    },

    // 获取用户信息
    getUserInfo() {
      return this.userInfo
    },

    // 退出登录
    logout() {
      this.clearUserData()
    }
  }
})