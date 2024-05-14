const express = require('express');
const router = express.Router();
const controller = require('../controller/Cuser')

router.post('/signup', controller.post_user)

module.exports = router;