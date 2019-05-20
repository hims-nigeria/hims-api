"use strict";

const express = require("express");
const loadUser = express.Router();

const {
    loadUserUniqueInterface
} = require("../utils/dbUtil.js");

const {
    nurse,
    doctor,
    intern,
    client,
    pharmacist,
    accountants,
    laboratorist
}  = require("../models/");


loadUser.get("/:type", (req,res,next) => {

    let error = -1;

    req.__internalProps = {

        collection: ( () => {

            switch(req.params.type) {

            case "laboratorist": return { type: "laboratorists" , colObject: laboratorist };
            case "accountant"  : return { type: "accountants"   , colObject: accountants };
            case "pharmacist"  : return { type: "pharmacists"   , colObject: pharmacist };
            case "client"      : return { type: "clients"       , colObject: client };
            case "doctor"      : return { type: "doctors"       , colObject: doctor };
            case "intern"      : return { type: "interns"       , colObject: intern };
            case "nurse"       : return { type: "nurses"        , colObject: nurse };
            default            : error = 0; return {};

            }

        })()
    };

    if ( error === -1 )
        return next();

    return next("user type is not recognized");

}, loadUserUniqueInterface );

module.exports = loadUser;
