<template>
  <el-container class="login-container">
    <el-card class="login-card">
      <template #header>
        <div class="card-header">
          <span>登录</span>
        </div>
      </template>
      <el-form 
        :model="formInline" 
        :rules="rules"
        ref="loginForm"
        class="login-form"
      >
        <el-form-item prop="role">
          <el-select 
            v-model="formInline.role"
            placeholder="请选择登录身份"
            style="width: 100%"
            :popper-class="'custom-select-dropdown'"
          >
            <el-option label="用户" value="user" />
            <el-option label="管理员" value="admin" />
          </el-select>
        </el-form-item>
        <el-form-item prop="username">
          <el-input 
            v-model="formInline.username" 
            placeholder="请输入用户名"
            prefix-icon="User"
            clearable 
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input 
            v-model="formInline.password" 
            type="password"
            placeholder="请输入密码"
            prefix-icon="Lock"
            show-password
            clearable 
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="login-btn" @click="handleLogin">登录</el-button>
        </el-form-item>
      </el-form>
      <div class="register-link">
        还没有账号？<a href="/register">立即注册</a>
      </div>
    </el-card>
  </el-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { login } from '@/api/auth'

const router = useRouter()
const loginForm = ref(null)
const formInline = ref({
  username: '',
  password: '',
  role: 'user'
})

const rules = {
  role: [
    { required: true, message: '请选择登录身份', trigger: 'change' }
  ],
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
  ]
}

const handleLogin = async () => {
  if (!loginForm.value) return
  
  try {
    await loginForm.value.validate()
    await login(formInline.value)
    ElMessage.success('登录成功')
    router.push(formInline.value.role === 'admin' ? '/admin/pending' : `/users/${formInline.value.username}/home`)
  } catch (err) {
    ElMessage.error(err.response?.data?.message || '登录失败')
  }
}
</script>

<style scoped>
.login-container {
  height: 740px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f7fa;
  padding: 10px;
  box-sizing: border-box;
}

.login-card {
  border: 3px solid black;
  width: 80%;
  height: 60%;
  max-width: 400px;
  border-radius: 8px;
}

.card-header {
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  color: #303133;
}

.login-form {
  padding: 20px;
}

.login-form :deep(.el-input__prefix) {
  font-size: 16px;
}

.login-form :deep(.el-select .el-input__inner) {
  font-size: 16px;
}

.login-form :deep(.el-select .el-input__suffix) {
  font-size: 16px;
}

.custom-select-dropdown {
  font-size: 16px;
}

.login-btn {
  width: 100%;
  margin-top: 10px;
}

.register-link {
  text-align: center;
  font-size: 14px;
  color: #606266;
  margin-bottom: 20px;
}

.register-link a {
  color: #409eff;
  text-decoration: none;
}

.register-link a:hover {
  text-decoration: underline;
}

:deep(.el-input__suffix svg) {
  width: 16px !important;
  height: 16px !important;
}




</style>