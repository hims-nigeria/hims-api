"use strict";

const express = require("express");
const adminRoute = express.Router();

const middleware  = require("../middleware.js");

const {
    dashboardRoute,
    loadUserRoute,
    registerRoute,
    logoutRoute,
    loginRoute
} = require("./admin/");


adminRoute.use("/register", registerRoute);
adminRoute.use("/login", loginRoute );
adminRoute.use("/loaduser", loadUserRoute );
adminRoute.use("/logout" , logoutRoute );
adminRoute.use("/dashboard", middleware.isLogin , dashboardRoute );

module.exports = adminRoute;
