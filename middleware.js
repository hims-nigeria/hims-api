"use strict";

const http = require("http");

module.exports.isAdminLogin = (req,res,next) => {
    if ( ! req.session.adminUser ) {
        return res.status(401).json({
            status: 401,
            message: "You need to login to access the dashboard"
        });
    }
    return next();
};
