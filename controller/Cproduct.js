const Product = require('../models/Product');

exports.searchResult = (req, res) => {
    const user = req.session.user;
    const isLogged = user !== undefined;
    const tag = req.query.tag;
    console.log(req.query.tag);
    if (!tag) {
        return res.render('searchResult', { products: [], tag: '검색 결과가 없습니다.', isLogged, user });
    }
    Product.searchByTag(tag, (products) => {
        res.render('searchResult', { products, tag: tag, isLogged, user });
    });
};

exports.getCartPage = (req, res) => {
    const basket = req.session.basket || [];
    const user = req.session.user;
    const isLogged = user !== undefined;

    if (basket.length === 0) {
        return res.render('Cart', { items: [], message: '장바구니가 비었습니다', isLogged, user, totalPrice: 0 });
    }

    const productIds = basket.map(item => parseInt(item.id, 10));
    const quantities = basket.reduce((obj, item) => {
        obj[item.id] = item.quantity;
        return obj;
    }, {});

    Product.getProductByIds(productIds, (error, products) => {
        if (error) {
            return res.status(500).send('내부 서버 오류');
        }

        const items = products.map(product => {
            return {
                ...product,
                quantity: quantities[product.pro_num]
            };
        });

        const totalPrice = items.reduce((sum, item) => sum + item.pro_price * item.quantity, 0);

        res.render('Cart', { items, message: '', isLogged, user, totalPrice });
    });
};


exports.postCartPage = (req, res) => {
    const basket = req.body.basket || [];
    req.session.basket = basket;
    res.json({ success: true });
};