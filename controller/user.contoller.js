var db = require('../db');
var shortid = require('shortid');
var User = require('../models/users.model');

module.exports.index = async function (req, res) {
    var users = await User.find();
    res.render('users/index', {
        users: users
    });
};

module.exports.search = async function (req, res) {
    if (req.query.q) {
        const regex = new RegExp(escapeRegex(req.query.q), 'gi');

        // User.find({ "name": regex }, function(err, allUser) {
        //     if(err) {
        //         console.log(err);
        //     } else {
        //         res.render("users/index", { 
        //            users: allUser,
        //            keyWord: req.query.q
        //         });
        //     }
        // }); 

        var matchedUsers = await User.find({ "name": regex });

        res.render('users/index', {
            users: matchedUsers,
            keyWord: req.query.q
        });
    }
};

module.exports.create = function (req, res) {
    res.render('users/create');
};

module.exports.get = function (req, res) {
    var id = req.params.id;

    var user = db.get('users').find({ id: id }).value();

    res.render('users/view', {
        user: user
    });
};

module.exports.postCreate = function (req, res) {
    req.body.id = shortid.generate();
    req.body.avatar = req.file.path.split('/').slice(1).join('/');

    db.get('users').push(req.body).write();
    res.redirect('/users');
};

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};