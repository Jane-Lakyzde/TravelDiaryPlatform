<template>
  <view class="home">
    <!-- 顶部栏 -->
    <view class="header">
      <text class="username">{{ userInfo.email }}</text>
      <view class="header-icons">
        <text class="iconfont icon-1"></text>
        <text class="iconfont icon-2"></text>
        <text class="iconfont icon-3" @tap="handleLogout"></text>
      </view>
    </view>

    <!-- 头像与统计 -->
    <view class="profile-row">
      <view class="avatar-box" @tap="chooseAvatar">
        <image class="avatar" :src="userInfo.avatar || '/static/images/touxiang.jpg'" />
      </view>
      <view class="stats">
        <view class="stat"><text class="stat-num">{{ userInfo.posts || 0 }}</text><text class="stat-label">帖子</text></view>
        <view class="stat"><text class="stat-num">{{ userInfo.followers || 0 }}</text><text class="stat-label">粉丝</text></view>
        <view class="stat"><text class="stat-num">{{ userInfo.following || 0 }}</text><text class="stat-label">关注</text></view>
      </view>
    </view>
    <view class="nickname">{{ userInfo.username }}</view>
    <view class="bio">{{ userInfo.bio || '这个人很懒，什么都没写~' }}</view>
    <view class="btn-row">
      <button class="btn-edit" @tap="handleEditProfile">编辑主页</button>
      <button class="btn-share">分享主页</button>
      <button class="btn-add" @tap="() => uni.navigateTo({ url: '/pages/user/post' })">
        <text class="iconfont icon-add"></text>
      </button>
    </view>

    <!-- 我的帖子/视频 tab -->
    <view class="tab-row">
      <view
        class="tab-btn"
        :class="{ active: activeTab === 'post' }"
        @tap="activeTab = 'post'"
      >
        <text class="iconfont icon-tupian"></text>
      </view>
      <view
        class="tab-btn"
        :class="{ active: activeTab === 'video' }"
        @tap="activeTab = 'video'"
      >
        <text class="iconfont icon-shipin"></text>
      </view>
    </view>

    <!-- 九宫格内容 -->
    <view v-if="activeTab === 'post'" class="posts-grid">
      <image
        v-for="post in myPosts"
        :key="post.id"
        :src="post.images[0]"
        class="post-img"
        @tap="viewPostDetail(post.id)"
      />
    </view>
    <view v-else class="posts-grid">
      <view
        v-for="video in myVideos"
        :key="video.id"
        class="post-img video-thumb"
      >
        <image :src="video.cover" class="video-cover" />
        <view class="video-icon"><text class="iconfont">▶</text></view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useUserStore } from '@/store/modules/user'
import { usePostStore } from '@/store/modules/post'

const userStore = useUserStore()
const postStore = usePostStore()
const activeTab = ref('post')

// 从 Pinia 获取用户信息
const userInfo = computed(() => userStore.getUserInfo)

// 获取我的帖子列表
const myPosts = computed(() => {
  return postStore.posts.filter(post => post.author.username === userInfo.value.username)
})

// 编辑主页
const handleEditProfile = () => {
  uni.showActionSheet({
    itemList: ['编辑个人资料', '修改头像'],
    success: (res) => {
      switch (res.tapIndex) {
        case 0:
          uni.navigateTo({ url: '/pages/change/editprofile' })
          break
        case 1:
          chooseAvatar()
          break
      }
    }
  })
}

// 选择头像
const chooseAvatar = () => {
  uni.chooseImage({
    count: 1,
    sizeType: ['compressed'],
    sourceType: ['album', 'camera'],
    success: (res) => {
      const tempFilePath = res.tempFilePaths[0]
      // 更新用户头像
      userStore.updateUserInfo({
        ...userInfo.value,
        avatar: tempFilePath
      })
    }
  })
}

// 退出登录方法
const handleLogout = () => {
  uni.showModal({
    title: '提示',
    content: '确定要退出登录吗？',
    success: (res) => {
      if (res.confirm) {
        userStore.logout()
        uni.reLaunch({
          url: '/pages/login/login'
        })
      }
    }
  })
}

// 查看帖子详情
const viewPostDetail = (postId) => {
  uni.navigateTo({
    url: `/pages/post/detail?id=${postId}`
  })
}
</script>

<style>
.home { background: #fff; min-height: 100vh; }
.header {
  display: flex; justify-content: space-between; align-items: center;
  padding: 30rpx 30rpx 0 30rpx;
}
.username { font-size: 36rpx; font-weight: bold; }
.header-icons text { font-size: 40rpx; margin-left: 30rpx; }
.profile-row { display: flex; align-items: center; padding: 30rpx; }
.avatar-box { position: relative; }
.avatar { width: 140rpx; height: 140rpx; border-radius: 50%; }
.avatar-note {
  position: absolute; left: 0; top: 0; background: #fff; color: #888;
  font-size: 22rpx; border-radius: 20rpx; padding: 4rpx 16rpx;
}
.stats { display: flex; margin-left: 60rpx; }
.stat { align-items: center; margin-right: 50rpx; }
.stat-num { font-size: 36rpx; font-weight: bold; text-align: center; }
.stat-label { font-size: 24rpx; color: #888; text-align: center; }
.nickname { font-size: 30rpx; font-weight: bold; margin-left: 30rpx; }
.bio { font-size: 26rpx; color: #666; margin-left: 30rpx; margin-bottom: 20rpx; }
.btn-row { display: flex; margin: 0 30rpx 20rpx 30rpx; }
.btn-edit, .btn-share {
  flex: 1; margin-right: 20rpx; background: #f5f5f5; color: #222; border-radius: 16rpx;
  font-size: 28rpx; height: 60rpx; line-height: 60rpx;
}
.btn-share { margin-right: 0; }
.btn-add { width: 60rpx; height: 60rpx; border-radius: 50%; background: #f5f5f5; margin-left: 20rpx; }

/* tab切换区 */
.tab-row {
  display: flex;
  border-top: 1rpx solid #eee;
  border-bottom: 1rpx solid #eee;
  margin-bottom: 10rpx;
  background: #fff;
}
.tab-btn {
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
.tab-btn.active {
  color: #222;
  font-weight: bold;
}
.tab-btn.active::after {
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
.posts-grid {
  display: flex;
  flex-wrap: wrap;
  margin: 0 10rpx 100rpx 10rpx;
}
.post-img {
  width: 25%;
  height: 25%;
  aspect-ratio: 1/1;
  margin: 1%;
  border-radius: 8rpx;
  object-fit: cover;
  background: #eee;
  position: relative;
}
.video-thumb .video-cover {
  width: 25%;
  height: 25%;
  border-radius: 8rpx;
  object-fit: cover;
}
.video-thumb .video-icon {
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
/* 图标字体 */
@font-face {
  font-family: 'iconfont';
  src: url('/static/fonts/iconfont.ttf') format('woff2');
}
.iconfont {
  font-family: 'iconfont';
  font-size: 32rpx;
}
.icon-tupian ::before{ content: '\e609'}
.icon-shipin ::before{ content: '\e64a'}
</style>