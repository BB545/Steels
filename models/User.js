const mysql = require('mysql2');
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'steels'
})

exports.postUser = (data, cb)=>{
    const sql = 'insert into user (username, phone, userpw) values (?,?,?)';
    const values = [data.username, data.phone, data.userpw];

    conn.query(sql, values, (err,rows)=>{
        if(err) throw err;
        cb(rows)
    })
}