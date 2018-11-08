var express = require('express');
var multer = require('multer')

var router = express.Router();
var upload = multer({ dest: './public/uploads/' })

var controller = require('../controller/user.contoller');
var validate = require('../validate/user.validation');

router.get('/', controller.index);

router.get('/search', controller.search);

router.get('/create', controller.create);

router.get('/:id', controller.get);

router.post('/create',
    upload.single('avatar'),
    validate.postCreate,
    controller.postCreate
);


module.exports = router;

