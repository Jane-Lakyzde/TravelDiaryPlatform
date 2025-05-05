import mysql from 'mysql2/promise';

// 创建数据库连接池
const pool = mysql.createPool({
    host: '127.0.0.1',      // 数据库地址
    user: 'root',           // 数据库用户名
    password: 'Rao20051212', // 你的数据库密码
    database: 'game_app', // 你的数据库名
    waitForConnections: true,
    connectionLimit: 10,    // 最大连接数
    queueLimit: 0
});

// 测试连接
pool.getConnection()
    .then(conn => {
        console.log('数据库连接成功!');
        conn.release();
    })
    .catch(err => {
        console.log('数据库连接失败:', err);
    });

export default pool;

//放与数据库相关的操作，以及对数据库的插入删除操作等等 API注册等就能直接调用这些函数