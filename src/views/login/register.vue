<template>
  <el-container class="register-container">
    <el-card class="register-card">
      <template #header>
        <div class="card-header">
          <span>注册</span>
        </div>
      </template>
      <el-form 
        :model="formInline" 
        :rules="rules"
        ref="registerForm"
        class="register-form"
      >
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
        <el-form-item prop="confirmPassword">
          <el-input 
            v-model="formInline.confirmPassword" 
            type="password"
            placeholder="请确认密码"
            prefix-icon="Lock"
            show-password
            clearable 
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="register-btn" @click="handleRegister">注册</el-button>
        </el-form-item>
      </el-form>
      <div class="login-link">
        已有账号？<a href="/login">立即登录</a>
      </div>
    </el-card>
  </el-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { register } from '@/api/auth'

const router = useRouter()
const registerForm = ref(null)
const formInline = ref({
  username: '',
  password: '',
  confirmPassword: ''
})

const validatePass = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请再次输入密码'))
  } else if (value !== formInline.value.password) {
    callback(new Error('两次输入密码不一致!'))
  } else {
    callback()
  }
}

const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    { validator: validatePass, trigger: 'blur' }
  ]
}

const handleRegister = async () => {
  if (!registerForm.value) return
  
  try {
    await registerForm.value.validate()
    await register(formInline.value)
    ElMessage.success('注册成功')
    router.push('/login')
  } catch (err) {
    ElMessage.error(err.response?.data?.message || '注册失败')
  }
}
</script>

<style scoped>
.register-container {
  height: 740px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f7fa;
  padding: 10px;
  box-sizing: border-box;
}

.register-card {
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

.register-form {
  padding: 20px;
}

.register-form :deep(.el-input__prefix) {
  font-size: 16px;
}

.register-btn {
  width: 100%;
  margin-top: 10px;
}

.login-link {
  text-align: center;
  font-size: 14px;
  color: #606266;
  margin-bottom: 20px;
}

.login-link a {
  color: #409eff;
  text-decoration: none;
}

.login-link a:hover {
  text-decoration: underline;
}

:deep(.el-input__suffix svg) {
  width: 16px !important;
  height: 16px !important;
}
</style> 