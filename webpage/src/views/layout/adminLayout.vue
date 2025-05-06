<!-- src/views/AdminLayout.vue -->
<template>
    <div class="admin-layout">
      <el-container style="height: 100vh">
        <el-aside width="200px">
          <!-- 可放管理员侧边菜单栏 -->
          <el-menu default-active="dashboard" class="el-menu-vertical-demo" @select="handleMenuSelect">
            <el-menu-item index="pending">仪表盘</el-menu-item>
            <el-menu-item index="approve">用户管理</el-menu-item>
            <el-menu-item index="reject">帖子管理</el-menu-item>
          </el-menu>
        </el-aside>

        <el-container>
          <el-header>后台管理系统</el-header>
          <el-main>
            <router-view />
          </el-main>
        </el-container>
      </el-container>
    </div>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  
  const handleMenuSelect = (index) => {
    router.push(`/admin/${index}`)
  }
  </script>
  
  <style scoped>
  .admin-layout {
    width: 100%;
    height: 100%;
  }
  </style>
  