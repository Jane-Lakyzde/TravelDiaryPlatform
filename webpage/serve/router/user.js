import { db } from '../db.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// 登录密钥
const secretKey = 'raosiying';

// 注册
export function register(req, res) {
  const userinfo = req.body;
  console.log(req.body);
  if( !userinfo.username || !userinfo.password) { return res.cc('用户名不合法') }
  //检查用户名是否被占用
  const sqlstr = 'select * from users where username=?';
  db.query(sqlstr, userinfo.username, (err, result) => {
    if(err) { return res.cc(err) }
    if(result.length > 0) { return res.cc('用户名被占用') }
  })
  //对密码加密
  userinfo.password = bcrypt.hashSync(userinfo.password, 10)
  //插入新用户
  const sql = 'insert into users set ?';
  db.query(sql, { username: userinfo.username, password: userinfo.password }, (err, result) => {
    if(err) {         
      if (err.code === 'ER_DUP_ENTRY') {
        return res.cc('用户名已存在');
      }
      return res.cc(err) }
    if(result.affectedRows !== 1) { return res.cc('注册失败') }
  })
  res.send({
    status: 0,
    msg: '注册成功',
  })
}

// 登录
export function login(req, res) {
  const body = req.body;

  req.session.user = req.body;
  req.session.islogin = true;

  const token = jwt.sign({ username: body.username }, secretKey, { expiresIn: '3000s' });

  res.send({
    status: 0,
    msg: 'POST 请求成功',
    token: token
  });
}
