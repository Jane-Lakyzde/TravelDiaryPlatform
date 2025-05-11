<template>
  <view class="insta-home">
    <!-- 顶部栏 -->
    <view class="insta-header">
      <text class="insta-username">{{ userInfo.email }}</text>
      <view class="insta-header-icons">
        <text class="iconfont icon-1"></text>
        <text class="iconfont icon-2"></text>
        <text class="iconfont icon-3" @tap="handleLogout"></text>
      </view>
    </view>

    <!-- 头像与统计 -->
    <view class="insta-profile-row">
      <view class="insta-avatar-box">
        <image class="insta-avatar" :src="userInfo.avatar" />
      </view>
      <view class="insta-stats">
        <view class="insta-stat"><text class="stat-num">{{ userInfo.posts }}</text><text class="stat-label">帖子</text></view>
        <view class="insta-stat"><text class="stat-num">{{ userInfo.followers }}</text><text class="stat-label">粉丝</text></view>
        <view class="insta-stat"><text class="stat-num">{{ userInfo.following }}</text><text class="stat-label">关注</text></view>
      </view>
    </view>
    <view class="insta-nickname">{{ userInfo.username }}</view>
    <view class="insta-bio">{{ userInfo.bio }}</view>
    <view class="insta-btn-row">
      <button class="insta-btn-edit">编辑主页</button>
      <button class="insta-btn-share">分享主页</button>
      <button class="insta-btn-add"><text class="iconfont icon-add"></text></button>
    </view>

    <!-- 发现用户推荐 -->
    <view class="insta-recommend-row">
      <text class="insta-recommend-title">发现用户</text>
      <text class="insta-recommend-more">显示全部</text>
    </view>
    <scroll-view class="insta-recommend-list" scroll-x>
      <view
        v-for="user in recommendedUsers"
        :key="user.id"
        class="insta-recommend-card"
      >
        <image :src="user.avatar" class="recommend-avatar" />
        <text class="recommend-name">{{ user.username }}</text>
        <text class="recommend-desc">{{ user.desc }}</text>
        <button class="recommend-btn">关注</button>
      </view>
      <!-- 尾部留白 -->
      <view style="width: 30rpx; flex-shrink: 0;"></view>
    </scroll-view>

    <!-- 我的帖子/视频 tab -->
    <view class="insta-tab-row">
      <view
        class="insta-tab-btn"
        :class="{ active: activeTab === 'post' }"
        @tap="activeTab = 'post'"
      >
        <text class="iconfont">图标</text>
        <text>帖子</text>
      </view>
      <view
        class="insta-tab-btn"
        :class="{ active: activeTab === 'video' }"
        @tap="activeTab = 'video'"
      >
        <text class="iconfont">图标</text>
        <text>视频</text>
      </view>
    </view>

    <!-- 九宫格内容 -->
    <view v-if="activeTab === 'post'" class="insta-posts-grid">
      <image
        v-for="img in myPosts"
        :key="img.id"
        :src="img.images[0]"
        class="insta-post-img"
      />
    </view>
    <view v-else class="insta-posts-grid">
      <view
        v-for="video in myVideos"
        :key="video.id"
        class="insta-post-img insta-video-thumb"
      >
        <image :src="video.cover" class="video-cover" />
        <view class="video-icon"><text class="iconfont">▶</text></view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const activeTab = ref('post')

// 从 Vuex 获取用户信息
const userInfo = computed(() => store.getters['user/userInfo'])

const recommendedUsers = ref([
  { id: 1, avatar: 'https://placeholder.com/80x80', username: 'xiaox.iao04', desc: '已关注 kelsey041121' },
  { id: 2, avatar: 'https://placeholder.com/80x80', username: 'Luna', desc: '为你推荐' },
  { id: 3, avatar: 'https://placeholder.com/80x80', username: 'Cat', desc: '粉丝推荐' }
])

const myPosts = ref([
  { id: 1, images: ['https://placeholder.com/300x300'] },
  { id: 2, images: ['https://placeholder.com/300x300'] },
  { id: 3, images: ['https://placeholder.com/300x300'] }
])

const myVideos = ref([
  { id: 1, cover: 'https://placeholder.com/300x300' },
  { id: 2, cover: 'https://placeholder.com/300x300' }
])

// 退出登录方法
const handleLogout = () => {
  uni.showModal({
    title: '提示',
    content: '确定要退出登录吗？',
    success: (res) => {
      if (res.confirm) {
        store.dispatch('user/logout')
        uni.reLaunch({
          url: '/pages/login/login'
        })
      }
    }
  })
}
</script>

<style>
.insta-home { background: #fff; min-height: 100vh; }
.insta-header {
  display: flex; justify-content: space-between; align-items: center;
  padding: 30rpx 30rpx 0 30rpx;
}
.insta-username { font-size: 36rpx; font-weight: bold; }
.insta-header-icons text { font-size: 40rpx; margin-left: 30rpx; }
.insta-profile-row { display: flex; align-items: center; padding: 30rpx; }
.insta-avatar-box { position: relative; }
.insta-avatar { width: 140rpx; height: 140rpx; border-radius: 50%; }
.insta-avatar-note {
  position: absolute; left: 0; top: 0; background: #fff; color: #888;
  font-size: 22rpx; border-radius: 20rpx; padding: 4rpx 16rpx;
}
.insta-stats { display: flex; margin-left: 60rpx; }
.insta-stat { align-items: center; margin-right: 50rpx; }
.stat-num { font-size: 36rpx; font-weight: bold; text-align: center; }
.stat-label { font-size: 24rpx; color: #888; text-align: center; }
.insta-nickname { font-size: 30rpx; font-weight: bold; margin-left: 30rpx; }
.insta-bio { font-size: 26rpx; color: #666; margin-left: 30rpx; margin-bottom: 20rpx; }
.insta-btn-row { display: flex; margin: 0 30rpx 20rpx 30rpx; }
.insta-btn-edit, .insta-btn-share {
  flex: 1; margin-right: 20rpx; background: #f5f5f5; color: #222; border-radius: 16rpx;
  font-size: 28rpx; height: 60rpx; line-height: 60rpx;
}
.insta-btn-share { margin-right: 0; }
.insta-btn-add { width: 60rpx; height: 60rpx; border-radius: 50%; background: #f5f5f5; margin-left: 20rpx; }
.insta-recommend-row { display: flex; justify-content: space-between; align-items: center; margin: 0 30rpx 10rpx 30rpx; }
.insta-recommend-title { font-size: 28rpx; font-weight: bold; }
.insta-recommend-more { color: #409eff; font-size: 26rpx; }
.insta-recommend-list {
  display: flex;
  flex-direction: row;
  padding-left: 30rpx;
  margin-bottom: 20rpx;
  /* 让scroll-view内容高度自适应卡片 */
  height: 220rpx;
}
.insta-recommend-card {
  width: 180rpx;
  height: 220rpx;
  background: #fff;
  border-radius: 20rpx;
  box-shadow: 0 2rpx 8rpx #eee;
  margin-right: 20rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.recommend-avatar {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  margin-bottom: 10rpx;
}
.recommend-name {
  font-size: 26rpx;
  font-weight: bold;
  margin-bottom: 2rpx;
}
.recommend-desc {
  font-size: 22rpx;
  color: #888;
  margin-bottom: 10rpx;
}
.recommend-btn {
  width: 120rpx;
  height: 44rpx;
  background: #0099ff;
  color: #fff;
  border-radius: 22rpx;
  font-size: 24rpx;
  line-height: 44rpx;
  text-align: center;
  margin-top: 4rpx;
  padding: 0;
}

/* tab切换区 */
.insta-tab-row {
  display: flex;
  border-top: 1rpx solid #eee;
  border-bottom: 1rpx solid #eee;
  margin-bottom: 10rpx;
  background: #fff;
}
.insta-tab-btn {
  flex: 1;
  text-align: center;
  padding: 20rpx 0;
  font-size: 28rpx;
  color: #888;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
}
.insta-tab-btn.active {
  color: #222;
  font-weight: bold;
}
.insta-tab-btn.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 40rpx;
  height: 4rpx;
  background-color: #222;
  border-radius: 2rpx;
}

/* 九宫格内容 */
.insta-posts-grid {
  display: flex;
  flex-wrap: wrap;
  margin: 0 10rpx 100rpx 10rpx;
}
.insta-post-img {
  width: 25%;
  height: 25%;
  aspect-ratio: 1/1;
  margin: 1%;
  border-radius: 8rpx;
  object-fit: cover;
  background: #eee;
  position: relative;
}
.insta-video-thumb .video-cover {
  width: 25%;
  height: 25%;
  border-radius: 8rpx;
  object-fit: cover;
}
.insta-video-thumb .video-icon {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 48rpx;
  color: #fff;
  background: rgba(0,0,0,0.3);
  border-radius: 50%;
  width: 60rpx;
  height: 60rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>