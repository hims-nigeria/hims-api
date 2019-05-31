"use strict";

const express     = require("express");
const multer      = require("multer");
const adminRoute  = express.Router();

const middleware  = require("../middleware.js");

const {
    healthFacilities
} = require("../models/");

const {
    hashPassword
} = require("../utils/util.js");

const {
    deleteUserRoute,
    dashboardRoute,
    loadUserRoute,
    registerRoute,
    logoutRoute,
    loginRoute,
    editRoute
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

adminRoute.use(
    "/edit",
    middleware.isLogin,
    editRoute
);

adminRoute.post(
    "/update-profile",
    multer().fields([]),
    [ middleware.isLogin , middleware.isAdmin ],
    async ( req , res , next ) => {

        try {

            const { healthFacilityId } = req.session.user;

            if ( ({}).hasOwnProperty.call(req.body, "currentPassword") ) {

                const hashedPassword = await hashPassword(
                    req.body.password,
                    req.body.confirmPassword,
                    next
                );

                if ( hashedPassword.status ) return res.status(hashedPassword.status).json({
                    status: hashedPassword.status,
                    message: hashedPassword.message
                });

                const result = await healthFacilities.findOneAndUpdate(
                    { healthFacilityId } ,
                    { $set: { password: hashedPassword } },
                    { new: true , fields: { password : false , _id: false } }
                ).lean();

                return res.status(200).json({ status: 200 , message: result });
            }

            const result = await healthFacilities.findOneAndUpdate(
                { healthFacilityId },
                { $set:  { ...req.body } },
                { new: true , fields:  { password: false , _id: false } }
            ).lean();

            return res.status(200).json({ status: 200 , message: result });

        } catch(ex) {
            return next(ex);
        }
    }
);


module.exports = adminRoute;
