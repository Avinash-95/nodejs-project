const jwt = require('jsonwebtoken');
const config = require('../config');


module.exports = function(req, res, next) {
    let token = res.headers["authorization"];

    if(token){
        jwt.verify(token, config.secret, function(err, decoded){
            if(err) {
                res.json({
                    success: false,
                    message: 'Failed tp authenticate token'
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        res.status(403).json({
            success: false,
            message: 'No token provided'
        });
    }
}