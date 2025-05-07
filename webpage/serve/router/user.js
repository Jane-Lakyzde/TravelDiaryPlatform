import express from 'express';
import { createUser, verifyUser } from '../db.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const router = express.Router();

// 登录密钥
const secretKey = 'raosiying';

// 用户注册
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const userId = await createUser(username, password);
        res.json({ 
            status: 0,
            message: '注册成功',
            data: { userId }
        });
    } catch (error) {
        res.json({ 
            status: 1,
            message: '注册失败',
            error: error.message
        });
    }
});

// 用户登录
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await verifyUser(username, password);
        if (user) {
            // 生成 session
            req.session.user = user;
            req.session.islogin = true;
            
            // 生成 token
            const token = jwt.sign({ username: username }, secretKey, { expiresIn: '3000s' });
            
            res.json({
                status: 0,
                message: '登录成功',
                data: user,
                token: token
            });
        } else {
            res.json({
                status: 1,
                message: '用户名或密码错误'
            });
        }
    } catch (error) {
        res.json({
            status: 1,
            message: '登录失败',
            error: error.message
        });
    }
});

export default router;
