<template>
  <view class="edit-profile">
    <view class="form-group">
      <view class="form-item">
        <text class="label">用户名</text>
        <input v-model="form.username" class="input" placeholder="请输入用户名" />
      </view>
      <view class="form-item">
        <text class="label">个人简介</text>
        <textarea v-model="form.bio" class="textarea" placeholder="介绍一下自己吧" maxlength="100" />
        <text class="word-count">{{ form.bio.length }}/100</text>
      </view>
      <view class="form-item">
        <text class="label">邮箱</text>
        <input v-model="form.email" class="input" placeholder="请输入邮箱"  />
      </view>
    </view>

    <view class="btn-group">
      <button class="btn-save" @tap="handleSave">保存</button>
      <button class="btn-cancel" @tap="handleCancel">取消</button>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/store/modules/user'

const userStore = useUserStore()
const form = ref({
  username: '',
  bio: '',
  email: ''
})

onMounted(() => {
  const userInfo = userStore.getUserInfo()
  form.value = {
    username: userInfo.username || '',
    bio: userInfo.bio || '',
    email: userInfo.email || ''
  }
})

const handleSave = () => {
  if (!form.value.username.trim()) {
    uni.showToast({ title: '请输入用户名', icon: 'none' })
    return
  }

  // 更新用户信息
  userStore.updateUserInfo({
    ...userStore.getUserInfo(),
    username: form.value.username,
    bio: form.value.bio,
    email: form.value.email
  })
  uni.showToast({ title: '保存成功', icon: 'success' })
console.log(userStore.getUserInfo());

  setTimeout(() => {
    uni.navigateBack()
  }, 100)
}

const handleCancel = () => {
  uni.navigateBack()
}
</script>

<style>
.edit-profile {
  min-height: 100vh;
  background: #fff;
  padding: 30rpx;
}

.form-group {
  margin-bottom: 60rpx;
}

.form-item {
  margin-bottom: 40rpx;
  position: relative;
}

.label {
  display: block;
  font-size: 28rpx;
  color: #333;
  margin-bottom: 20rpx;
}

.input {
  width: 100%;
  height: 88rpx;
  background: #f5f5f5;
  border-radius: 44rpx;
  padding: 0 40rpx;
  font-size: 28rpx;
  color: #333;
}

.textarea {
  width: 100%;
  height: 200rpx;
  background: #f5f5f5;
  border-radius: 20rpx;
  padding: 20rpx 40rpx;
  font-size: 28rpx;
  color: #333;
}

.word-count {
  position: absolute;
  right: 20rpx;
  bottom: 20rpx;
  font-size: 24rpx;
  color: #999;
}

.btn-group {
  margin-top: 60rpx;
}

.btn-save, .btn-cancel {
  width: 100%;
  height: 88rpx;
  border-radius: 44rpx;
  font-size: 32rpx;
  margin-bottom: 30rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-save {
  background: #DB9EA2;
  color: #fff;
}

.btn-cancel {
  background: #f5f5f5;
  color: #666;
}
</style> 