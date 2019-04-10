"use strict";

const HealthFacility = require("../models/HealthFacility.js");

const util     = require("../utils/util.js");
const crypto   = require("crypto");
const mongoose = require("mongoose");

module.exports.registerAdmin = async (req,res,next) => {

    const {
        confirmPassword,
        healthCareName,
        activationKey,
        fullName,
        password,
        email,
        state,
        zone,
        lga
    } = req.body;


    const validateInput = util.validateClientInput(
        {
            confirmPassword,
            healthCareName,
            activationKey,
            fullName,
            password,
            email,
            state,
            lga
        }
    );    

    if ( validateInput.status ) return res.status(validateInput.status).json({
        status: validateInput.status,
        message: validateInput.message
    });

    const hashedPassword = await util.hashPassword(password,confirmPassword,next);

    if ( hashedPassword.status ) return res.status(hashedPassword.status).json({
        status: hashedPassword.status,
        message: hashedPassword.message
    });
    
    const checkEmail = await util.checkUserEmail(email,next);

    if ( checkEmail.status ) return res.status(checkEmail.status).json({
        status: checkEmail.status,
        message: checkEmail.message
    });

    try {

        const healthFacility = await (new HealthFacility({
            
            healthFacilityId : util.createExternalId(healthCareName,Date.now()),

            hospitalName : healthCareName,
            password     : hashedPassword,
            role         : "admin",
            fullName,
            email,
            location: { state , lga , zone }
        })).save();

        req.session.adminUser = { fullName , role: "admin" , email } ;

        return res.status(200).json({
            status: 200,
            message: {
                fullName,
                laboratorist: 0,
                birthReport : 0,
                deathReport : 0,
                pharamcist  : 0,
                accoutant   : 0,
                opsReport   : 0,
                doctor      : 0,
                client      : 0,
                nurse       : 0,
                payment     : 0,
                intern      : 0
            }
        });

    } catch(ex) {
        return next(ex);
    }

};
