<!-- pages/search/index.vue -->
<template>
  <view class="search-container">
    <!-- 顶部搜索栏 -->
    <view class="search-header">
      <view class="search-input-wrap">
        <text class="iconfont icon-search"></text>
        <input
          v-model="searchText"
          class="search-input"
          placeholder="搜索"
          confirm-type="search"
          @confirm="handleSearch"
          @input="handleInput"
          focus
        />
        <text 
          v-if="searchText" 
          class="iconfont icon-close" 
          @tap="clearSearch"
        ></text>
      </view>
      <text class="cancel-btn" @tap="goBack">取消</text>
    </view>

    <!-- 搜索历史 -->
    <view v-if="!searchText && searchHistory.length > 0" class="search-section">
      <view class="section-header">
        <text class="section-title">搜索历史</text>
        <text class="clear-btn" @tap="clearHistory">清空</text>
      </view>
      <view class="history-list">
        <view 
          v-for="(item, index) in searchHistory" 
          :key="index"
          class="history-item"
          @tap="searchHistoryItem(item)"
        >
          <text class="iconfont icon-time"></text>
          <text class="history-text">{{ item }}</text>
        </view>
      </view>
    </view>

    <!-- 猜你想搜 -->
    <view v-if="!searchText" class="search-section">
      <view class="section-header">
        <text class="section-title">猜你想搜</text>
      </view>
      <view class="suggestion-list">
        <view 
          v-for="(item, index) in suggestions" 
          :key="index"
          class="suggestion-item"
          @tap="searchSuggestion(item)"
        >
          <text class="iconfont icon-fire"></text>
          <text class="suggestion-text">{{ item }}</text>
        </view>
      </view>
    </view>

    <!-- 搜索结果 -->
    <view v-if="searchText && searchResults.length > 0" class="search-results">
      <view 
        v-for="(item, index) in searchResults" 
        :key="index"
        class="result-item"
        @tap="viewResult(item)"
      >
        <image 
          v-if="item.cover" 
          :src="item.cover" 
          class="result-cover"
          mode="aspectFill"
        />
        <view class="result-content">
          <text class="result-title">{{ item.title }}</text>
          <text class="result-desc">{{ item.description }}</text>
        </view>
      </view>
    </view>

    <!-- 无搜索结果 -->
    <view v-if="searchText && searchResults.length === 0" class="no-results">
      <text class="no-results-text">暂无搜索结果</text>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const searchText = ref('')
const searchHistory = ref([])
const suggestions = ref([
  '旅行日记',
  '美食探店',
  '摄影技巧',
  '城市漫步',
  '周末好去处',
  '旅行攻略',
  '美食推荐',
  '景点打卡'
])
const searchResults = ref([])

// 处理搜索
const handleSearch = () => {
  if (!searchText.value.trim()) return
  
  // 添加到搜索历史
  if (!searchHistory.value.includes(searchText.value)) {
    searchHistory.value.unshift(searchText.value)
    // 限制历史记录数量
    if (searchHistory.value.length > 10) {
      searchHistory.value.pop()
    }
    // 保存到本地存储
    uni.setStorageSync('searchHistory', searchHistory.value)
  }
  
  // 模拟搜索结果
  searchResults.value = [
    {
      id: 1,
      title: '搜索结果示例1',
      description: '这是一个搜索结果的描述...',
      cover: 'https://placeholder.com/100x100'
    },
    {
      id: 2,
      title: '搜索结果示例2',
      description: '这是另一个搜索结果的描述...',
      cover: 'https://placeholder.com/100x100'
    }
  ]
}

// 处理输入
const handleInput = () => {
  if (!searchText.value) {
    searchResults.value = []
  }
}

// 清空搜索
const clearSearch = () => {
  searchText.value = ''
  searchResults.value = []
}

// 清空历史记录
const clearHistory = () => {
  uni.showModal({
    title: '提示',
    content: '确定要清空搜索历史吗？',
    success: (res) => {
      if (res.confirm) {
        searchHistory.value = []
        uni.removeStorageSync('searchHistory')
      }
    }
  })
}

// 搜索历史项
const searchHistoryItem = (item) => {
  searchText.value = item
  handleSearch()
}

// 搜索推荐项
const searchSuggestion = (item) => {
  searchText.value = item
  handleSearch()
}

// 查看搜索结果
const viewResult = (item) => {
  console.log('查看结果:', item)
  // 这里添加查看详情的逻辑
}

// 返回上一页
const goBack = () => {
  uni.navigateBack()
}

onMounted(() => {
  // 从本地存储加载搜索历史
  const history = uni.getStorageSync('searchHistory')
  if (history) {
    searchHistory.value = history
  }
})
</script>

<style>
.search-container {
  min-height: 100vh;
  background-color: #ffffff;
}

.search-header {
  display: flex;
  align-items: center;
  padding: 20rpx 30rpx;
  background-color: #ffffff;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
}

.search-input-wrap {
  flex: 1;
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 30rpx;
  padding: 0 20rpx;
  margin-right: 20rpx;
}

.search-input {
  flex: 1;
  height: 60rpx;
  font-size: 28rpx;
  margin: 0 20rpx;
}

.cancel-btn {
  font-size: 28rpx;
  color: #666666;
}

.search-section {
  margin-top: 120rpx;
  padding: 30rpx;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20rpx;
}

.section-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333333;
}

.clear-btn {
  font-size: 28rpx;
  color: #999999;
}

.history-list {
  margin-top: 20rpx;
}

.history-item {
  display: flex;
  align-items: center;
  padding: 20rpx 0;
  border-bottom: 1rpx solid #eeeeee;
}

.history-text {
  font-size: 28rpx;
  color: #333333;
  margin-left: 20rpx;
}

.suggestion-list {
  margin-top: 20rpx;
}

.suggestion-item {
  display: flex;
  align-items: center;
  padding: 20rpx 0;
  border-bottom: 1rpx solid #eeeeee;
}

.suggestion-text {
  font-size: 28rpx;
  color: #333333;
  margin-left: 20rpx;
}

.search-results {
  margin-top: 120rpx;
  padding: 20rpx;
}

.result-item {
  display: flex;
  padding: 20rpx;
  border-bottom: 1rpx solid #eeeeee;
}

.result-cover {
  width: 120rpx;
  height: 120rpx;
  border-radius: 8rpx;
  margin-right: 20rpx;
}

.result-content {
  flex: 1;
}

.result-title {
  font-size: 28rpx;
  color: #333333;
  margin-bottom: 10rpx;
}

.result-desc {
  font-size: 24rpx;
  color: #999999;
}

.no-results {
  margin-top: 120rpx;
  padding: 40rpx;
  text-align: center;
}

.no-results-text {
  font-size: 28rpx;
  color: #999999;
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

.icon-search:before { content: '\e889'; }
.icon-close:before { content: '\e6e7'; }
.icon-time:before { content: '\e7e4'; }
.icon-fire:before { content: '\e7e5'; }
</style> 