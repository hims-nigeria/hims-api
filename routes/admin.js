"use strict";

const express = require("express");
const multer  = require("multer");
const adminRoute = express.Router();

const middleware  = require("../middleware.js");

const {
    deleteUserRoute,
    dashboardRoute,
    loadUserRoute,
    registerRoute,
    logoutRoute,
    loginRoute
} = require("./admin/");


adminRoute.use("/register" , registerRoute);
adminRoute.use("/login"    , loginRoute );
adminRoute.use("/loaduser" , middleware.isLogin , loadUserRoute );
adminRoute.use("/logout"   , middleware.isLogin , logoutRoute );
adminRoute.use("/dashboard", middleware.isLogin , dashboardRoute );
adminRoute.use(
    "/delete",
    middleware.isLogin,
    deleteUserRoute
);

module.exports = adminRoute;
