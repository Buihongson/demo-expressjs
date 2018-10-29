var md5 = require('md5');

var db = require('../db');

module.exports.login = function(req , res){
    res.render('auth/login');
};

module.exports.postLogin = function(req , res){
    var email = req.body.email;
    var password = req.body.password;

    var user = db.get('users').find({ email: email}).value();

    // check email
    if(!user){
        res.render('auth/login' , {
            errors: [
                'User does not exist.'
            ],
            values: req.body
        });
    }

    var hashedPassword = md5(password);

    // check password
    if(user.password !== hashedPassword){
        res.render('auth/login' , {
            errors: [
                'Wrong password.'
            ],
            values: req.body
        });
    }

    res.cookie('userId' , user.id , {
        signed: true 
    }); 
    res.redirect('/users');
};