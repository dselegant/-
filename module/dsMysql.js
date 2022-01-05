const mysql = require('mysql');

let connect = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'yygl'
})

// 建立连接
connect.connect((err) => {
    if (err) {
        return console.log(err);
    }
    console.log("数据库连接成功");
})

function sqlQuery(strSql, arr) {
    return new Promise((resolve, reject) => {
        connect.query(strSql, arr, (err, res, field) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        })
    })
}

module.exports = sqlQuery;