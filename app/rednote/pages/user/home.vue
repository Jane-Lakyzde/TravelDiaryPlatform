<!-- pages/user/home.vue -->
<template>
  <view class="home-container">
    <!-- 顶部导航栏 -->
    <view class="header">
      <view class="nav-left">
        <input
          v-model="searchText"
          placeholder="搜索帖子"
          class="search-input"
          @confirm="handleSearch"
        />
      </view>
      <view class="nav-right">
        <button type="primary" @tap="handleCreatePost" class="post-btn">
          <text class="iconfont icon-plus"></text>发帖
        </button>
      </view>
    </view>

    <view class="posts-container">
      <view class="posts-grid">
        <!-- 左侧帖子列表 -->
        <view class="posts-column">
          <view v-for="post in leftPosts" :key="post.id" class="post-card">
            <view class="post-header">
              <image :src="post.avatar" class="avatar" mode="aspectFill" />
              <view class="user-info">
                <text class="username">{{ post.username }}</text>
                <text class="post-time">{{ post.time }}</text>
              </view>
            </view>
            <view class="post-content">
              <text class="post-text">{{ post.content }}</text>
              <view class="image-list">
                <image
                  v-for="(image, index) in post.images"
                  :key="index"
                  :src="image"
                  class="post-image"
                  mode="aspectFill"
                  @tap="previewImage(post.images, index)"
                />
              </view>
            </view>
            <view class="post-actions">
              <button
                :class="['action-btn', post.isLiked ? 'active' : '']"
                @tap="handleLike(post)"
              >
                <text class="iconfont icon-star"></text>
                <text>{{ post.likes }}</text>
              </button>
              <button class="action-btn" @tap="handleComment(post)">
                <text class="iconfont icon-comment"></text>
                <text>{{ post.comments }}</text>
              </button>
              <button class="action-btn" @tap="handleShare(post)">
                <text class="iconfont icon-share"></text>
                <text>分享</text>
              </button>
            </view>
          </view>
        </view>

        <!-- 右侧帖子列表 -->
        <view class="posts-column">
          <view v-for="post in rightPosts" :key="post.id" class="post-card">
            <view class="post-header">
              <image :src="post.avatar" class="avatar" mode="aspectFill" />
              <view class="user-info">
                <text class="username">{{ post.username }}</text>
                <text class="post-time">{{ post.time }}</text>
              </view>
            </view>
            <view class="post-content">
              <text class="post-text">{{ post.content }}</text>
              <view class="image-list">
                <image
                  v-for="(image, index) in post.images"
                  :key="index"
                  :src="image"
                  class="post-image"
                  mode="aspectFill"
                  @tap="previewImage(post.images, index)"
                />
              </view>
            </view>
            <view class="post-actions">
              <button
                :class="['action-btn', post.isLiked ? 'active' : '']"
                @tap="handleLike(post)"
              >
                <text class="iconfont icon-star"></text>
                <text>{{ post.likes }}</text>
              </button>
              <button class="action-btn" @tap="handleComment(post)">
                <text class="iconfont icon-comment"></text>
                <text>{{ post.comments }}</text>
              </button>
              <button class="action-btn" @tap="handleShare(post)">
                <text class="iconfont icon-share"></text>
                <text>分享</text>
              </button>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { initialPosts } from '../../data/posts.js'

const searchText = ref('')
const leftPosts = ref([])
const rightPosts = ref([])

// 处理搜索
const handleSearch = () => {
  console.log('搜索内容:', searchText.value)
  // 这里添加搜索逻辑
}

// 处理点赞
const handleLike = (post) => {
  post.isLiked = !post.isLiked
  post.likes += post.isLiked ? 1 : -1
}

// 处理评论
const handleComment = (post) => {
  console.log('评论帖子:', post.id)
  // 这里添加评论逻辑
}

// 处理分享
const handleShare = (post) => {
  uni.share({
    provider: 'weixin',
    scene: 'WXSceneSession',
    type: 0,
    title: post.content,
    success: function (res) {
      console.log('分享成功:', res)
    },
    fail: function (err) {
      console.log('分享失败:', err)
    }
  })
}

// 处理发帖
const handleCreatePost = () => {
  uni.navigateTo({
    url: '/pages/user/post'
  })
}

// 预览图片
const previewImage = (images, current) => {
  uni.previewImage({
    urls: images,
    current: images[current]
  })
}

onMounted(() => {
  // 模拟从数据库获取数据
  // 如果获取失败，使用初始数据
  const allPosts = initialPosts
  // 将帖子平均分配到左右两侧
  const midIndex = Math.ceil(allPosts.length / 2)
  leftPosts.value = allPosts.slice(0, midIndex)
  rightPosts.value = allPosts.slice(midIndex)
})
</script>

<style>
.home-container {
  min-height: 100vh;
  background-color: #f5f7fa;
  display: flex;
  flex-direction: column;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  padding: 20rpx;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  box-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.1);
}

.search-input {
  width: 400rpx;
  height: 60rpx;
  background-color: #f5f5f5;
  border-radius: 30rpx;
  padding: 0 20rpx;
  font-size: 28rpx;
}

.post-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60rpx;
  padding: 0 20rpx;
  font-size: 28rpx;
}

.posts-container {
  margin-top: 100rpx;
  padding: 20rpx;
}

.posts-grid {
  display: flex;
  justify-content: space-between;
}

.posts-column {
  width: 48%;
}

.post-card {
  background-color: #ffffff;
  border-radius: 12rpx;
  margin-bottom: 20rpx;
  padding: 20rpx;
  box-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.1);
}

.post-header {
  display: flex;
  align-items: center;
  margin-bottom: 20rpx;
}

.avatar {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
}

.user-info {
  margin-left: 20rpx;
}

.username {
  font-size: 28rpx;
  font-weight: bold;
  color: #333333;
}

.post-time {
  font-size: 24rpx;
  color: #999999;
  margin-top: 4rpx;
}

.post-content {
  margin-bottom: 20rpx;
}

.post-text {
  font-size: 28rpx;
  color: #333333;
  line-height: 1.5;
}

.image-list {
  display: flex;
  flex-wrap: wrap;
  margin-top: 20rpx;
}

.post-image {
  width: 220rpx;
  height: 220rpx;
  margin-right: 10rpx;
  margin-bottom: 10rpx;
  border-radius: 8rpx;
}

.post-actions {
  display: flex;
  justify-content: space-around;
  border-top: 1rpx solid #eeeeee;
  padding-top: 20rpx;
}

.action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  font-size: 24rpx;
  color: #666666;
  padding: 0;
}

.action-btn.active {
  color: #007AFF;
}

.action-btn text {
  margin-left: 8rpx;
}

/* 图标字体 */
@font-face {
  font-family: 'iconfont';
  src: url('//at.alicdn.com/t/font_xxx.woff2') format('woff2');
}

.iconfont {
  font-family: 'iconfont';
  font-size: 32rpx;
}

.icon-plus:before { content: '\e6da'; }
.icon-star:before { content: '\e7df'; }
.icon-comment:before { content: '\e8e8'; }
.icon-share:before { content: '\e8b8'; }
</style> 