const mysql = require('mysql2');
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'steels',
    timezone: '+09:00'
})

exports.searchByTag = (tag, cb) => {
    const query = 'SELECT * FROM product WHERE pro_tag LIKE ?';
    const tagParams = '%' + tag + '%'
    conn.query(query, [tagParams], (err, results) => {
        if (err) {
            console.error('Error:', err);
            return cb([]);
        }
        console.log(results);
        cb(results);
    });
};

exports.getProductByIds = (productIds, cb) => {
    const query = 'SELECT * FROM product WHERE pro_num IN (?)';
    conn.query(query, [productIds], (err, results) => {
        if (err) {
            cb(err, null);
        } else {
            cb(null, results);
        }
    });
};

exports.getPurchaseById = (id, cb) => {
    const query = 'SELECT * FROM product WHERE pro_num = ?';
    conn.query(query, [id], (err, results) => {
        if (err) throw err;
        cb(results);
    });
};

exports.postOrder = (orderData, cb) => {
    const query = 'insert into orderlist (username, phone, pur_num, pro_name, pur_date, pur_dest, pur_price, pur_pay) values (?, ?, ?, ?, ?, ?, ?, ?)'
    conn.query(query, orderData, (err,results) => {
        if (err) throw err;
        cb(null, results);
    })
}

exports.getUserOrders = (userPhone, cb) => {
    const sql = 'SELECT * FROM orderlist WHERE phone = ?';
    conn.query(sql, [userPhone], (err, results) => {
        if (err) throw err;
        console.log(results);
        cb(results);
    });
};