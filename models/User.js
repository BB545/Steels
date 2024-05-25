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

exports.loginUser = (data, cb) => {
    const sql = 'SELECT * FROM user WHERE phone = ? AND userpw = ?';
    const values = [data.loginPhone, data.loginUserpw];
    conn.query(sql, values, (err, rows) => {
        if (err) throw err;
        cb(rows);
    });
};

exports.fromCustomer = (data, cb) => {
    const sql = 'INSERT INTO customer (username, phone, usercontent, date) VALUES (?, ?, ?, ?)';
    const values = [data.username, data.phone, data.usercontent, data.date];
    conn.query(sql, values, (err, results) => {
            if (err) {
                return cb(err, null);
            }
            return cb(null, results);
        }
    );
}

exports.getCustomer = (userPhone, cb) => {
    const sql = 'SELECT * FROM customer WHERE phone = ?';
    conn.query(sql, [userPhone], (err, results) => {
        if (err) throw err;
        console.log(results);
        cb(results);
    });
}