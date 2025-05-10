<template>
    <view class="phone-container">
      <!-- 顶部 -->
      <view class="phone-header">
        <text class="iconfont icon-back" @tap="goBack"></text>
        <text class="phone-help" @tap="toggleHelp">遇到问题</text>
        <view v-if="showHelp" class="dropdown-menu" @tap.stop>
          <view class="dropdown-item">无法接收验证码</view>
          <view class="dropdown-item">微信登录失败</view>
          <view class="dropdown-item">联系客服</view>
        </view>
      </view>
      <!-- 标题 -->
      <view class="phone-title">手机号登录</view>
      <view class="phone-subtitle">未注册手机号将自动注册</view>
      <!-- 手机号输入 -->
      <view class="input-row">
        <picker mode="selector" :range="areaCodes" :value="areaIndex" @change="onAreaChange">
          <view class="area-code">{{ areaCodes[areaIndex] }}</view>
        </picker>
        <input class="phone-input" v-model="phone" type="number" maxlength="11" placeholder="手机号" />
      </view>
      <!-- 密码输入 -->
      <view class="input-row">
        <input class="pwd-input" v-model="password" type="password" maxlength="20" placeholder="密码" />
      </view>
      <!-- 确定按钮 -->
      <button class="confirm-btn" :disabled="!canSubmit" @tap="onConfirm">确定</button>
      <!-- 其它 -->
      <view class="phone-links">
        <text class="link" @tap="goPwdLogin">密码登录</text>
        <text class="link right">手机号不可用？</text>
      </view>
      <!-- 协议勾选 -->
      <view class="phone-protocol">
        <text class="checkbox" :class="{checked: checked}" @tap="checked = !checked">
          <text v-if="checked" class="iconfont icon-checked"></text>
          <text v-else class="iconfont icon-unchecked"></text>
        </text>
        <text class="protocol-text">已阅读并同意《用户协议》《隐私政策》《买家须知》。</text>
      </view>
    </view>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  import { phoneLogin } from '@/api/user' // 导入手机号登录API

  const showHelp = ref(false)
  const checked = ref(false)
  const phone = ref('')
  const password = ref('')
  const areaCodes = ref(['+86', '+852', '+853', '+886'])
  const areaIndex = ref(0)
  const loading = ref(false)
  
  const goBack = () => {
    uni.navigateBack()
  }
  const toggleHelp = () => {
    showHelp.value = !showHelp.value
  }
  const onAreaChange = e => {
    areaIndex.value = e.detail.value
  }
  const goPwdLogin = () => {
    uni.showToast({ title: '请用手机号+密码登录', icon: 'none' })
  }
  const canSubmit = computed(() => {
    return phone.value.length === 11 && password.value.length >= 6 && checked.value
  })
  const onConfirm = async () => {
    if (phone.value.length !== 11) {
      uni.showToast({ title: '请输入11位手机号', icon: 'none' })
      return
    }
    if (password.value.length < 6) {
      uni.showToast({ title: '密码长度至少6位', icon: 'none' })
      return
    }
    if (!checked.value) {
      uni.showToast({ title: '请勾选协议', icon: 'none' })
      return
    }
    if (!canSubmit.value) return
    try {
      const res = await phoneLogin({
        phone: phone.value,
        password: password.value
      })
      // 登录成功后存储 token
      uni.setStorageSync('token', res.token)
      uni.showToast({ title: '登录成功', icon: 'success' })
      uni.reLaunch({ url: '/pages/user/home' })
    } catch (err) {
      uni.showToast({ title: err.message || '登录失败', icon: 'none' })
      console.error('登录错误：', err)
    }
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
  .phone-container {
    min-height: 100vh;
    background: #fff;
    padding: 0 40rpx;
    box-sizing: border-box;
  }
  .phone-header {
    width: 100vw;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 40rpx 0 0 0;
    position: relative;
  }
  .icon-back:before { content: '\2039'; font-size: 48rpx; color: #222; }
  .phone-help {
    font-size: 28rpx;
    color: #999;
    position: absolute;
    right: 0;
  }
  .dropdown-menu {
    position: absolute;
    top: 60rpx;
    right: 0;
    background: #fff;
    border-radius: 16rpx;
    box-shadow: 0 2rpx 12rpx rgba(0,0,0,0.08);
    z-index: 10;
    min-width: 220rpx;
  }
  .dropdown-item {
    padding: 28rpx 40rpx;
    font-size: 28rpx;
    color: #333;
    border-bottom: 1rpx solid #f0f0f0;
  }
  .dropdown-item:last-child { border-bottom: none; }
  .phone-title {
    font-size: 44rpx;
    font-weight: bold;
    color: #222;
    margin-top: 60rpx;
    margin-bottom: 12rpx;
  }
  .phone-subtitle {
    color: #bbb;
    font-size: 26rpx;
    margin-bottom: 60rpx;
  }
  .input-row {
    display: flex;
    align-items: center;
    border-bottom: 2rpx solid #eee;
    margin-bottom: 40rpx;
  }
  .area-code {
    font-size: 32rpx;
    color: #222;
    margin-right: 16rpx;
    min-width: 80rpx;
  }
  .phone-input {
    flex: 1;
    height: 80rpx;
    font-size: 32rpx;
    border: none;
    outline: none;
    background: transparent;
    color: #222;
  }
  .pwd-input {
    flex: 1;
    height: 80rpx;
    font-size: 32rpx;
    border: none;
    outline: none;
    background: transparent;
    color: #222;
  }
  .confirm-btn {
    width: 100%;
    height: 88rpx;
    background: #b2e6e0;
    color: #fff;
    font-size: 32rpx;
    border-radius: 8rpx;
    margin: 40rpx 0 0 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .confirm-btn:disabled {
    background: #e0e0e0;
    color: #aaa;
  }
  .phone-links {
    display: flex;
    justify-content: space-between;
    margin: 32rpx 0 0 0;
    color: #888;
    font-size: 28rpx;
  }
  .link {
    color: #888;
  }
  .link.right {
    margin-left: auto;
  }
  .phone-protocol {
    display: flex;
    align-items: center;
    margin-top: 60rpx;
    font-size: 24rpx;
    color: #888;
  }
  .checkbox {
    width: 36rpx;
    height: 36rpx;
    border-radius: 50%;
    border: 2rpx solid #bbb;
    margin-right: 16rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fff;
  }
  .checkbox.checked {
    border-color: #3cc51f;
    background: #3cc51f;
  }
  .icon-checked:before { content: '\2714'; color: #fff; font-size: 28rpx; }
  .icon-unchecked:before { content: ''; }
  .protocol-text {
    color: #888;
    font-size: 24rpx;
  }
  </style>
  