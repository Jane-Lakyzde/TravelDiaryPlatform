<template>
  <view class="login-container">
    <!-- 顶部 -->
    <view class="login-header">
      <text class="login-help" @tap="toggleHelp">遇到问题</text>
      <view v-if="showHelp" class="dropdown-menu" @tap.stop>
        <view class="dropdown-item">无法接收验证码</view>
        <view class="dropdown-item">微信登录失败</view>
        <view class="dropdown-item">联系客服</view>
      </view>
    </view>
    <!-- LOGO -->
    <view class="login-logo">
      <image src="https://via.placeholder.com/120x120?text=LOGO" mode="aspectFit" />
    </view>
    <!-- 微信一键登录 -->
    <button class="login-btn wx-btn">
      <text class="iconfont icon-wechat"></text>
      微信一键登录
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
    <!-- 协议勾选 -->
    <view class="login-protocol">
      <text class="checkbox" :class="{checked: checked}" @tap="checked = !checked">
        <text v-if="checked" class="iconfont icon-checked"></text>
        <text v-else class="iconfont icon-unchecked"></text>
      </text>
      <text class="protocol-text">已阅读并同意《用户协议》《隐私政策》《买家须知》。</text>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
const showHelp = ref(false)
const showOtherMenu = ref(false)
const checked = ref(false)

const closeLogin = () => {
  uni.navigateBack()
}
const toggleHelp = () => {
  showHelp.value = !showHelp.value
  showOtherMenu.value = false
}
const toggleOtherMenu = () => {
  showOtherMenu.value = !showOtherMenu.value
  showHelp.value = false
}
const goPhoneLogin = () => {
  uni.navigateTo({ url: '/pages/login/phone.vue' })
}
</script>

<style>
.login-container {
  min-height: 100vh;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}
.login-header {
  width: 100vw;
  display: relative;
  justify-content: space-between;
  align-items: flex-start;
  padding: 40rpx 40rpx 0 40rpx;
  position: relative;
}
.login-help {
  font-size: 28rpx;
  color: #999;
  position: absolute;
  right: 60rpx;
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
.login-logo {
  margin: 120rpx 0 80rpx 0;
}
.login-logo image {
  width: 120rpx;
  height: 120rpx;
  border-radius: 24rpx;
}
.login-btn.wx-btn {
  width: 80vw;
  height: 88rpx;
  background: #3cc51f;
  color: #fff;
  font-size: 32rpx;
  border-radius: 12rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 32rpx;
}
.icon-wechat:before { content: '\e60b'; font-size: 40rpx; margin-right: 18rpx; }
.login-phone {
  color: #888;
  font-size: 30rpx;
  margin-bottom: 80rpx;
  text-align: center;
}
.login-other-title {
  color: #aaa;
  font-size: 26rpx;
  margin-bottom: 24rpx;
}
.login-other-icons {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 60rpx;
  margin-bottom: 80rpx;
  position: relative;
}
.icon-wrap {
  width: 64rpx;
  height: 64rpx;
  background: #f5f5f5;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.icon-weibo:before { content: '\e60c'; font-size: 38rpx; }
.icon-qq:before { content: '\e60d'; font-size: 38rpx; }
.other-menu {
  left: 0;
  right: 0;
  top: 80rpx;
  min-width: 200rpx;
}
.login-protocol {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24rpx;
  color: #888;
  margin-top: auto;
  margin-bottom: 40rpx;
  width: 90vw;
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