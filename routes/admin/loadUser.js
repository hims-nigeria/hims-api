"use strict";

const express = require("express");
const loadUser = express.Router();

const {
    loadUserUniqueInterface
} = require("../../utils/dbUtil.js");

const {
    nurses,
    doctors,
    interns,
    clients,
    pharmacists,
    accountants,
    departments,
    laboratorists,
    interventions,
    receptionists,
    subinterventions
}  = require("../../models/");

loadUser.get("/:type", (req,res,next) => {

    let error = -1;
    console.log(req.params.type);
    req.__internalProps = {

        collection: ( () => {

            switch(req.params.type) {
            case "subintervention": return { type: "subinterventions" , colObject: subinterventions };
            case "intervention"   : return { type: "interventions"    , colObject: interventions };
            case "department"     : return { type: "departments"      , colObject: departments };
            case "laboratorist"   : return { type: "laboratorists"    , colObject: laboratorists };
            case "receptionist"   : return { type: "receptionists"    , colObject: receptionists };
            case "accountant"     : return { type: "accountants"      , colObject: accountants };
            case "pharmacist"     : return { type: "pharmacists"      , colObject: pharmacists };
            case "client"         : return { type: "clients"          , colObject: clients };
            case "doctor"         : return { type: "doctors"          , colObject: doctors };
            case "intern"         : return { type: "interns"          , colObject: interns };
            case "nurse"          : return { type: "nurses"           , colObject: nurses };
            default               : error = 0; return {};

            }

        })()
    };

    if ( error === -1 )
        return next();

    return next("user type is not recognized");

}, loadUserUniqueInterface );

module.exports = loadUser;
