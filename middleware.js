"use strict";

const http = require("http");

module.exports.isLogin = (req,res,next) => {
    
    const sessionObject = req.session.adminUser; // other session object goes here
    
    if ( ! sessionObject ) {
        return res.status(401).json({
            status: 401,
            message: "You need to login to access the dashboard"
        });
    }

    req.__tempSessionObject = sessionObject;
    
    return next();
};
