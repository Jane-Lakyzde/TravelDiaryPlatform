<!-- pages/user/home.vue -->
<template>
  <view class="home-container">
    <!-- 侧边栏 -->
    <view class="sidebar" :class="{ 'sidebar-show': showSidebar }" @tap="closeSidebar">
      <view class="sidebar-content" @tap.stop>
        <!-- 顶部头像昵称 -->
        <view class="sidebar-header">
          <image class="sidebar-avatar" src="https://placeholder.com/80x80" mode="aspectFill" />
          <text class="sidebar-username">用户名</text>
        </view>
        <!-- 分组1 -->
        <view class="sidebar-group">
          <view class="sidebar-item" @tap="navigateTo('/pages/sidebar/discover-friends/index')">
            <text class="iconfont icon-friend"></text>
            <text>发现好友</text>
          </view>
          <view class="sidebar-item" @tap="navigateTo('/pages/sidebar/creator-center/index')">
            <text class="iconfont icon-creator"></text>
            <text>创作者中心</text>
          </view>
          <view class="sidebar-item" @tap="navigateTo('/pages/sidebar/drafts/index')">
            <text class="iconfont icon-draft"></text>
            <text>我的草稿</text>
          </view>
          <view class="sidebar-item" @tap="navigateTo('/pages/sidebar/comments/index')">
            <text class="iconfont icon-comment"></text>
            <text>我的评论</text>
          </view>
          <view class="sidebar-item" @tap="navigateTo('/pages/sidebar/history/index')">
            <text class="iconfont icon-history"></text>
            <text>浏览记录</text>
          </view>
        </view>
        <!-- 分组2 -->
        <view class="sidebar-group">
          <view class="sidebar-item" @tap="navigateTo('/pages/sidebar/orders/index')">
            <text class="iconfont icon-order"></text>
            <text>订单</text>
          </view>
          <view class="sidebar-item" @tap="navigateTo('/pages/sidebar/cart/index')">
            <text class="iconfont icon-cart"></text>
            <text>购物车</text>
          </view>
          <view class="sidebar-item" @tap="navigateTo('/pages/sidebar/wallet/index')">
            <text class="iconfont icon-wallet"></text>
            <text>钱包</text>
          </view>
        </view>
        <!-- 分组3 -->
        <view class="sidebar-group">
          <view class="sidebar-item" @tap="navigateTo('/pages/sidebar/miniapp/index')">
            <text class="iconfont icon-miniapp"></text>
            <text>小程序</text>
          </view>
          <view class="sidebar-item" @tap="navigateTo('/pages/sidebar/community-guidelines/index')">
            <text class="iconfont icon-guideline"></text>
            <text>社区公约</text>
          </view>
        </view>
        <!-- 底部固定按钮 -->
        <view class="sidebar-bottom">
          <view class="sidebar-bottom-item" @tap="navigateTo('/pages/sidebar/scan/index')">
            <text class="iconfont icon-scan"></text>
            <text>扫一扫</text>
          </view>
          <view class="sidebar-bottom-item" @tap="navigateTo('/pages/sidebar/support/index')">
            <text class="iconfont icon-support"></text>
            <text>帮助与客服</text>
          </view>
          <view class="sidebar-bottom-item" @tap="navigateTo('/pages/sidebar/settings/index')">
            <text class="iconfont icon-settings"></text>
            <text>设置</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 遮罩层 -->
    <view class="mask" v-if="showSidebar" @tap="closeSidebar"></view>

    <!-- 顶部导航栏 -->
    <view class="header">
      <view class="nav-left">
        <text class="iconfont icon-menu" @tap="toggleSidebar"></text>
      </view>
      <view class="nav-middle">
        <text 
          class="nav-title" 
          :class="{ active: activeTab === 'discover' }"
          @tap="switchTab('discover')"
        >发现</text>
        <text 
          class="nav-title" 
          :class="{ active: activeTab === 'follow' }"
          @tap="switchTab('follow')"
        >关注</text>
      </view>
      <view class="nav-right">
        <text class="iconfont icon-search" @tap="goToSearch"></text>
      </view>
    </view>

    <!-- 内容区域 -->
    <view class="content-container">
      <!-- 发现页面 -->
      <view v-if="activeTab === 'discover'" class="posts-container">
        <view class="masonry">
          <!-- 左列 -->
          <view class="masonry-column">
            <view v-for="post in leftPosts" :key="post.id" class="masonry-card">
              <image :src="post.cover" class="card-cover" />
              <view class="card-title">{{ post.title }}</view>
              <view class="card-bottom">
                <image :src="post.avatar" class="card-avatar" />
                <text class="card-author">{{ post.author }}</text>
                <text class="card-like iconfont icon-like"></text>
                <text class="card-like-num">{{ post.likes }}</text>
              </view>
            </view>
          </view>
          <!-- 右列 -->
          <view class="masonry-column">
            <view v-for="post in rightPosts" :key="post.id" class="masonry-card">
              <image :src="post.cover" class="card-cover" />
              <view class="card-title">{{ post.title }}</view>
              <view class="card-bottom">
                <image :src="post.avatar" class="card-avatar" />
                <text class="card-author">{{ post.author }}</text>
                <text class="card-like iconfont icon-like"></text>
                <text class="card-like-num">{{ post.likes }}</text>
              </view>
            </view>
          </view>
        </view>
      </view>

      <!-- 关注页面 -->
      <view v-else class="follow-container">
        <view class="masonry">
          <!-- 左列 -->
          <view class="masonry-column">
            <view v-for="post in leftPosts" :key="post.id" class="masonry-card">
              <image :src="post.cover" class="card-cover" />
              <view class="card-title">{{ post.title }}</view>
              <view class="card-bottom">
                <image :src="post.avatar" class="card-avatar" />
                <text class="card-author">{{ post.author }}</text>
                <text class="card-like iconfont icon-like"></text>
                <text class="card-like-num">{{ post.likes }}</text>
              </view>
            </view>
          </view>
          <!-- 右列 -->
          <view class="masonry-column">
            <view v-for="post in rightPosts" :key="post.id" class="masonry-card">
              <image :src="post.cover" class="card-cover" />
              <view class="card-title">{{ post.title }}</view>
              <view class="card-bottom">
                <image :src="post.avatar" class="card-avatar" />
                <text class="card-author">{{ post.author }}</text>
                <text class="card-like iconfont icon-like"></text>
                <text class="card-like-num">{{ post.likes }}</text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
    
  </view>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { initialPosts, getFollowedPosts, getDiscoverPosts } from '../../data/posts.js'

const searchText = ref('')
const showSidebar = ref(false)
const activeTab = ref('discover')

// 计算属性：根据当前标签获取帖子
const posts = computed(() => {
  return activeTab.value === 'discover' ? getDiscoverPosts() : getFollowedPosts()
})

// 计算属性：将帖子分配到左右两列
const leftPosts = computed(() => {
  const allPosts = posts.value
  const midIndex = Math.ceil(allPosts.length / 2)
  return allPosts.slice(0, midIndex)
})

const rightPosts = computed(() => {
  const allPosts = posts.value
  const midIndex = Math.ceil(allPosts.length / 2)
  return allPosts.slice(midIndex)
})

// 切换侧边栏
const toggleSidebar = () => {
  showSidebar.value = !showSidebar.value
}

// 关闭侧边栏
const closeSidebar = () => {
  showSidebar.value = false
}

// 切换标签
const switchTab = (tab) => {
  activeTab.value = tab
}

// 跳转到搜索页面
const goToSearch = () => {
  uni.navigateTo({
    url: '/pages/search/index'
  })
}

// 页面导航
const navigateTo = (url) => {
  uni.navigateTo({ url })
  closeSidebar()
}

// 获取帖子类型图标
const getPostTypeIcon = (post) => {
  if (post.video) return 'icon-video'
  if (post.images && post.images.length > 0) {
    return post.images.length > 1 ? 'icon-gallery' : 'icon-image'
  }
  return ''
}

// 获取帖子内容样式类
const getPostContentClass = (post) => {
  if (post.video) return 'content-with-video'
  if (post.images && post.images.length > 0) {
    return post.images.length > 1 ? 'content-with-gallery' : 'content-with-image'
  }
  return ''
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
    title: post.title,
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

// 播放视频
const playVideo = (video) => {
  uni.navigateTo({
    url: `/pages/video/player?url=${encodeURIComponent(video.url)}`
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

/* 侧边栏样式 */
.sidebar {
  position: fixed;
  top: 0;
  left: -600rpx;
  width: 600rpx;
  height: 100vh;
  background-color: #ffffff;
  z-index: 1000;
  transition: transform 0.3s ease;
}

.sidebar-show {
  transform: translateX(600rpx);
}

.sidebar-content {
  padding: 40rpx;
}

.sidebar-header {
  display: flex;
  align-items: center;
  margin-bottom: 40rpx;
}

.sidebar-avatar {
  width: 120rpx;
  height: 120rpx;
  border-radius: 50%;
  margin-right: 20rpx;
}

.sidebar-username {
  font-size: 32rpx;
  font-weight: bold;
  color: #333333;
}

.sidebar-menu {
  margin-top: 40rpx;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 30rpx 0;
  font-size: 28rpx;
  color: #333333;
  border-bottom: 1rpx solid #eeeeee;
}

.menu-item text {
  margin-left: 20rpx;
}

/* 遮罩层样式 */
.mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  padding: 20rpx 30rpx;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  box-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.1);
}

.nav-middle {
  display: flex;
  gap: 40rpx;
}

.nav-title {
  font-size: 32rpx;
  color: #666666;
  position: relative;
}

.nav-title.active {
  color: #333333;
  font-weight: bold;
}

.nav-title.active::after {
  content: '';
  position: absolute;
  bottom: -10rpx;
  left: 50%;
  transform: translateX(-50%);
  width: 40rpx;
  height: 4rpx;
  background-color: #007AFF;
  border-radius: 2rpx;
}

.content-container {
  margin-top: 100rpx;
  flex: 1;
}

/* 保持原有的其他样式不变 */
.posts-container {
  padding: 20rpx;
}

.masonry {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16rpx;
}
.masonry-column {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.masonry-card {
  width: 100%;
  background: #fff;
  border-radius: 18rpx;
  margin-bottom: 24rpx;
  box-shadow: 0 4rpx 16rpx rgba(0,0,0,0.08);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.card-cover {
  width: 100%;
  aspect-ratio: 3/4; /* 或用固定高度 */
  object-fit: cover;
}
.card-title {
  font-size: 28rpx;
  font-weight: 500;
  margin: 16rpx 12rpx 0 12rpx;
  color: #222;
  line-height: 1.3;
  min-height: 2.6em;
}
.card-bottom {
  display: flex;
  align-items: center;
  margin: 12rpx;
  font-size: 24rpx;
  color: #888;
}
.card-avatar {
  width: 36rpx;
  height: 36rpx;
  border-radius: 50%;
  margin-right: 10rpx;
}
.card-author {
  margin-right: auto;
  color: #666;
}
.card-like {
  margin-left: 8rpx;
  color: #888;
}
.card-like-num {
  margin-left: 2rpx;
  color: #888;
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
.sidebar-content {
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 40rpx 0 160rpx 0;
  box-sizing: border-box;
  position: relative;
}
.sidebar-header {
  display: flex;
  align-items: center;
  margin-bottom: 40rpx;
  padding: 0 40rpx;
}
.sidebar-avatar {
  width: 100rpx;
  height: 100rpx;
  border-radius: 50%;
  margin-right: 20rpx;
}
.sidebar-username {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
}
.sidebar-group {
  background: #f7f8fa;
  border-radius: 24rpx;
  margin: 0 24rpx 32rpx 24rpx;
  padding: 8rpx 0;
  box-shadow: 0 2rpx 8rpx rgba(0,0,0,0.03);
}
.sidebar-item {
  display: flex;
  align-items: center;
  padding: 32rpx 36rpx;
  font-size: 30rpx;
  color: #222;
  border-bottom: 1rpx solid #f0f0f0;
}
.sidebar-item:last-child {
  border-bottom: none;
}
.sidebar-item .iconfont {
  font-size: 40rpx;
  margin-right: 28rpx;
  color: #666;
}
.sidebar-bottom {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  background: #f7f8fa;
  padding: 24rpx 0 32rpx 0;
  border-top: 1rpx solid #eee;
}
.sidebar-bottom-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 24rpx;
  color: #666;
}
.sidebar-bottom-item .iconfont {
  font-size: 38rpx;
  margin-bottom: 8rpx;
}


.icon-menu:before { content: '\e77f'; }
.icon-search:before { content: '\e889'; }
.icon-like:before { content: '\e61b'; }
.icon-plus:before { content: '\e6da'; }
.icon-star:before { content: '\e7df'; }
.icon-comment:before { content: '\e8e8'; }
.icon-share:before { content: '\e8b8'; }
.icon-image:before { content: '\e7de'; }
.icon-gallery:before { content: '\e7e0'; }
.icon-video:before { content: '\e7e2'; }
.icon-play:before { content: '\e7e3'; }
.icon-user:before { content: '\e7ae'; }
.icon-settings:before { content: '\e78e'; }
.icon-friend:before { content: '\e600'; }
.icon-creator:before { content: '\e601'; }
.icon-draft:before { content: '\e602'; }
.icon-comment:before { content: '\e8e8'; }
.icon-history:before { content: '\e603'; }
.icon-order:before { content: '\e604'; }
.icon-cart:before { content: '\e605'; }
.icon-wallet:before { content: '\e606'; }
.icon-miniapp:before { content: '\e607'; }
.icon-guideline:before { content: '\e608'; }
.icon-scan:before { content: '\e609'; }
.icon-support:before { content: '\e60a'; }
</style> 