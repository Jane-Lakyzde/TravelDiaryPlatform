import { login } from '@/api/user'

const state = {
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
}

const mutations = {
  SET_TOKEN(state, token) {
    state.token = token
    uni.setStorageSync('token', token)
  },
  SET_USER_INFO(state, userInfo) {
    state.userInfo = userInfo
    uni.setStorageSync('userInfo', userInfo)
  },
  SET_LOGIN_STATUS(state, status) {
    state.isLogin = status
  },
  CLEAR_USER_DATA(state) {
    state.token = ''
    state.userInfo = {
      email: '',
      username: '',
      avatar: '',
      bio: '',
      posts: 0,
      followers: 0,
      following: 0
    }
    state.isLogin = false
    uni.removeStorageSync('token')
    uni.removeStorageSync('userInfo')
  }
}

const actions = {
  // 微信登录
  async wxLogin({ commit }, loginData) {
    try {
      const response = await login(loginData)
      if (response.data && response.data.token) {
        commit('SET_TOKEN', response.data.token)
        commit('SET_USER_INFO', response.data.userInfo)
        commit('SET_LOGIN_STATUS', true)
        return Promise.resolve(response.data)
      }
    } catch (error) {
      return Promise.reject(error)
    }
  },

  // 更新用户信息
  updateUserInfo({ commit }, userInfo) {
    commit('SET_USER_INFO', userInfo)
  },

  // 退出登录
  logout({ commit }) {
    commit('CLEAR_USER_DATA')
  }
}

const getters = {
  token: state => state.token,
  userInfo: state => state.userInfo,
  isLogin: state => state.isLogin,
  username: state => state.userInfo.username,
  avatar: state => state.userInfo.avatar
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}