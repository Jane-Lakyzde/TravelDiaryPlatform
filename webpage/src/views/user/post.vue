<template>
  <div class="post-container">
    <el-header class="header">
      <div class="header-left">
        <el-button @click="handleCancel">取消</el-button>
      </div>
      <div class="header-title">发布帖子</div>
      <div class="header-right">
        <el-button type="primary" @click="handlePublish" :disabled="!canPublish">
          发布
        </el-button>
      </div>
    </el-header>

    <div class="post-content">
      <div class="post-editor">
        <el-input
          v-model="postContent"
          type="textarea"
          :rows="4"
          placeholder="分享你的想法..."
          maxlength="500"
          show-word-limit
        />
      </div>

      <div class="image-uploader">
        <div class="upload-title">添加图片</div>
        <el-upload
          action="#"
          list-type="picture-card"
          :auto-upload="false"
          :on-change="handleImageChange"
          :on-remove="handleImageRemove"
          :file-list="imageList"
          :limit="9"
        >
          <el-icon><Plus /></el-icon>
        </el-upload>
      </div>

      <div class="post-options">
        <el-checkbox v-model="allowComments">允许评论</el-checkbox>
        <el-checkbox v-model="showLocation">显示位置</el-checkbox>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Plus } from '@element-plus/icons-vue'

const postContent = ref('')
const imageList = ref([])
const allowComments = ref(true)
const showLocation = ref(false)

const canPublish = computed(() => {
  return postContent.value.trim().length > 0 || imageList.value.length > 0
})

const handleImageChange = (file) => {
  imageList.value.push(file)
}

const handleImageRemove = (file) => {
  const index = imageList.value.indexOf(file)
  if (index !== -1) {
    imageList.value.splice(index, 1)
  }
}

const handlePublish = () => {
  // 这里添加发布逻辑
  console.log('发布帖子:', {
    content: postContent.value,
    images: imageList.value,
    allowComments: allowComments.value,
    showLocation: showLocation.value
  })
}

const handleCancel = () => {
  // 这里添加取消逻辑
  console.log('取消发布')
}
</script>

<style scoped>
.post-container {
  height: 100vh;
  background-color: #fff;
  display: flex;
  flex-direction: column;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  border-bottom: 1px solid #ebeef5;
}

.header-title {
  font-size: 16px;
  font-weight: bold;
}

.post-content {
  flex: 1;
  overflow-y: auto;
  padding: 15px;
}

.post-editor {
  margin-bottom: 20px;
}

.image-uploader {
  margin-bottom: 20px;
}

.upload-title {
  font-size: 14px;
  color: #606266;
  margin-bottom: 10px;
}

.post-options {
  display: flex;
  gap: 20px;
  padding: 15px 0;
  border-top: 1px solid #ebeef5;
}

:deep(.el-upload--picture-card) {
  width: 80px;
  height: 80px;
  line-height: 80px;
}

:deep(.el-upload-list--picture-card .el-upload-list__item) {
  width: 80px;
  height: 80px;
}
</style>
  