var db = require('../db');

module.exports.addToCart = function (req, res, next) {
    // get productId
    var productId = req.params.productId;
    // get sessionId
    var sessionId = req.signedCookies.sessionId;

    if (!sessionId) {
        res.redirect('/products');
        return;
    }

    var count = db.get('sessions')
        .find({ id: sessionId })
        .get('cart.' + productId, 0)
        .value();

    db.get('sessions')
        .find({ id: sessionId })
        .set('cart.' + productId, count + 1)
        .write();

    res.redirect('/products');
};