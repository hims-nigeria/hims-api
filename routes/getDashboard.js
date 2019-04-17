"use strict";

const express   = require("express");
const dashboard = express.Router();

const model = require("../models/");
const util = require("../utils/util.js");

dashboard.get("/" , async (req,res,next) => {

    const { fullName , role , healthFacilityId } = req.session.user;
    console.log(healthFacilityId);
    try {

        const data = {};

        switch( role ) {
        case "admin":
            Object.assign(data,{
                status: 200,
                message: {
                    dashboardInfo: (await model.healthFacility.findOne( { healthFacilityId }))._doc.dashboardInfo,
                    fullName,
                    role
                }
            });
            break;
        }
        return res.status(200).json(data);

    } catch(ex) {
        return next(ex);
    }

});

module.exports = dashboard;
