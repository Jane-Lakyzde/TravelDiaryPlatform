<template>
  <view class="login-container">
    <!-- 顶部 -->
    <view class="login-header">
      <text class="iconfont icon-back">×</text>
      <text class="login-help" @tap="toggleHelp">遇到问题</text>
      <view v-if="showHelp" class="dropdown-menu" @tap.stop>
        <view class="dropdown-item">无法接收验证码</view>
        <view class="dropdown-item">微信登录失败</view>
        <view class="dropdown-item">联系客服</view>
      </view>
    </view>
    
    <!-- LOGO 区域 - 留出空间给图片 -->
    <view class="login-logo">
      <image src="/static/images/logo.png" mode="aspectFit" />
    </view>
    
    <!-- 登录按钮区域 -->
    <view class="login-buttons-area">
      <!-- 微信一键登录 -->
      <button class="login-btn wx-btn" @tap="wxLogin">
        <view class="btn-content">
          <text class="iconfont icon-wechat white-icon"></text>
          <text class="btn-text">微信一键登录</text>
        </view>
      </button>
      
      <!-- 手机号登录 -->
      <view class="login-phone" @tap="goPhoneLogin">手机号登录</view>
      
      <!-- 其它方式登录 -->
      <view class="login-other-title">其它方式登录</view>
      <view class="login-other-icons">
        <view class="icon-wrap" @tap="toggleOtherMenu">
          <text class="iconfont icon-wechat"></text>
        </view>
        <view class="icon-wrap" @tap="toggleOtherMenu">
          <text class="iconfont icon-weibo"></text>
        </view>
        <view class="icon-wrap" @tap="toggleOtherMenu">
          <text class="iconfont icon-qq"></text>
        </view>
        <view v-if="showOtherMenu" class="dropdown-menu other-menu" @tap.stop>
          <view class="dropdown-item">暂未开通，敬请期待</view>
        </view>
      </view>
    </view>
    
    <!-- 协议勾选 -->
    <view class="login-protocol">
      <text class="checkbox" :class="{checked: checked}" @tap="checked = !checked">
        <text v-if="checked" class="iconfont icon-checked"></text>
        <text v-else class="iconfont icon-unchecked"></text>
      </text>
      <view class="protocol-text">
        已阅读并同意
        <text class="link-text" hover-class="link-text-active" @tap="goToAgreement('user-agreement')">《用户协议》</text>
        <text class="link-text" hover-class="link-text-active" @tap="goToAgreement('privacy-policy')">《隐私政策》</text>
        <text class="link-text" hover-class="link-text-active" @tap="goToAgreement('buyer-notice')">《买家须知》</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/store/modules/user'

const userStore = useUserStore()
const showHelp = ref(false)
const showOtherMenu = ref(false)
const checked = ref(false)
const loginLoading = ref(false)

const toggleHelp = () => {
  showHelp.value = !showHelp.value
  showOtherMenu.value = false
}
const toggleOtherMenu = () => {
  showOtherMenu.value = !showOtherMenu.value
  showHelp.value = false
}
const goPhoneLogin = () => {
  if (!checked.value) {
    uni.showToast({
      title: '请先阅读并同意相关协议',
      icon: 'none'
    })
    return
  }
  uni.navigateTo({ url: '/pages/login/phone' })
}

// 跳转到协议页面
const goToAgreement = (type) => {
  uni.navigateTo({
    url: `/pages/agreement/${type}`
  })
}

// 微信登录方法
const wxLogin = () => {
  // 第一步：先判断是否勾选协议
  if (!checked.value) {
    uni.showToast({
      title: '请先阅读并同意相关协议',
      icon: 'none'
    })
    return
  }

  // 在这个同步作用域里直接调用 getUserProfile
  uni.getUserProfile({
    desc: '用于完善用户资料',
    lang: 'zh_CN',
    success: async (userInfoRes) => {
      loginLoading.value = true
      try {
        // 获取微信 codes
        const loginRes = await uni.login({ provider: 'weixin' })

        // 调用后端微信登录
        await userStore.wxLogin({
          code: loginRes.code,
          userInfo: userInfoRes.userInfo,
          loginType: 'wechat',
          encryptedData: userInfoRes.encryptedData,
          iv: userInfoRes.iv
        })

        // 登录成功
        uni.switchTab({
          url: '/pages/user/home'
        })

        uni.showToast({
          title: '登录成功',
          icon: 'success'
        })
      } catch (error) {
        console.error('登录失败', error)
        uni.showToast({
          title: error.message || '登录失败，请重试',
          icon: 'none'
        })
      } finally {
        loginLoading.value = false
      }
    },
    fail: (err) => {
      console.error('getUserProfile 授权失败：', err)
      uni.showToast({
        title: '用户拒绝授权',
        icon: 'none'
      })
    }
  })
}
</script>

<style>
@font-face {
  font-family: 'iconfont';
  src: url('/static/fonts/iconfont.ttf') format('truetype');
}
.iconfont {
  font-family: 'iconfont';
  font-size: 32rpx;
}
.login-container {
  min-height: 100vh;
  width: 750rpx; /* 使用固定宽度750rpx（等于100vw）确保占满屏幕 */
  background-color: #585965;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow: hidden; /* 防止毛玻璃效果溢出 */
  padding: 0; /* 移除可能的内边距 */
  margin: 0 -10rpx; /* 向两侧扩展10rpx覆盖可能的白边 */
  box-sizing: border-box;
  left: 0; /* 确保左对齐 */
}

page {
  margin: 0;
  padding: 0;
  width: 100%;
  overflow-x: hidden;
  background-color: #585965;
}

/* 扩展背景色解决白边问题 */
uni-page-body,
uni-page-head,
uni-page,
uni-page-wrapper {
  background-color: #585965 !important;
}

/* 背景装饰 - 增加模糊效果 */
.login-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: -10rpx; /* 向左扩展 */
  right: -10rpx; /* 向右扩展 */
  bottom: 0;
  background: radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.05) 0%, transparent 60%);
  z-index: 0;
}

/* 增加背景淡化模糊层 */
.login-container::after {
  content: '';
  position: absolute;
  top: 0;
  left: -10rpx;
  right: -10rpx;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
  z-index: 0;
}

.login-header, .login-logo, .login-buttons-area, .login-protocol {
  position: relative;
  z-index: 1;
  width: 100%;
}

.login-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 40rpx 40rpx 0 40rpx;
  box-sizing: border-box;
}
.icon-back {
  font-size: 48rpx;
  color: #DB9EA2;
}
.login-help {
  font-size: 28rpx;
  color: #DB9EA2;
  position: absolute;
  right: 60rpx;
  font-weight: 500;
  letter-spacing: 0.5px;
}
.dropdown-menu {
  position: absolute;
  top: 60rpx;
  right: 0;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 16rpx;
  box-shadow: 0 2rpx 12rpx rgba(0,0,0,0.15);
  z-index: 10;
  min-width: 220rpx;
}
.dropdown-item {
  padding: 28rpx 40rpx;
  font-size: 28rpx;
  color: #333;
  border-bottom: 1rpx solid rgba(240,240,240,0.5);
}
.dropdown-item:last-child { border-bottom: none; }

/* Logo 区域 */
.login-logo {
  margin: 80rpx 0;
  width: 312rpx;  /* 原240rpx的1.3倍 */
  height: 312rpx;  /* 原240rpx的1.3倍 */
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border-radius: 24rpx;
}

.login-logo image {
  width: 260rpx;  /* 原200rpx的1.3倍 */
  height: 260rpx;  /* 原200rpx的1.3倍 */
  border-radius: 0;
}

/* 登录按钮区域 */
.login-buttons-area {
  padding: 0 40rpx;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 220rpx; /* 增加下移距离 */
}

/* 微信一键登录按钮 - 改为粉色 */
.login-btn.wx-btn {
  width: 90%;
  height: 90rpx;
  background: rgba(219, 158, 162, 0.95); /* 粉色按钮 */
  backdrop-filter: blur(5px); /* 毛玻璃效果 */
  -webkit-backdrop-filter: blur(5px); /* Safari 支持 */
  color: #fff;
  font-size: 32rpx;
  border-radius: 45rpx; /* 圆角 */
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 32rpx;
  box-shadow: 0 6rpx 16rpx rgba(0, 0, 0, 0.15);
  border: none;
  padding: 0;
}

/* 按钮内容容器 */
.btn-content {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  position: relative;
}

/* 微信按钮中的白色图标 */
.white-icon {
  color: white !important; /* 使用!important确保覆盖其他样式 */
  font-size: 40rpx;
  margin-right: 8rpx;
  position: relative;
  left: -20rpx; /* 微调图标位置 */
}

/* 按钮文本样式 */
.btn-text {
  color: white;
  font-weight: 600;
  letter-spacing: 2rpx;
}

/* 手机号登录 */
.login-phone {
  color: #DB9EA2;
  font-size: 32rpx; /* 增大字号 */
  margin-bottom: 80rpx;
  text-align: center;
  font-weight: 500;
  letter-spacing: 0.5px;
}

/* 其他登录方式 */
.login-other-title {
  color: rgba(219, 158, 162, 0.8);
  font-size: 28rpx; /* 增大字号 */
  margin-bottom: 32rpx;
  margin-top: 20rpx;
  font-weight: 500;
  letter-spacing: 0.5px;
}
.login-other-icons {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 100rpx; /* 增加图标间距 */
  margin-bottom: 60rpx;
  position: relative;
}
.icon-wrap {
  width: 72rpx;
  height: 72rpx;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
}

/* 图标样式 */
.icon-wechat:before { content: '\e616'; font-size: 40rpx; color: #DB9EA2; }
.icon-weibo:before { content: '\e63e'; font-size: 38rpx; color: #DB9EA2; }
.icon-qq:before { content: '\e623'; font-size: 38rpx; color: #DB9EA2; }

/* 确保微信登录按钮中的图标为白色 */
.login-btn.wx-btn .icon-wechat:before {
  color: white !important; /* 强制为白色 */
}

.other-menu {
  left: 0;
  right: 0;
  top: 80rpx;
  min-width: 200rpx;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

/* 协议区域 */
.login-protocol {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24rpx;
  margin-top: auto;
  margin-bottom: 40rpx;
  width: 90vw;
  position: absolute;
  bottom: 0;
  padding: 20rpx 0;
  font-weight: 500;
  letter-spacing: 0.5px;
}
.checkbox {
  width: 36rpx;
  height: 36rpx;
  border-radius: 50%;
  border: 2rpx solid #DB9EA2;
  margin-right: 16rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
}
.checkbox.checked {
  border-color: #DB9EA2;
  background: #DB9EA2;
}
.icon-checked:before { content: '\2714'; color: #fff; font-size: 28rpx; }
.icon-unchecked:before { content: ''; }
.protocol-text {
  color: #DB9EA2;
  font-size: 24rpx;
  font-weight: 500;
  letter-spacing: 0.5px;
  display: flex;
  flex-wrap: wrap;
}

.link-text {
  color: #DB9EA2;
  text-decoration: none;
  margin: 0 4rpx;
}

.link-text-active {
  text-decoration: underline;
}
</style>