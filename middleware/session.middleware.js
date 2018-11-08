var shortid = require('shortid');

var db = require('../db');

module.exports = function(req , res , next){
    if(!req.signedCookies.sessionId){
        // create sesionid
        var sessionId = shortid.generate();
        res.cookie('sessionId' , sessionId , {
            signed: true
        });

        // push sessionIn to session in db.json
        db.get('sessions').push({
            id: sessionId
        }).write();
    }

    next();
}

