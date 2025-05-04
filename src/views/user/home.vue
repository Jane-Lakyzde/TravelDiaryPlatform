<!-- src/views/home/home.vue -->
<template>
  <div class="home-container">
    <!-- 顶部导航栏 -->
    <el-header class="header">
      <div class="nav-left">
        <el-input
          v-model="searchText"
          placeholder="搜索帖子"
          class="search-input"
          @keyup.enter="handleSearch"
        >
          <template #prefix>
            <el-icon><Search /></el-icon>
          </template>
        </el-input>
      </div>
      <div class="nav-right">
        <el-button type="primary" @click="handleCreatePost">
          <el-icon><Plus /></el-icon>发帖
        </el-button>
      </div>
    </el-header>

    <div class="posts-container">
      <div class="posts-grid">
        <!-- 左侧帖子列表 -->
        <div class="posts-column">
          <el-card v-for="post in leftPosts" :key="post.id" class="post-card">
            <div class="post-header">
              <el-avatar :size="40" :src="post.avatar" />
              <div class="user-info">
                <span class="username">{{ post.username }}</span>
                <span class="post-time">{{ post.time }}</span>
              </div>
            </div>
            <div class="post-content">
              <p class="post-text">{{ post.content }}</p>
              <el-image
                v-for="(image, index) in post.images"
                :key="index"
                :src="image"
                class="post-image"
                :preview-src-list="post.images"
                fit="cover"
              />
            </div>
            <div class="post-actions">
              <el-button
                :type="post.isLiked ? 'primary' : 'default'"
                @click="handleLike(post)"
              >
                <el-icon><Star /></el-icon>
                <span>{{ post.likes }}</span>
              </el-button>
              <el-button @click="handleComment(post)">
                <el-icon><ChatDotRound /></el-icon>
                <span>{{ post.comments }}</span>
              </el-button>
              <el-button @click="handleShare(post)">
                <el-icon><Share /></el-icon>
                <span>分享</span>
              </el-button>
            </div>
          </el-card>
        </div>

        <!-- 右侧帖子列表 -->
        <div class="posts-column">
          <el-card v-for="post in rightPosts" :key="post.id" class="post-card">
            <div class="post-header">
              <el-avatar :size="40" :src="post.avatar" />
              <div class="user-info">
                <span class="username">{{ post.username }}</span>
                <span class="post-time">{{ post.time }}</span>
              </div>
            </div>
            <div class="post-content">
              <p class="post-text">{{ post.content }}</p>
              <el-image
                v-for="(image, index) in post.images"
                :key="index"
                :src="image"
                class="post-image"
                :preview-src-list="post.images"
                fit="cover"
              />
            </div>
            <div class="post-actions">
              <el-button
                :type="post.isLiked ? 'primary' : 'default'"
                @click="handleLike(post)"
              >
                <el-icon><Star /></el-icon>
                <span>{{ post.likes }}</span>
              </el-button>
              <el-button @click="handleComment(post)">
                <el-icon><ChatDotRound /></el-icon>
                <span>{{ post.comments }}</span>
              </el-button>
              <el-button @click="handleShare(post)">
                <el-icon><Share /></el-icon>
                <span>分享</span>
              </el-button>
            </div>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Search, Plus, Star, ChatDotRound, Share } from '@element-plus/icons-vue'
import { initialPosts } from '@/data/posts'

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
  console.log('分享帖子:', post.id)
  // 这里添加分享逻辑
}

// 处理发帖
const handleCreatePost = () => {
  console.log('创建新帖子')
  // 这里添加发帖逻辑
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

<style scoped>
.home-container {
  height: 100vh;
  background-color: #f5f7fa;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 0;
  box-sizing: border-box;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 0 10px;
  flex-shrink: 0;
  position: sticky;
  top: 0;
  z-index: 100;
}

.search-input {
  width: 200px;
}

.posts-container {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 5px;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

.posts-container::-webkit-scrollbar {
  display: none;  /* Chrome, Safari and Opera */
}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 5px;
  box-sizing: border-box;
  max-width: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}

.posts-column {
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 0 2px;
}

.post-card {
  margin-bottom: 0;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
}

.post-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.user-info {
  margin-left: 8px;
  display: flex;
  flex-direction: column;
}

.username {
  font-weight: bold;
  font-size: 14px;
}

.post-time {
  font-size: 12px;
  color: #909399;
}

.post-content {
  margin-bottom: 10px;
}

.post-text {
  margin-bottom: 8px;
  line-height: 1.5;
  font-size: 14px;
}

.post-image {
  width: 100%;
  height: auto;
  margin-bottom: 8px;
  border-radius: 4px;
  object-fit: cover;
}

.post-actions {
  display: flex;
  justify-content: space-around;
  padding-top: 8px;
  border-top: 1px solid #ebeef5;
}

.post-actions .el-button {
  padding: 6px 10px;
  font-size: 12px;
}

/* 响应式布局 */
@media screen and (max-width: 768px) {
  .posts-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 4px;
  }

  .search-input {
    width: 150px;
  }
}

@media screen and (max-width: 480px) {
  .posts-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 3px;
  }

  .search-input {
    width: 120px;
  }

  .post-actions .el-button {
    padding: 4px 8px;
  }
}
</style> 