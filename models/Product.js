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

exports.getPurchaseByIds = (ids, cb) => {
    const query = 'SELECT * FROM product WHERE pro_num IN (?)';
    conn.query(query, [ids], (err, results) => {
      if (err) throw err;
      cb(results);
    });
}

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

/**
 * 주문번호 중복 체크
 * @param {string} orderNumber - 체크할 주문번호
 * @param {function} cb - 콜백 함수 (err, exists)
 */
exports.checkOrderNumberExists = (orderNumber, cb) => {
    const sql = 'SELECT COUNT(*) as count FROM orderlist WHERE pur_num = ?';
    conn.query(sql, [orderNumber], (err, results) => {
        if (err) {
            return cb(err, null);
        }
        const exists = results[0].count > 0;
        cb(null, exists);
    });
};

/**
 * 중복 주문 방지를 위한 idempotency key 체크
 * @param {string} idempotencyKey - 중복 방지 키
 * @param {function} cb - 콜백 함수 (err, exists, orderData)
 */
exports.checkIdempotencyKey = (idempotencyKey, cb) => {
    const sql = 'SELECT * FROM orderlist WHERE pur_num = ? OR idempotency_key = ? LIMIT 1';
    conn.query(sql, [idempotencyKey, idempotencyKey], (err, results) => {
        if (err) {
            return cb(err, null, null);
        }
        const exists = results.length > 0;
        cb(null, exists, exists ? results[0] : null);
    });
};