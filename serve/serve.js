//Express框架
//全局使用nodemon可以自动监听代码变化 nodemon serve.js

import express from 'express';
import cors from 'cors';
import session from 'express-session';
import userRouter from './router/user.js';

const app = express();   //创建web服务器
const PORT = 3000;

//app.use就是用来注册全局中间件的
app.use(express.json());
//之后可以通过req.session来访问和使用session对象
app.use(session({
    secret: 'itheima',
    resave: false,
    saveUninitialized: true,
}));                       
//解析表单数据的中间件
app.use(express.urlencoded({ extended: false }));   
//在路由之前配置跨域的中间件
app.use(cors());           
//加上访问前缀'api'
app.use('/api/user', userRouter);   

// 错误处理中间件
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({
        status: 1,
        message: '服务器内部错误'
    });
});

app.listen(PORT, () => {
    console.log(`服务器运行在 http://127.0.0.1:${PORT}`);
});
