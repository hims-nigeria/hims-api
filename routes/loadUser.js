"use strict";

const express = require("express");
const loadUser = express.Router();

const {
    loadUserUniqueInterface
} = require("../utils/dbUtil.js");

const {
    nurses,
    doctors,
    interns,
    clients,
    pharmacists,
    accountants,
    laboratorists
}  = require("../models/");


loadUser.get("/:type", (req,res,next) => {

    let error = -1;

    req.__internalProps = {

        collection: ( () => {

            switch(req.params.type) {

            case "laboratorist": return { type: "laboratorists" , colObject: laboratorists };
            case "accountant"  : return { type: "accountants"   , colObject: accountants };
            case "pharmacist"  : return { type: "pharmacists"   , colObject: pharmacists };
            case "client"      : return { type: "clients"       , colObject: clients };
            case "doctor"      : return { type: "doctors"       , colObject: doctors };
            case "intern"      : return { type: "interns"       , colObject: interns };
            case "nurse"       : return { type: "nurses"        , colObject: nurses };
            default            : error = 0; return {};

            }

        })()
    };

    if ( error === -1 )
        return next();

    return next("user type is not recognized");

}, loadUserUniqueInterface );

module.exports = loadUser;
