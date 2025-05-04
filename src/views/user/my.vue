<template>
    <div>
      <el-page-header content="个人设置" />
      <el-form label-width="80px" style="max-width: 400px;">
        <el-form-item label="用户名">
          <el-input v-model="username" />
        </el-form-item>
        <el-form-item label="个性签名">
          <el-input type="textarea" v-model="signature" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="save">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { ElMessage } from 'element-plus'
  
  const username = ref('当前用户名')
  const signature = ref('这个人很懒，什么都没写。')
  
  const save = () => {
    ElMessage.success('保存成功（示例）')
  }
  </script>
  