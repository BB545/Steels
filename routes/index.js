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
// router.get('/Purchase', controller.Purchase)

router.post('/login', controller2.post_login)
router.post('/signup', controller2.post_user)
router.get('/logout', controller2.get_logoutSession)

router.get('/search', controller3.searchResult);
router.get('/cart', controller3.getCartPage);
router.post('/cart', controller3.postCartPage);
router.get('/purchase/:id', controller3.getPurchase);
router.get('/purchase', controller3.renderPurchasePage);
router.post('/order', controller3.postOrder);

module.exports = router;