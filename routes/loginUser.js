const express = require('express');
const router = express.Router();
const controller = require('../controller/Cuser')

router.post('/', controller.post_login)

module.exports = router;