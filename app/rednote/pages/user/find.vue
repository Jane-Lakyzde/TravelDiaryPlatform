<template>
  <view class="find-container">
    <view class="header">
      <text class="title">发现</text>
    </view>

    <scroll-view class="recommend-container" scroll-y>
      <view v-for="user in recommendedUsers" :key="user.id" class="user-card">
        <view class="user-info">
          <image :src="user.avatar" class="avatar" mode="aspectFill" />
          <view class="user-details">
            <text class="username">{{ user.username }}</text>
            <text class="user-id">ID: {{ user.id }}</text>
            <text class="user-bio">{{ user.bio }}</text>
          </view>
        </view>
        <view class="user-stats">
          <view class="stat-item">
            <text class="stat-value">{{ user.posts }}</text>
            <text class="stat-label">帖子</text>
          </view>
          <view class="stat-item">
            <text class="stat-value">{{ user.followers }}</text>
            <text class="stat-label">粉丝</text>
          </view>
          <view class="stat-item">
            <text class="stat-value">{{ user.following }}</text>
            <text class="stat-label">关注</text>
          </view>
        </view>
        <view class="user-actions">
          <button 
            :class="['follow-btn', user.isFollowing ? 'following' : '']"
            @tap="handleFollow(user)"
          >
            {{ user.isFollowing ? '已关注' : '关注' }}
          </button>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const recommendedUsers = ref([
  {
    id: 'user001',
    username: '摄影爱好者',
    avatar: 'https://placeholder.com/60x60',
    bio: '热爱摄影，分享生活中的美好瞬间',
    posts: 128,
    followers: 1024,
    following: 256,
    isFollowing: false
  },
  {
    id: 'user002',
    username: '美食达人',
    avatar: 'https://placeholder.com/60x60',
    bio: '美食探店，分享美味',
    posts: 256,
    followers: 2048,
    following: 512,
    isFollowing: false
  },
  {
    id: 'user003',
    username: '旅行日记',
    avatar: 'https://placeholder.com/60x60',
    bio: '记录每一次旅行的美好',
    posts: 64,
    followers: 512,
    following: 128,
    isFollowing: false
  },
  {
    id: 'user004',
    username: '健身教练',
    avatar: 'https://placeholder.com/60x60',
    bio: '分享健身知识和经验',
    posts: 96,
    followers: 768,
    following: 192,
    isFollowing: false
  },
  {
    id: 'user005',
    username: '读书笔记',
    avatar: 'https://placeholder.com/60x60',
    bio: '分享读书心得和推荐',
    posts: 48,
    followers: 384,
    following: 96,
    isFollowing: false
  }
])

const handleFollow = (user) => {
  user.isFollowing = !user.isFollowing
  // 这里可以添加关注/取消关注的API调用
  uni.showToast({
    title: user.isFollowing ? '关注成功' : '已取消关注',
    icon: 'none'
  })
}
</script>

<style>
.find-container {
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
  justify-content: center;
}

.title {
  font-size: 36rpx;
  font-weight: bold;
  color: #333333;
}

.recommend-container {
  margin-top: 100rpx;
  margin-left: 50rpx;
  flex: 1;
  padding: 20rpx;
}

.user-card {
  background-color: #ffffff;
  border-radius: 12rpx;
  margin-bottom: 20rpx;
  padding: 20rpx;
  box-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.1);
}

.user-info {
  display: flex;
  align-items: flex-start;
  margin-bottom: 30rpx;
}

.avatar {
  width: 120rpx;
  height: 120rpx;
  border-radius: 50%;
}

.user-details {
  margin-left: 30rpx;
  flex: 1;
}

.username {
  font-size: 32rpx;
  font-weight: bold;
  color: #333333;
  margin-bottom: 10rpx;
  display: block;
}

.user-id {
  font-size: 24rpx;
  color: #999999;
  margin-bottom: 10rpx;
  display: block;
}

.user-bio {
  font-size: 28rpx;
  color: #666666;
  display: block;
}

.user-stats {
  display: flex;
  justify-content: space-around;
  margin-bottom: 30rpx;
  padding: 20rpx 0;
  border-top: 1rpx solid #eeeeee;
  border-bottom: 1rpx solid #eeeeee;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-value {
  font-weight: bold;
  font-size: 32rpx;
  color: #333333;
}

.stat-label {
  font-size: 24rpx;
  color: #999999;
  margin-top: 4rpx;
}

.user-actions {
  display: flex;
  justify-content: center;
}

.follow-btn {
  width: 100%;
  height: 80rpx;
  line-height: 80rpx;
  text-align: center;
  border-radius: 40rpx;
  font-size: 28rpx;
  background-color: #007AFF;
  color: #ffffff;
}

.follow-btn.following {
  background-color: #f5f5f5;
  color: #666666;
}
</style>
