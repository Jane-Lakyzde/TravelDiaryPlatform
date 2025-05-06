import express from 'express';
import * as userHandler from '../router/user.js';


const router = express.Router();


// 通过router.get，可以监听客户端的 GET 请求
//参数1是客户端请求的URL地址
//参数2是对应的处理函数
//通过send方法可以把处理好的内容发送给客户端

//注册请求
router.post('/user/register', userHandler.register)
// 登录请求
router.post('/user/login', userHandler.login);

export default router;