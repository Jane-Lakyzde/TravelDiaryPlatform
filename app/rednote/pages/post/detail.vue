<template>
  <view class="post-detail">
    <!-- 顶部导航栏（含作者信息、关注、分享） -->
    <view class="header">
      <text class="iconfont icon-back" @tap="goBack"></text>
      <image class="avatar" :src="post?.author?.avatar || '/static/images/touxiang.jpg'" />
      <text class="username">{{ post?.author?.username }}</text>
      <button class="follow-btn" :class="{ followed: isFollowed }" @tap="toggleFollow">
        {{ isFollowed ? '已关注' : '关注' }}
      </button>
      <text class="iconfont icon-share" @tap="handleShare"></text>
    </view>

    <!-- 帖子内容区 -->
    <scroll-view class="content" scroll-y>
      <view class="post-content">
        <template v-if="post?.video">
          <view class="detail-video">
            <video :src="post.video" controls autoplay style="width: 100%; border-radius: 18rpx; background: #eee;" />
          </view>
        </template>
        <template v-else>
          <view class="image-swiper" v-if="post?.images?.length">
            <swiper :indicator-dots="post.images.length > 1" :autoplay="false" class="swiper-box">
              <swiper-item v-for="(img, idx) in post.images" :key="idx">
                <image :src="img" class="post-image" mode="aspectFill" @tap="previewImage(idx)" />
              </swiper-item>
            </swiper>
          </view>
        </template>
        <text class="title">{{ post?.title }}</text>
        <text class="text">{{ post?.content }}</text>
        <view v-if="post?.location" class="post-location">
          <text class="iconfont icon-location"></text>
          <text>{{ post.location }}</text>
        </view>
      </view>
      <!-- 评论区 -->
      <view class="comments-section">
        <view class="section-title">共 {{ comments.length }} 条评论</view>
        <view class="comment-list">
          <view v-for="comment in comments" :key="comment.id" class="comment-item">
            <image class="comment-avatar" :src="comment.user.avatar || '/static/images/touxiang.jpg'" />
            <view class="comment-content">
              <view class="comment-user">
                <text class="username">{{ comment.user.username }}</text>
                <text class="time">{{ comment.createTime }}</text>
              </view>
              <text class="comment-text">{{ comment.content }}</text>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>

    <!-- 底部操作栏 -->
    <view class="footer">
      <input class="comment-input" v-model="commentText" placeholder="说点什么..." @confirm="sendComment" />
      <view class="footer-actions">
        <text class="iconfont icon-like" :class="{ liked: isLiked }" @tap="handleLike"></text>
        <text class="count">{{ post?.likes }}</text>
        <text class="iconfont icon-star"></text>
        <text class="count">{{ post?.stars || 0 }}</text>
        <text class="iconfont icon-comment"></text>
        <text class="count">{{ comments.length }}</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { usePostStore } from '@/store/modules/post'
import { useUserStore } from '@/store/modules/user'

const postStore = usePostStore()
const userStore = useUserStore()

const post = ref(null)
const comments = ref([])
const commentText = ref('')
const isLiked = ref(false)
const isFollowed = ref(false)

// 获取帖子详情
const getPostDetail = (id) => {
  const postDetail = postStore.getPostDetail(id)
  if (postDetail) {
    post.value = postDetail
    isLiked.value = postDetail.isLiked
    isFollowed.value = !!postDetail.isFollowed
  }
}

// 获取评论列表
const getComments = (postId) => {
  comments.value = postStore.getPostComments(postId)
}

// 发送评论
const sendComment = () => {
  if (!commentText.value.trim()) {
    uni.showToast({ title: '请输入评论内容', icon: 'none' })
    return
  }
  const newComment = {
    id: Date.now().toString(),
    content: commentText.value,
    createTime: new Date().toLocaleString(),
    user: {
      username: userStore.getUserInfo.username,
      avatar: userStore.getUserInfo.avatar
    }
  }
  postStore.addComment(post.value.id, newComment)
  comments.value = postStore.getPostComments(post.value.id)
  commentText.value = ''
  uni.showToast({ title: '评论成功', icon: 'success' })
}

// 点赞
const handleLike = () => {
  postStore.toggleLike(post.value.id)
  isLiked.value = post.value.isLiked
}

// 关注/取消关注
const toggleFollow = () => {
  isFollowed.value = !isFollowed.value
  post.value.isFollowed = isFollowed.value
  // 同步到我的页面关注数
  if (isFollowed.value) {
    userStore.userInfo.following = (userStore.userInfo.following || 0) + 1
  } else {
    userStore.userInfo.following = Math.max((userStore.userInfo.following || 1) - 1, 0)
  }
}

// 分享
const handleShare = () => {
  uni.showShareMenu({
    withShareTicket: true,
    menus: ['shareAppMessage', 'shareTimeline']
  })
}

// 返回上一页
const goBack = () => {
  uni.navigateBack()
}

// 预览图片
const previewImage = (index) => {
  uni.previewImage({
    urls: post.value.images,
    current: index
  })
}

onMounted(() => {
  const pages = getCurrentPages()
  const currentPage = pages[pages.length - 1]
  const postId = currentPage.options.id
  getPostDetail(postId)
  getComments(postId)
})
</script>

<style>
.post-detail {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #fff;
}
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 100rpx;
  display: flex;
  align-items: center;
  background: #fff;
  z-index: 100;
  padding: 0 24rpx;
  border-bottom: 1rpx solid #ececec;
}
.icon-back {
  font-size: 44rpx;
  color: #222;
  margin-right: 18rpx;
}
.avatar {
  width: 64rpx;
  height: 64rpx;
  border-radius: 50%;
  margin-right: 16rpx;
}
.username {
  color: #222;
  font-size: 30rpx;
  font-weight: 500;
  margin-right: 18rpx;
}
.follow-btn {
  background: #ff2442;
  color: #fff;
  border: none;
  border-radius: 32rpx;
  font-size: 26rpx;
  padding: 0 32rpx;
  height: 56rpx;
  line-height: 56rpx;
  margin-right: 18rpx;
}
.follow-btn.followed {
  background: #eee;
  color: #888;
}
.icon-share {
  font-size: 40rpx;
  color: #222;
}
.content {
  flex: 1;
  margin-top: 100rpx;
  margin-bottom: 110rpx;
  padding: 0;
  background: #f7f7f7;
}
.post-content {
  background: #fff;
  border-radius: 32rpx;
  margin: 24rpx 24rpx 0 24rpx;
  padding: 32rpx 28rpx 24rpx 28rpx;
  color: #222;
}
.image-swiper {
  width: 100%;
  height: 420rpx;
  margin-bottom: 24rpx;
  border-radius: 18rpx;
  overflow: hidden;
}
.swiper-box {
  width: 100%;
  height: 420rpx;
  border-radius: 18rpx;
}
.post-image {
  width: 100%;
  height: 420rpx;
  object-fit: cover;
  border-radius: 18rpx;
  background: #eee;
}
.title {
  font-size: 36rpx;
  font-weight: bold;
  color: #222;
  margin-bottom: 18rpx;
  display: block;
}
.text {
  font-size: 28rpx;
  color: #444;
  line-height: 1.7;
  margin-bottom: 18rpx;
  display: block;
  word-break: break-all;
}
.comments-section {
  margin: 32rpx 24rpx 0 24rpx;
  background: #fff;
  border-radius: 32rpx;
  padding: 24rpx 24rpx 0 24rpx;
}
.section-title {
  font-size: 28rpx;
  color: #888;
  margin-bottom: 24rpx;
}
.comment-list {
  width: 100%;
}
.comment-item {
  display: flex;
  margin-bottom: 28rpx;
}
.comment-avatar {
  width: 48rpx;
  height: 48rpx;
  border-radius: 50%;
  margin-right: 16rpx;
}
.comment-content {
  flex: 1;
  min-width: 0;
}
.comment-user {
  display: flex;
  align-items: center;
  margin-bottom: 6rpx;
}
.comment-user .username {
  color: #222;
  font-size: 26rpx;
  margin-right: 12rpx;
}
.comment-user .time {
  color: #aaa;
  font-size: 22rpx;
}
.comment-text {
  color: #444;
  font-size: 26rpx;
  line-height: 1.6;
  word-break: break-all;
}
.footer {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 110rpx;
  background: #fff;
  display: flex;
  align-items: center;
  padding: 0 24rpx;
  border-top: 1rpx solid #ececec;
  z-index: 200;
}
.comment-input {
  flex: 1;
  height: 72rpx;
  background: #f7f7f7;
  border-radius: 36rpx;
  padding: 0 28rpx;
  color: #222;
  font-size: 28rpx;
  border: none;
  margin-right: 18rpx;
}
.footer-actions {
  display: flex;
  align-items: center;
  gap: 18rpx;
}
.icon-like, .icon-star, .icon-comment {
  font-size: 38rpx;
  color: #888;
}
.icon-like.liked {
  color: #ff2442;
}
.count {
  color: #888;
  font-size: 24rpx;
  margin-left: 4rpx;
}
@font-face {
  font-family: 'iconfont';
  src: url('/static/fonts/iconfont.ttf') format('woff2');
}
.iconfont {
  font-family: 'iconfont';
}
.icon-back::before { content: '\e697'; }
.icon-share::before { content: '\e615'; }
.icon-like::before { content: '\e61b'; }
.icon-like.liked ::before { content: '\e638'; }
.icon-star::before { content: '\e646'; }
.icon-comment::before { content: '\e645'; }
.post-location {
  display: flex;
  align-items: center;
  color: #888;
  font-size: 26rpx;
  margin: 18rpx 0 0 0;
}
.icon-location::before { content: '\e64e'; color: #ff2442; margin-right: 8rpx; }
</style> 