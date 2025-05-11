# 旅行日记平台 (Travel Diary Platform)

## 项目简介
这是一个基于 uni-app 开发的旅行日记平台，为用户提供便捷的旅行记录和分享功能。平台支持手机号登录，提供完整的用户认证系统。

## 功能特性
- 用户认证
  - 手机号登录
  - 密码登录
  - 微信登录（开发中）
- 用户协议和隐私政策
- 多地区手机号支持（+86、+852、+853、+886）
- 响应式界面设计

## 技术栈
- 前端框架：Vue 3 + uni-app
- 开发语言：JavaScript/TypeScript
- UI 组件：自定义组件
- 状态管理：Vue 3 Composition API
- 字体图标：自定义 iconfont

## 项目结构
```
TravelDiaryPlatform/
├── pages/                # 页面文件
│   └── login/           # 登录相关页面
│       └── phone.vue    # 手机号登录页面
├── static/              # 静态资源
│   └── fonts/          # 字体文件
├── api/                 # API 接口
└── components/         # 公共组件
```

## 开发环境要求
- Node.js >= 14.0.0
- HBuilderX 最新版
- Vue 3
- uni-app 开发环境

## 安装和运行
1. 克隆项目
```bash
git clone [项目地址]
```

2. 安装依赖
```bash
npm install
```

3. 运行项目
```bash
# 使用 HBuilderX 运行项目
# 或使用命令行
npm run dev:h5
```

## 登录功能说明
### 手机号登录
- 支持中国大陆（+86）、香港（+852）、澳门（+853）、台湾（+886）手机号
- 密码长度要求：最少 6 位
- 登录成功后自动跳转到用户主页

### 安全特性
- 密码加密传输
- Token 认证机制
- 用户协议和隐私政策确认

## 常见问题
1. 无法接收验证码
2. 微信登录失败
3. 手机号不可用

## 联系方式
如有问题，请联系客服或提交 Issue。

## 版权信息
© 2024 Travel Diary Platform. All rights reserved. 