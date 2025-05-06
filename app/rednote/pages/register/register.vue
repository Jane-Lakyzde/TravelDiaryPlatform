<template>
  <view class="register-container">
    <view class="register-card">
      <view class="card-header">
        <text class="header-text">注册</text>
      </view>
      
      <view class="register-form">
        <view class="form-item">
          <picker 
            :value="roleIndex" 
            :range="roles" 
            range-key="label"
            @change="handleRoleChange"
            class="role-picker"
          >
            <view class="picker-content">
              <text>{{ formInline.role ? roles[roleIndex].label : '请选择注册身份' }}</text>
              <text class="iconfont icon-arrow-down"></text>
            </view>
          </picker>
        </view>

        <view class="form-item">
          <input 
            v-model="formInline.username" 
            placeholder="请输入用户名"
            class="form-input"
            :maxlength="20"
          />
        </view>

        <view class="form-item">
          <input 
            v-model="formInline.password" 
            type="password"
            placeholder="请输入密码"
            class="form-input"
            :maxlength="20"
            password
          />
        </view>

        <view class="form-item">
          <input 
            v-model="formInline.confirmPassword" 
            type="password"
            placeholder="请确认密码"
            class="form-input"
            :maxlength="20"
            password
          />
        </view>

        <button class="register-btn" @tap="handleRegister">注册</button>
      </view>

      <view class="login-link">
        <text>已有账号？</text>
        <text class="link" @tap="goToLogin">立即登录</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const formInline = ref({
  username: '',
  password: '',
  confirmPassword: '',
  role: ''
})

const roles = [
  { label: '用户', value: 'user' },
  { label: '管理员', value: 'admin' }
]

const roleIndex = ref(0)

const handleRoleChange = (e) => {
  roleIndex.value = e.detail.value
  formInline.value.role = roles[roleIndex.value].value
}

const handleRegister = async () => {
  // 表单验证
  if (!formInline.value.role) {
    uni.showToast({
      title: '请选择注册身份',
      icon: 'none'
    })
    return
  }
  
  if (!formInline.value.username) {
    uni.showToast({
      title: '请输入用户名',
      icon: 'none'
    })
    return
  }
  
  if (formInline.value.username.length < 3) {
    uni.showToast({
      title: '用户名长度不能小于3个字符',
      icon: 'none'
    })
    return
  }
  
  if (!formInline.value.password) {
    uni.showToast({
      title: '请输入密码',
      icon: 'none'
    })
    return
  }
  
  if (formInline.value.password.length < 6) {
    uni.showToast({
      title: '密码长度不能小于6个字符',
      icon: 'none'
    })
    return
  }

  if (formInline.value.password !== formInline.value.confirmPassword) {
    uni.showToast({
      title: '两次输入的密码不一致',
      icon: 'none'
    })
    return
  }

  try {
    // 这里添加注册API调用
    // const res = await register(formInline.value)
    
    uni.showToast({
      title: '注册成功',
      icon: 'success'
    })
    
    // 注册成功后跳转到登录页
    setTimeout(() => {
      uni.navigateBack()
    }, 1500)
  } catch (err) {
    uni.showToast({
      title: err.message || '注册失败',
      icon: 'none'
    })
  }
}

const goToLogin = () => {
  uni.navigateBack()
}
</script>

<style>
.register-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f7fa;
  padding: 30rpx;
}

.register-card {
  width: 100%;
  max-width: 800rpx;
  background-color: #ffffff;
  border-radius: 16rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
  border: 6rpx solid #000000;
}

.card-header {
  padding: 40rpx;
  text-align: center;
  border-bottom: 2rpx solid #eeeeee;
}

.header-text {
  font-size: 48rpx;
  font-weight: bold;
  color: #333333;
}

.register-form {
  padding: 40rpx;
}

.form-item {
  margin-bottom: 30rpx;
}

.role-picker {
  width: 100%;
  height: 88rpx;
  background-color: #f5f5f5;
  border-radius: 8rpx;
  padding: 0 20rpx;
}

.picker-content {
  height: 88rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 32rpx;
  color: #333333;
}

.form-input {
  width: 100%;
  height: 88rpx;
  background-color: #f5f5f5;
  border-radius: 8rpx;
  padding: 0 20rpx;
  font-size: 32rpx;
}

.register-btn {
  width: 100%;
  height: 88rpx;
  line-height: 88rpx;
  background-color: #007AFF;
  color: #ffffff;
  font-size: 32rpx;
  border-radius: 44rpx;
  margin-top: 40rpx;
}

.login-link {
  text-align: center;
  padding: 30rpx;
  font-size: 28rpx;
  color: #666666;
}

.link {
  color: #007AFF;
  margin-left: 10rpx;
}

/* 图标字体 */
@font-face {
  font-family: 'iconfont';
  src: url('//at.alicdn.com/t/font_xxx.woff2') format('woff2');
}

.iconfont {
  font-family: 'iconfont';
}

.icon-arrow-down:before { content: '\e6e9'; }
</style> 