const Product = require('../models/Product');
const { generateOrderNumber } = require('../utils/orderNumberGenerator');

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
    const { fullname, tel, productData, sample6_address, sample6_detailAddress, payment, idempotencyKey } = req.body;

    if (!fullname || !tel || !productData || !sample6_address || !payment) {
        return res.status(400).json({ 
            success: false, 
            message: '필수 정보가 누락되었습니다.' 
        });
    }

    // 중복 주문 방지: idempotencyKey가 있으면 기존 주문 확인
    if (idempotencyKey) {
        Product.checkIdempotencyKey(idempotencyKey, (err, exists, existingOrder) => {
            if (err) {
                console.error('Idempotency check error:', err);
                return res.status(500).json({ 
                    success: false, 
                    message: '서버 오류가 발생했습니다.' 
                });
            }

            if (exists) {
                return res.json({ 
                    success: true, 
                    message: '이미 처리된 주문입니다.', 
                    orderNumber: existingOrder.pur_num,
                    isDuplicate: true
                });
            }

            processNewOrder();
        });
    } else {
        processNewOrder();
    }

    function processNewOrder() {
        let pur_num;
        let attempts = 0;
        const maxAttempts = 5;

        function generateAndCheck() {
            pur_num = generateOrderNumber(productData.pro_num);
            
            Product.checkOrderNumberExists(pur_num, (err, exists) => {
                if (err) {
                    console.error('Order number check error:', err);
                    return res.status(500).json({ 
                        success: false, 
                        message: '서버 오류가 발생했습니다.' 
                    });
                }

                // 중복되면 다시 생성 (최대 5번 시도)
                if (exists && attempts < maxAttempts) {
                    attempts++;
                    generateAndCheck();
                    return;
                }

                if (exists) {
                    return res.status(500).json({ 
                        success: false, 
                        message: '주문번호 생성에 실패했습니다. 다시 시도해주세요.' 
                    });
                }

                const pur_dest = `${sample6_address} ${sample6_detailAddress}`;
                const pur_date = new Date().toISOString().slice(0, 10);
                const orderData = [
                    fullname, 
                    tel, 
                    pur_num, 
                    productData.pro_name, 
                    pur_date, 
                    pur_dest, 
                    productData.pro_price, 
                    payment
                ];

                Product.postOrder(orderData, (err, results) => {
                    if (err) {
                        if (err.code === 'ER_DUP_ENTRY') {
                            return res.status(409).json({ 
                                success: false, 
                                message: '중복된 주문입니다. 잠시 후 다시 시도해주세요.' 
                            });
                        }
                        
                        console.error('Database error:', err);
                        return res.status(500).json({ 
                            success: false, 
                            message: '서버 오류: 주문을 처리하는 중 오류가 발생했습니다.' 
                        });
                    }
                    
                    res.json({ 
                        success: true, 
                        message: '주문이 완료되었습니다.',
                        orderNumber: pur_num
                    });
                });
            });
        }

        generateAndCheck();
    }
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