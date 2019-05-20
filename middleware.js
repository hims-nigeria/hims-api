"use strict";

const http = require("http");

module.exports.isLogin = (req,res,next) => {
    console.log(req.session.user);
    if ( ! req.session.user ) {
        return res.status(401).json({
            status: 401,
            message: "You need to login to access the dashboard"
        });
    }
    
    return next();
};
