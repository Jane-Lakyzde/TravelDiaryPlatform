<!-- pages/user/msg.vue -->
<template>
  <view class="msg-container">
    <!-- 顶部导航栏 -->
    <view class="header">
      <view class="nav-left">
        <input
          v-model="searchText"
          placeholder="搜索消息"
          class="search-input"
          @confirm="handleSearch"
        />
      </view>
      <view class="nav-right">
        <button class="create-btn" @tap="handleCreateChat">
          <text class="iconfont icon-plus"></text>
          <text>发起聊天</text>
        </button>
      </view>
    </view>

    <scroll-view class="content" scroll-y>
      <view class="chat-list">
        <view 
          v-for="chat in chatList" 
          :key="chat.id" 
          class="chat-item"
          @tap="handleChat(chat)"
        >
          <view class="chat-avatar">
            <image :src="chat.avatar" mode="aspectFill" />
            <view v-if="chat.unread" class="unread-badge">{{ chat.unread }}</view>
          </view>
          <view class="chat-info">
            <view class="chat-header">
              <text class="chat-name">{{ chat.name }}</text>
              <text class="chat-time">{{ chat.time }}</text>
            </view>
            <view class="chat-preview">
              <text class="chat-message">{{ chat.lastMessage }}</text>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>

    <!-- 新建聊天弹窗 -->
    <uni-popup ref="createPopup" type="center">
      <view class="create-popup">
        <view class="popup-header">
          <text class="popup-title">发起聊天</text>
          <text class="close-btn" @tap="createDialogVisible = false">×</text>
        </view>
        <view class="popup-content">
          <view class="search-box">
            <input
              v-model="searchUserText"
              placeholder="搜索用户"
              class="search-input"
              @input="handleSearchUser"
            />
          </view>
          <scroll-view class="user-list" scroll-y>
            <view 
              v-for="user in searchResults" 
              :key="user.id"
              class="user-item"
              @tap="handleSelectUser(user)"
            >
              <image :src="user.avatar" class="user-avatar" mode="aspectFill" />
              <view class="user-info">
                <text class="user-name">{{ user.username }}</text>
                <text class="user-id">ID: {{ user.id }}</text>
              </view>
            </view>
          </scroll-view>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const searchText = ref('')
const createDialogVisible = ref(false)
const searchUserText = ref('')
const searchResults = ref([])

const chatList = ref([
  {
    id: 'chat001',
    name: '张三',
    avatar: 'https://placeholder.com/80x80',
    lastMessage: '你好，最近怎么样？',
    time: '10:30',
    unread: 2
  },
  {
    id: 'chat002',
    name: '李四',
    avatar: 'https://placeholder.com/80x80',
    lastMessage: '周末有空一起吃饭吗？',
    time: '昨天',
    unread: 0
  },
  {
    id: 'chat003',
    name: '王五',
    avatar: 'https://placeholder.com/80x80',
    lastMessage: '好的，没问题！',
    time: '周一',
    unread: 0
  }
])

// 处理搜索
const handleSearch = () => {
  uni.showToast({
    title: '搜索功能开发中',
    icon: 'none'
  })
}

// 处理发起聊天
const handleCreateChat = () => {
  createDialogVisible.value = true
}

// 处理搜索用户
const handleSearchUser = () => {
  // 这里添加搜索用户的逻辑
  searchResults.value = [
    {
      id: 'user001',
      username: '张三',
      avatar: 'https://placeholder.com/80x80'
    },
    {
      id: 'user002',
      username: '李四',
      avatar: 'https://placeholder.com/80x80'
    }
  ]
}

// 处理选择用户
const handleSelectUser = (user) => {
  createDialogVisible.value = false
  uni.navigateTo({
    url: `/pages/chat/detail?id=${user.id}`
  })
}

// 处理进入聊天
const handleChat = (chat) => {
  uni.navigateTo({
    url: `/pages/chat/detail?id=${chat.id}`
  })
}
</script>

<style>
.msg-container {
  min-height: 100vh;
  background-color: #f5f7fa;
  display: flex;
  flex-direction: column;
}

.header {
  background-color: #ffffff;
  box-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.1);
  padding: 20rpx;
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
}

.nav-left {
  flex: 1;
  margin-right: 20rpx;
}

.search-input {
  width: 100%;
  height: 72rpx;
  background-color: #f5f5f5;
  border-radius: 36rpx;
  padding: 0 30rpx;
  font-size: 28rpx;
}

.create-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #007AFF;
  color: #ffffff;
  border-radius: 36rpx;
  padding: 0 30rpx;
  height: 72rpx;
  font-size: 28rpx;
}

.create-btn text {
  margin-left: 8rpx;
}

.content {
  margin-top: 112rpx;
  flex: 1;
}

.chat-list {
  padding: 20rpx;
}

.chat-item {
  display: flex;
  align-items: center;
  padding: 20rpx;
  background-color: #ffffff;
  border-radius: 12rpx;
  margin-bottom: 20rpx;
}

.chat-avatar {
  position: relative;
  margin-right: 20rpx;
}

.chat-avatar image {
  width: 100rpx;
  height: 100rpx;
  border-radius: 50%;
}

.unread-badge {
  position: absolute;
  top: -6rpx;
  right: -6rpx;
  background-color: #ff3b30;
  color: #ffffff;
  font-size: 24rpx;
  min-width: 36rpx;
  height: 36rpx;
  border-radius: 18rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 8rpx;
}

.chat-info {
  flex: 1;
}

.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8rpx;
}

.chat-name {
  font-size: 32rpx;
  font-weight: bold;
  color: #333333;
}

.chat-time {
  font-size: 24rpx;
  color: #999999;
}

.chat-preview {
  display: flex;
  align-items: center;
}

.chat-message {
  font-size: 28rpx;
  color: #666666;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.create-popup {
  background-color: #ffffff;
  border-radius: 12rpx;
  width: 600rpx;
  max-width: 90vw;
}

.popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30rpx;
  border-bottom: 1rpx solid #eeeeee;
}

.popup-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333333;
}

.close-btn {
  font-size: 40rpx;
  color: #999999;
  padding: 0 20rpx;
}

.popup-content {
  padding: 30rpx;
}

.search-box {
  margin-bottom: 20rpx;
}

.user-list {
  max-height: 600rpx;
}

.user-item {
  display: flex;
  align-items: center;
  padding: 20rpx 0;
  border-bottom: 1rpx solid #eeeeee;
}

.user-avatar {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  margin-right: 20rpx;
}

.user-info {
  flex: 1;
}

.user-name {
  font-size: 28rpx;
  color: #333333;
  margin-bottom: 4rpx;
  display: block;
}

.user-id {
  font-size: 24rpx;
  color: #999999;
}

/* 图标字体 */
@font-face {
  font-family: 'iconfont';
  src: url('//at.alicdn.com/t/font_xxx.woff2') format('woff2');
}

.iconfont {
  font-family: 'iconfont';
}

.icon-plus:before { content: '\e6da'; }
</style> 