var express = require('express');
var router = express.Router();

var controller = require('../controller/cart.controller');

router.get('/add:productId', controller.addToCart);

// router.get('/search' , controller.search);

module.exports = router;