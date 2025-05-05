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

// 用户注册
export async function createUser(username, password) {
    try {
        const [result] = await pool.execute(
            'INSERT INTO users (username, password) VALUES (?, ?)',
            [username, password]
        );
        return result.insertId;
    } catch (error) {
        console.error('创建用户失败:', error);
        throw error;
    }
}

// 用户登录验证
export async function verifyUser(username, password) {
    try {
        const [rows] = await pool.execute(
            'SELECT * FROM users WHERE username = ? AND password = ?',
            [username, password]
        );
        return rows[0];
    } catch (error) {
        console.error('用户验证失败:', error);
        throw error;
    }
}

export default pool;

//放与数据库相关的操作，以及对数据库的插入删除操作等等 API注册等就能直接调用这些函数