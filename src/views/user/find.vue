<template>
  <div class="find-container">
    <el-header class="header">
      <h2>发现</h2>
    </el-header>

    <div class="recommend-container">
      <el-card v-for="user in recommendedUsers" :key="user.id" class="user-card">
        <div class="user-info">
          <el-avatar :size="60" :src="user.avatar" />
          <div class="user-details">
            <h3>{{ user.username }}</h3>
            <p class="user-id">ID: {{ user.id }}</p>
            <p class="user-bio">{{ user.bio }}</p>
          </div>
        </div>
        <div class="user-stats">
          <div class="stat-item">
            <span class="stat-value">{{ user.posts }}</span>
            <span class="stat-label">帖子</span>
          </div>
          <div class="stat-item">
            <span class="stat-value">{{ user.followers }}</span>
            <span class="stat-label">粉丝</span>
          </div>
          <div class="stat-item">
            <span class="stat-value">{{ user.following }}</span>
            <span class="stat-label">关注</span>
          </div>
        </div>
        <div class="user-actions">
          <el-button 
            :type="user.isFollowing ? 'default' : 'primary'" 
            @click="handleFollow(user)"
          >
            {{ user.isFollowing ? '已关注' : '关注' }}
          </el-button>
        </div>
      </el-card>
    </div>
  </div>
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
    isFollowing: true
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
}
</script>

<style scoped>
.find-container {
  height: 100vh;
  background-color: #f5f7fa;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.header {
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 0 20px;
  display: flex;
  align-items: center;
}

.header h2 {
  margin: 0;
  font-size: 18px;
}

.recommend-container {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
}

.user-card {
  margin-bottom: 10px;
}

.user-info {
  display: flex;
  align-items: flex-start;
  margin-bottom: 15px;
}

.user-details {
  margin-left: 15px;
  flex: 1;
}

.user-details h3 {
  margin: 0 0 5px 0;
  font-size: 16px;
}

.user-id {
  color: #909399;
  font-size: 12px;
  margin: 0 0 5px 0;
}

.user-bio {
  color: #606266;
  font-size: 14px;
  margin: 0;
}

.user-stats {
  display: flex;
  justify-content: space-around;
  margin-bottom: 15px;
  padding: 10px 0;
  border-top: 1px solid #ebeef5;
  border-bottom: 1px solid #ebeef5;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-value {
  font-weight: bold;
  font-size: 16px;
}

.stat-label {
  color: #909399;
  font-size: 12px;
}

.user-actions {
  display: flex;
  justify-content: center;
}

.user-actions .el-button {
  width: 100%;
}
</style>
