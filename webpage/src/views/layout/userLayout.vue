<!-- src/views/UserLayout.vue -->
<template>
  <div class="user-layout">
    <!-- 主要内容区域 -->
    <div class="main-content">
      <router-view />
    </div>
    
    <!-- 底部导航栏 -->
    <div class="bottom-nav">
        <router-link :to="`/users/${userId}/home`" class="nav-item">
        <i class="iconfont icon-home"></i>
        <span>首页</span>
        </router-link>
        <router-link :to="`/users/${userId}/find`" class="nav-item">
        <i class="iconfont icon-discover"></i>
        <span>发现</span>
        </router-link>
        <router-link :to="`/users/${userId}/post`" class="nav-item">
        <i class="iconfont icon-message"></i>
        <span>消息</span>
        </router-link>
        <router-link :to="`/users/${userId}/my`" class="nav-item">
        <i class="iconfont icon-profile"></i>
        <span>我的</span>
        </router-link>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const userId = route.params.id


// 页面加载时，如果没有指定路由，默认跳转到首页
onMounted(() => {
  if (router.currentRoute.value.path === '/') {
    router.push('/home')
  }
})
</script>

<style scoped>
.user-layout {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  overflow-y: auto;
}

.bottom-nav {
  height: 50px;
  background-color: #fff;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-top: 1px solid #eee;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: #666;
  font-size: 12px;
}

.nav-item i {
  font-size: 20px;
  margin-bottom: 2px;
}

.nav-item.router-link-active {
  color: #ff4d4f;
}
</style>
  