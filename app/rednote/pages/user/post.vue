<template>
  <view class="post-container">

    <!-- 图片选择区 -->
    <scroll-view scroll-x class="image-scroll">
      <view class="image-list">
        <view v-for="(image, index) in imageList" :key="index" class="image-item">
          <image :src="image.url" mode="aspectFill" class="image-thumb" />
        </view>
        <view v-if="imageList.length < 9" class="image-add" @tap="chooseImage">
          <text class="iconfont icon-plus"></text>
        </view>
      </view>
    </scroll-view>

    <!-- 标题、正文输入 -->
    <view class="inputs">
      <input v-model="title" class="title" placeholder="添加标题" maxlength="50" />
      <textarea v-model="content" class="content" placeholder="添加正文" maxlength="500" />
    </view>

    <!-- 功能按钮区 -->
    <view class="func-btns">
      <view class="func-btn"><text class="iconfont">#</text> 话题</view>
      <view class="func-btn"><text class="iconfont">@</text> 用户</view>
      <view class="func-btn"><text class="iconfont">🗳️</text> 投票</view>
    </view>

    <!-- 列表项 -->
    <view class="list">
      <view class="list-item" @tap="chooseLocation">
        <text class="iconfont icon-location"></text>
        <text class="list-label">标记地点</text>
        <text class="list-value">{{ location || '' }}</text>
        <text class="iconfont icon-arrow"></text>
      </view>
      <view class="list-item">
        <text class="iconfont icon-lock"></text>
        <text class="list-label">公开可见</text>
        <text class="iconfont icon-arrow"></text>
      </view>
      <view class="list-item">
        <text class="iconfont icon-setting"></text>
        <text class="list-label">高级选项</text>
        <text class="iconfont icon-arrow"></text>
      </view>
    </view>

    <!-- 底部操作栏 -->
    <view class="bottom-bar">
      <view class="bottom-btn" @tap="saveDraft">
        <text class="iconfont icon-draft"></text>
        存草稿
      </view>
      <view class="bottom-btn" @tap="previewPost">
        <text class="iconfont icon-preview"></text>
        预览
      </view>
      <button class="publish-btn" @tap="handlePublish">发布笔记</button>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/store/modules/user'
import { usePostStore } from '@/store/modules/post'

const userStore = useUserStore()
const postStore = usePostStore()

const imageList = ref([])
const title = ref('')
const content = ref('')
const location = ref('')

const chooseImage = () => {
  uni.chooseImage({
    count: 9 - imageList.value.length,
    sizeType: ['compressed'],
    sourceType: ['album', 'camera'],
    success: (res) => {
      const tempFiles = res.tempFilePaths.map(path => ({ url: path }))
      imageList.value.push(...tempFiles)
    }
  })
}

const chooseLocation = () => {
  uni.getLocation({
    type: 'wgs84',
    success: () => {
      uni.chooseLocation({
        success: (res) => {
          location.value = res.name
        }
      })
    }
  })
}

const saveDraft = () => {
  uni.showToast({ title: '已存为草稿', icon: 'none' })
}

const previewPost = () => {
  uni.showToast({ title: '预览功能开发中', icon: 'none' })
}

const handlePublish = async () => {
  try {
    if (!title.value.trim()) {
      uni.showToast({ title: '请输入标题', icon: 'none' })
      return
    }
    if (!content.value.trim()) {
      uni.showToast({ title: '请输入正文', icon: 'none' })
      return
    }
    if (imageList.value.length === 0) {
      uni.showToast({ title: '请至少上传一张图片', icon: 'none' })
      return
    }

    // 创建帖子对象
    const newPost = {
      id: Date.now().toString(),
      title: title.value,
      content: content.value,
      images: imageList.value.map(image => image.url),
      location: location.value,
      author: {
        username: userStore.getUserInfo.username,
        avatar: userStore.getUserInfo.avatar
      },
      createTime: new Date().toLocaleString(),
      likes: 0,
      isLiked: false
    }

    // 直接添加到 post store
    postStore.addPost(newPost)
    
    // 更新用户帖子数量
    const currentPosts = userStore.getUserInfo.posts || 0
    userStore.updatePostsCount(currentPosts + 1)

    // 清空表单
    title.value = ''
    content.value = ''
    imageList.value = []
    location.value = ''

    uni.showToast({ title: '发布成功', icon: 'success' })
    uni.switchTab({ url: '/pages/user/my' })
  } catch (error) {
    console.error('发布失败:', error)
    uni.showToast({ title: '发布失败，请重试', icon: 'none' })
  }
}

</script>

<style>
.post-container {
  min-height: 100vh;
  background: #fff;
  display: flex;
  flex-direction: column;
  padding-bottom: 160rpx;
}
.header {
  height: 80rpx;
  display: flex;
  align-items: center;
  padding-left: 20rpx;
}
.icon-back:before { content: '\2039'; font-size: 48rpx; color: #222; }

.image-scroll {
  width: 100vw;
  margin-top: 10rpx;
  margin-bottom: 20rpx;
}
.image-list {
  display: flex;
  align-items: center;
  padding-left: 20rpx;
  flex-wrap: nowrap; 
}
.image-item {
  width: 140rpx;
  height: 140rpx;
  margin-right: 20rpx;
  border-radius: 16rpx;
  overflow: hidden;
  background: #f5f5f5;
  flex-shrink: 0;
}
.image-thumb {
  width: 100%;
  height: 100%;
  border-radius: 16rpx;
}
.image-add {
  width: 140rpx;
  height: 140rpx;
  background: #fafbfc;
  border: 2rpx dashed #e5e5e5;
  border-radius: 16rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ccc;
  font-size: 60rpx;
  flex-shrink: 0;
}
.icon-plus:before { content: '+'; font-size: 60rpx; color: #ccc; }
.inputs {
  padding: 0 32rpx;
  margin-bottom: 30rpx;
  margin-top: 15rpx;
}
.title {
  width: 100%;
  font-size: 36rpx;
  color: #bbb;
  font-weight: 500;
  margin-bottom: 16rpx;
  border: none;
  background: none;
  padding-bottom: 10rpx;
}
.content {
  width: 100%;
  min-height: 100rpx;
  font-size: 28rpx;
  color: #bbb;
  border: none;
  background: none;
}

.tags-scroll {
  width: 100vw;
  margin-bottom: 10rpx;
}
.tags-list {
  display: flex;
  align-items: center;
  padding-left: 20rpx;
}
.tag {
  background: #f5f5f5;
  color: #888;
  font-size: 26rpx;
  border-radius: 32rpx;
  padding: 10rpx 28rpx;
  margin-right: 16rpx;
}

.func-btns {
  display: flex;
  align-items: center;
  padding: 0 20rpx;
  margin-bottom: 10rpx;
}
.func-btn {
  background: #f5f5f5;
  color: #888;
  font-size: 28rpx;
  border-radius: 32rpx;
  padding: 10rpx 28rpx;
  margin-right: 16rpx;
  display: flex;
  align-items: center;
}

.list {
  margin: 20rpx 0 0 0;
  background: #fff;
}
.list-item {
  display: flex;
  align-items: center;
  padding: 32rpx 32rpx;
  border-bottom: 1rpx solid #f0f0f0;
  font-size: 30rpx;
  color: #333;
}
.list-item:last-child { border-bottom: none; }
.list-label { margin-left: 16rpx; color: #333; }
.list-value { flex: 1; color: #888; margin-left: 20rpx; }
.icon-location:before { content: '\1F4CD'; margin-right: 8rpx; }
.icon-lock:before { content: '\1F512'; margin-right: 8rpx; }
.icon-setting:before { content: '\2699'; margin-right: 8rpx; }
.icon-arrow:before { content: '\203A'; color: #bbb; margin-left: 8rpx; }

.bottom-bar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20rpx 32rpx 40rpx 32rpx;
  z-index: 100;
}
.bottom-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #888;
  font-size: 24rpx;
  margin-right: 32rpx;
}
.icon-draft:before { content: '\1F4E5'; font-size: 36rpx; }
.icon-preview:before { content: '\1F441'; font-size: 36rpx; }
.publish-btn {
  flex: 1;
  margin-left: 32rpx;
  height: 88rpx;
  background: #DB9EA2;
  color: #fff;
  border-radius: 44rpx;
  font-size: 32rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
}
</style>
  