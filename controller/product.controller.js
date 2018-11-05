var db = require('../db');

module.exports.index = function (req, res) {
    var page = parseInt(req.query.page) || 1; //n
    var perPage = 8; //x
    var arr = [];

    var start = (page - 1) * perPage;
    var end = page * perPage;

    var totalProduct = Math.ceil(db.get('products').value().length / perPage);

    if (page === 1) {
        arr.push(page, page + 1, page + 2, 'Next', 'Last')
    }

    if (page > 1 && page < totalProduct) {
        arr.push('First', 'Prev', page - 1, page, page + 1, 'Next', 'Last')
    }

    if (page === totalProduct) {
        arr.push('First', 'Prev', page - 2, page - 1, page)
    }

    res.render('products', {
        products: db.get('products').value().slice(start, end),
        page: page,
        totalPages: arr,
        lastPage: totalProduct
    });
};

// module.exports.search = function (req, res) {
//     var q = req.query.q;

//     var matchedProducts = db.get('products').filter(function (product) {
//         return product.name.toLowerCase().indexOf(q.toLowerCase()) != -1;
//     }).value();

//     var page = parseInt(req.query.page) || 1; //n
//     var perPage = 8; //x
//     var arr = [];

//     var start = (page - 1) * perPage;
//     var end = page * perPage;

//     var totalProduct = Math.ceil(db.get('products').value().length / perPage);

//     if (page === 1) {
//         arr.push(page, page + 1, page + 2, 'Next', 'Last')
//     }

//     if (page > 1 && page < totalProduct) {
//         arr.push('First', 'Prev', page - 1, page, page + 1, 'Next', 'Last')
//     }

//     if (page === totalProduct) {
//         arr.push('First', 'Prev', page - 2, page - 1, page)
//     }

//     res.render('products', {
//         products: db.get('products').value().slice(start, end),
//         page: page,
//         totalPages: arr,
//         lastPage: totalProduct,
//         products: matchedProducts,
//         keyWord: q
//     });

//     // res.render('products', {
//     //     products: matchedProducts,
//     //     keyWord: q
//     // });
// };

