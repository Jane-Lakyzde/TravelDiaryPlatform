<template>
  <view class="post-container">
    <view class="header">
      <view class="header-left">
        <button class="btn-text" @tap="handleCancel">取消</button>
      </view>
      <view class="header-title">发布帖子</view>
      <view class="header-right">
        <button 
          class="btn-primary" 
          @tap="handlePublish" 
          :disabled="!canPublish"
        >
          发布
        </button>
      </view>
    </view>

    <view class="post-content">
      <view class="post-editor">
        <textarea
          v-model="postContent"
          class="post-textarea"
          placeholder="分享你的想法..."
          maxlength="500"
          :show-confirm-bar="false"
          :cursor-spacing="20"
        />
        <view class="word-count">{{ postContent.length }}/500</view>
      </view>

      <view class="image-uploader">
        <view class="upload-title">添加图片</view>
        <view class="image-list">
          <view 
            v-for="(image, index) in imageList" 
            :key="index" 
            class="image-item"
          >
            <image 
              :src="image.url" 
              mode="aspectFill" 
              class="preview-image"
            />
            <view class="delete-btn" @tap="handleImageRemove(index)">
              <text class="iconfont icon-close"></text>
            </view>
          </view>
          <view 
            v-if="imageList.length < 9" 
            class="upload-btn"
            @tap="chooseImage"
          >
            <text class="iconfont icon-plus"></text>
          </view>
        </view>
      </view>

      <view class="post-options">
        <view class="option-item">
          <switch 
            :checked="allowComments" 
            @change="allowComments = $event.detail.value"
            color="#007AFF"
          />
          <text class="option-label">允许评论</text>
        </view>
        <view class="option-item">
          <switch 
            :checked="showLocation" 
            @change="showLocation = $event.detail.value"
            color="#007AFF"
          />
          <text class="option-label">显示位置</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'

const postContent = ref('')
const imageList = ref([])
const allowComments = ref(true)
const showLocation = ref(false)

const canPublish = computed(() => {
  return postContent.value.trim().length > 0 || imageList.value.length > 0
})

const chooseImage = () => {
  uni.chooseImage({
    count: 9 - imageList.value.length,
    sizeType: ['compressed'],
    sourceType: ['album', 'camera'],
    success: (res) => {
      const tempFiles = res.tempFilePaths.map(path => ({
        url: path,
        // 这里可以添加上传逻辑
      }))
      imageList.value.push(...tempFiles)
    }
  })
}

const handleImageRemove = (index) => {
  imageList.value.splice(index, 1)
}

const handlePublish = () => {
  if (!canPublish.value) return
  
  uni.showLoading({
    title: '发布中...'
  })
  
  // 这里添加发布逻辑
  console.log('发布帖子:', {
    content: postContent.value,
    images: imageList.value,
    allowComments: allowComments.value,
    showLocation: showLocation.value
  })
  
  // 模拟发布成功
  setTimeout(() => {
    uni.hideLoading()
    uni.showToast({
      title: '发布成功',
      icon: 'success',
      duration: 2000
    })
    setTimeout(() => {
      uni.navigateBack()
    }, 2000)
  }, 1500)
}

const handleCancel = () => {
  uni.showModal({
    title: '提示',
    content: '确定要放弃编辑吗？',
    success: (res) => {
      if (res.confirm) {
        uni.navigateBack()
      }
    }
  })
}
</script>

<style>
.post-container {
  min-height: 100vh;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20rpx;
  border-bottom: 1rpx solid #eeeeee;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: #ffffff;
  z-index: 100;
}

.header-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333333;
}

.btn-text {
  font-size: 28rpx;
  color: #666666;
  background: none;
  border: none;
  padding: 0;
}

.btn-primary {
  font-size: 28rpx;
  color: #ffffff;
  background-color: #007AFF;
  border: none;
  padding: 10rpx 30rpx;
  border-radius: 30rpx;
}

.btn-primary[disabled] {
  background-color: #cccccc;
  color: #ffffff;
}

.post-content {
  margin-top: 100rpx;
  padding: 30rpx;
}

.post-editor {
  margin-bottom: 40rpx;
  position: relative;
}

.post-textarea {
  width: 100%;
  height: 200rpx;
  padding: 20rpx;
  font-size: 28rpx;
  line-height: 1.5;
  background-color: #f5f5f5;
  border-radius: 12rpx;
}

.word-count {
  position: absolute;
  right: 20rpx;
  bottom: 20rpx;
  font-size: 24rpx;
  color: #999999;
}

.image-uploader {
  margin-bottom: 40rpx;
}

.upload-title {
  font-size: 28rpx;
  color: #666666;
  margin-bottom: 20rpx;
}

.image-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20rpx;
}

.image-item {
  width: 200rpx;
  height: 200rpx;
  position: relative;
}

.preview-image {
  width: 100%;
  height: 100%;
  border-radius: 8rpx;
}

.delete-btn {
  position: absolute;
  top: -20rpx;
  right: -20rpx;
  width: 40rpx;
  height: 40rpx;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.delete-btn text {
  color: #ffffff;
  font-size: 24rpx;
}

.upload-btn {
  width: 200rpx;
  height: 200rpx;
  background-color: #f5f5f5;
  border-radius: 8rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.upload-btn text {
  font-size: 48rpx;
  color: #999999;
}

.post-options {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
  padding: 30rpx 0;
  border-top: 1rpx solid #eeeeee;
}

.option-item {
  display: flex;
  align-items: center;
  gap: 20rpx;
}

.option-label {
  font-size: 28rpx;
  color: #333333;
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
.icon-close:before { content: '\e6e7'; }
</style>
  