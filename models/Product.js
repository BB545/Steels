const mysql = require('mysql2');
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'steels'
})

exports.searchByTag = (tag, cb) => {
    const query = 'SELECT * FROM product WHERE pro_tag LIKE ?';
    const tagParam = '%' + tag + '%';
    conn.query(query, tagParam, (err, results) => {
        if (err) {
            console.error('Error:', err);
            return cb([]);
        }
        cb(results);
    });
};