import mysql from 'mysql2/promise';

export const db = await mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'Rao20051212',
    database: 'game_app',
});

//放与数据库相关的操作，以及对数据库的插入删除操作等等 API注册等就能直接调用这些函数