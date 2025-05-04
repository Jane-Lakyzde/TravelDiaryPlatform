<template>
  <div class="my-container">
    <el-header class="header">
      <h2>个人中心</h2>
    </el-header>

    <div class="profile-section">
      <el-card class="profile-card">
        <div class="profile-header">
          <el-avatar :size="80" :src="userInfo.avatar" />
          <div class="profile-info">
            <h3>{{ userInfo.username }}</h3>
            <p class="user-id">ID: {{ userInfo.id }}</p>
            <el-button type="primary" @click="handleEditProfile">编辑资料</el-button>
          </div>
        </div>
        <div class="profile-bio">
          <p>{{ userInfo.bio }}</p>
        </div>
        <div class="profile-stats">
          <div class="stat-item">
            <span class="stat-value">{{ userInfo.posts }}</span>
            <span class="stat-label">帖子</span>
          </div>
          <div class="stat-item">
            <span class="stat-value">{{ userInfo.followers }}</span>
            <span class="stat-label">粉丝</span>
          </div>
          <div class="stat-item">
            <span class="stat-value">{{ userInfo.following }}</span>
            <span class="stat-label">关注</span>
          </div>
        </div>
      </el-card>
    </div>

    <div class="posts-section">
      <el-tabs v-model="activeTab">
        <el-tab-pane label="我的帖子" name="posts">
          <el-card v-for="post in myPosts" :key="post.id" class="post-card">
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
              <el-button @click="handleDelete(post)">
                <el-icon><Delete /></el-icon>
                <span>删除</span>
              </el-button>
            </div>
          </el-card>
        </el-tab-pane>
        <el-tab-pane label="收藏" name="favorites">
          <el-empty description="暂无收藏" />
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- 编辑资料对话框 -->
    <el-dialog
      v-model="editDialogVisible"
      title="编辑资料"
      width="90%"
    >
      <el-form :model="editForm" label-width="80px">
        <el-form-item label="头像">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-change="handleAvatarChange"
          >
            <img v-if="editForm.avatar" :src="editForm.avatar" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="editForm.username" />
        </el-form-item>
        <el-form-item label="个人简介">
          <el-input
            v-model="editForm.bio"
            type="textarea"
            :rows="3"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSaveProfile">保存</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Star, ChatDotRound, Delete, Plus } from '@element-plus/icons-vue'
import { initialPosts } from '@/data/posts'

const activeTab = ref('posts')
const editDialogVisible = ref(false)

const userInfo = ref({
  id: 'user000',
  username: '我的用户名',
  avatar: 'https://placeholder.com/80x80',
  bio: '这个人很懒，什么都没写...',
  posts: 10,
  followers: 100,
  following: 50
})

const editForm = ref({
  username: userInfo.value.username,
  avatar: userInfo.value.avatar,
  bio: userInfo.value.bio
})

const myPosts = ref(initialPosts.slice(0, 3))

const handleEditProfile = () => {
  editForm.value = {
    username: userInfo.value.username,
    avatar: userInfo.value.avatar,
    bio: userInfo.value.bio
  }
  editDialogVisible.value = true
}

const handleSaveProfile = () => {
  userInfo.value = {
    ...userInfo.value,
    ...editForm.value
  }
  editDialogVisible.value = false
}

const handleAvatarChange = (file) => {
  // 这里添加头像上传逻辑
  console.log('上传头像:', file)
}

const handleLike = (post) => {
  post.isLiked = !post.isLiked
  post.likes += post.isLiked ? 1 : -1
}

const handleComment = (post) => {
  console.log('评论帖子:', post.id)
}

const handleDelete = (post) => {
  console.log('删除帖子:', post.id)
}
</script>

<style scoped>
.my-container {
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

.profile-section {
  padding: 15px;
}

.profile-card {
  margin-bottom: 15px;
}

.profile-header {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.profile-info {
  margin-left: 15px;
  flex: 1;
}

.profile-info h3 {
  margin: 0 0 5px 0;
  font-size: 18px;
}

.user-id {
  color: #909399;
  font-size: 12px;
  margin: 0 0 10px 0;
}

.profile-bio {
  margin-bottom: 15px;
  color: #606266;
  font-size: 14px;
}

.profile-stats {
  display: flex;
  justify-content: space-around;
  padding: 15px 0;
  border-top: 1px solid #ebeef5;
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

.posts-section {
  flex: 1;
  overflow-y: auto;
  padding: 0 15px;
}

.post-card {
  margin-bottom: 10px;
}

.post-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.user-info {
  margin-left: 10px;
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
}

.post-actions {
  display: flex;
  justify-content: space-around;
  padding-top: 8px;
  border-top: 1px solid #ebeef5;
}

.avatar-uploader {
  text-align: center;
}

.avatar-uploader .avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}

.avatar-uploader .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
  border: 1px dashed #d9d9d9;
  border-radius: 50%;
}
</style>
  