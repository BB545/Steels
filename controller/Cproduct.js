const Product = require('../models/Product');

exports.searchResult = (req, res) => {
    const tag = req.query.tag;
    if (!tag) {
        return res.render('searchResult', { products: [], tag: '검색 결과가 없습니다.' });
    }
    Product.searchByTag(tag, (products) => {
        res.render('searchResult', { products, tag: tag });
    });
};