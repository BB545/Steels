const Product = require('../models/Product');

exports.searchResult = (req, res) => {
    const user = req.session.user;
    const isLogged = user !== undefined;
    const tag = req.query.tag;
    console.log(req.query.tag);
    if (!tag) {
        res.redirect('/searchResult?error=검색어를 입력하세요.');
    } else {
        Product.searchByTag(tag, (products) => {
            res.render('searchResult', { products, tag, isLogged, user });
        });
    }
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

exports.getPurchase = (req, res) => {
    const productId = req.params.id;
    Product.getPurchaseById(productId, (product) => {
        if (product.length > 0) {
            res.json(product[0]);
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    });
};

exports.SelectedPurchase = (req, res) => {
    const { selectedProducts } = req.body;
    Product.getPurchaseByIds(selectedProducts, (products) => {
      if (products.length > 0) {
        res.json({ success: true, products: products });
      } else {
        res.status(404).json({ error: 'Selected products not found' });
      }
    });
  };

exports.renderPurchasePage = (req, res) => {
    const user = req.session.user;
    const isLogged = user !== undefined;
    res.render('Purchase', { isLogged, user });
};

exports.renderPurchasePage2 = (req, res) => {
    const user = req.session.user;
    const isLogged = user !== undefined;
    res.render('Purchase2', { isLogged, user });
};

exports.postOrder = (req, res) => {
    const { fullname, tel, productData, sample6_address, sample6_detailAddress, payment } = req.body;

    const pur_num = `20240424000${productData.pro_num}`;
    const pur_dest = `${sample6_address} ${sample6_detailAddress}`;
    const pur_date = new Date().toISOString().slice(0, 10);
    const orderData = [fullname, tel, pur_num, productData.pro_name, pur_date, pur_dest, productData.pro_price, payment];

    Product.postOrder(orderData, (err, results) => {
        if (err) {
            console.error('Database error:', err);
            res.status(500).send('서버 오류: 주문을 처리하는 중 오류가 발생했습니다.');
            return;
        }
        res.send({ success: true, message: '주문이 완료되었습니다.' });
    })
}

exports.getMypage = (req,res) => {
    res.render('myPage')
}

exports.get_userOrders = (req, res) => {
    const user = req.session.user;
    const isLogged = user !== undefined;
    if (!user) {
        return res.status(401).send({ message: '로그인이 필요합니다.' });
    }

    Product.getUserOrders(user, (orders) => {
        res.json({ orders: orders, isLogged, user });
    });
};

exports.changeAddress = (req,res) => {
    const { orderNum, newAddress } = req.body;

    Product.updateAddress(newAddress, orderNum, (err, results) => {
        if (err) {
            console.error('Database error:', err);
            res.status(500).send('서버 오류: 배송지를 변경하는 중 오류가 발생했습니다.');
            return;
        }
        res.send({ success: true, message: '배송지가 성공적으로 변경되었습니다.' });
    });
}