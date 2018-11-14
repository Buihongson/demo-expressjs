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

    /* get productId in db, if have productId then get quantity of productId
    *  else default for productId is 0
    */
    var count = db.get('sessions')
        .find({ id: sessionId })
        .get('cart.' + productId, 0)
        .value();

    /*
    *   Write to db if user add to card prodcuts 
    *   and plus quantity of productId if productId haved in db
    */
    db.get('sessions')
        .find({ id: sessionId })
        .set('cart.' + productId, count + 1)
        .write();

    res.redirect('/products');
};