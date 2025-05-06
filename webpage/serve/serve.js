//Express框架
//全局使用nodemon可以自动监听代码变化 nodemon serve.js

import express from 'express';
import cors from 'cors';
import router from './api/user.js';
import session from 'express-session';
import jwt from 'jsonwebtoken';
import { expressjwt } from 'express-jwt';


const app = express();   //创建web服务器
const PORT = 3000;
const secretKey = 'raosiying';

//app.use就是用来注册全局中间件的
app.use(express.json());
//之后可以通过req.session来访问和使用session对象
app.use(session({
    secret: 'itheima',
    resave: false,
    saveUninitialized: true,
}));                       
//unless配置的是不需要访问权限的，其他的都需要token认证
//expressjwt配置成功后，可以把间隙出来的信息挂载再req.user中
//注册将JWT字符串还原成JSON对象的中间件
app.use(expressjwt({
    secret: secretKey,
    algorithms: ['HS256']
}).unless({ path: [/^\/api\//]})); 
//如果客户端发送的token过期或者不合法会报错
app.use((err, req, res, next) =>{
    if(err.name === 'UnauthorizedErrow') {
        return res.send({
            status: 401,
            msg: '无效的token'
        })
    }
    res.send({
        status: 500,
        mag: '未知错误'
    })
})
//解析表单数据的中间件
app.use(express.urlencoded({ extended: false }));   
//优化封装函数
app.use((req, res, next) => {
    res.cc = function(err, status = 1) {
        res.send({
            status,
            msg: err instanceof Error ? err.message : err
        })
    }
    next();
})
//在路由之前配置跨域的中间件
app.use(cors());           
//加上访问前缀‘/api’
app.use('/api', router);   



app.listen(3000, () => {
    console.log('Server running on http://127.0.0.1');
});
