const express = require('express');
const router = express.Router();
const controller = require('../controller/Cmain')

router.get('/', controller.main)
router.get('/productAll', controller.productAll)
router.get('/productLiving', controller.productLiving)
router.get('/productOut', controller.productOut)
router.get('/productLife', controller.productLife)

module.exports = router;