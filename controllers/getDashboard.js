"use strict";

const model = require("../models/");
const util = require("../utils/util.js");

module.exports = async (req,res,next) => {

    const { fullName , role , healthFacilityId } = req.session.user;

    try {

        const data = {};

        switch( role ) {
        case "admin":
            Object.assign(data,{
                status: 200,
                message: {
                    dashboardInfo: (await model.healthFacilities.findOne( { healthFacilityId }))._doc.dashboardInfo,
                    fullName,
                    role
                }
            });
            break;
        }

        return res.status(200).json(data);

    } catch(ex) {
        console.log(ex);
        return next(ex);
    }
};
