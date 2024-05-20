const express = require('express');
const router = express.Router();
const controller = require('../controller/Cmain')
const controller2 = require('../controller/Cuser')
const controller3 = require('../controller/Cproduct')

router.get('/', controller2.get_loginSession)
router.get('/productAll', controller.productAll)
router.get('/productLiving', controller.productLiving)
router.get('/productOut', controller.productOut)
router.get('/productLife', controller.productLife)
router.get('/Customer', controller.Customer)
router.get('/Mypage', controller.Mypage)
router.get('/Purchase', controller.Purchase)

router.post('/login', controller2.post_login)
router.post('/signup', controller2.post_user)
router.get('/logout', controller2.get_logoutSession)

router.get('/search', controller3.searchResult);
router.get('/cart', controller3.cartResult);
router.get('/addCart', controller3.addToCart);
// router.get('/products', productController.getAllProducts);
// router.get('/product/:id', productController.getProductById);


module.exports = router;