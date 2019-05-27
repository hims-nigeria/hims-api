"use strict";

const model = require("../models/");

const dbutil   = require("../utils/dbUtil.js");
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

    console.log(req.body);

    // response has already been carried out
    if ( ( await dbutil.carryOutRegisOps(req,res,next) ) !== false ) return false;

    try {

        const healthFacilityId = util.createExternalId(healthCareName);

        const healthFacility = await (new model.healthFacilities({
            password         : req.hashedPassword,
            role             : "admin",
            location         : { state , lga , zone },
            healthFacilityId,
            healthCareName,
            fullName,
            email
        })).save();

        req.session.user = { fullName , role: "admin" , email , healthFacilityId } ;

        return res.status(200).json({ status: 200, message: "" });

    } catch(ex) {
        return next(ex);
    }

};

module.exports.registerNurse = async ( req , res , next ) => {

    const {
        address,
        fullName,
        password,
        rank,
        email,
        phoneNumber
    } = req.body;

    if ( ( await dbutil.carryOutRegisOps(req,res,next) ) !== false ) return false;

    const { healthFacilityId } = req.session.user;

    try {

        await dbutil.saveUniqueUsers( req , {
            idType: "nurseId",
            collection: "nurses",
            idCred: {
                email,
                phoneNumber
            },
            data: {
                password: req.hashedPassword,
                role: "nurse",
                fullName,
                phoneNumber,
                address,
                email,
                rank
            }
        });

        // since admin is registering nurses
        // no need to set req.session.user
        // only set req.session.user when nurse is logging in
        return res.status(200).json({ status: 200, message: { fullName, address, email, rank , nurseId: req.nurseId }});
    } catch(ex) {
        return next(ex);
    }

};


module.exports.registerAccountant = async ( req , res , next ) => {

    const {
        address,
        fullName,
        password,
        email,
        phoneNumber
    } = req.body;

    if ( ( await dbutil.carryOutRegisOps(req,res,next) ) !== false ) return false;

    const { healthFacilityId } = req.session.user;

    try {

        await dbutil.saveUniqueUsers( req , {
            idType: "accountantId",
            collection: "accountants",
            idCred: {
                email,
                phoneNumber
            },
            data: {
                password: req.hashedPassword,
                role: "accountant",
                fullName,
                phoneNumber,
                address,
                email
            }
        });

        return res.status(200).json({ status: 200 , message: { address , phoneNumber , email , accountantId: req.accountantId } });
    } catch(ex) {
        return next(ex);
    }

};

module.exports.registerDoctor = async ( req , res , next ) => {

    const {
        address,
        fullName,
        password,
        email,
        rank,
        phoneNumber,
        facebook,
        twitter,
        googlePlus,
        linkedin
    } = req.body;

    if ( ( await dbutil.carryOutRegisOps(req,res,next) ) !== false ) return false;

    const { healthFacilityId } = req.session.user;

    try {

        // TODO: DON'T FORGET TO HANDLE DEPARTMENT OF
        // DOCTOR

        const doctorId = util.createExternalId(email,phoneNumber,Date.now());

        const doctor = await ( new model.doctor({
            healthFacility: healthFacilityId,
            socialLinks: { facebook , twitter, googlePlus, linkedin },
            password: req.hashedPassword,
            role: "doctor",
            fullName,
            phoneNumber,
            doctorId,
            address,
            email
        })).save();

        return res.status(200).json({ status: 200 , message: { address , phoneNumber , email , doctorId } });
    } catch(ex) {
        return next(ex);
    }
};

module.exports.registerIntern = async ( req , res , next ) => {

    const {
        address,
        fullName,
        password,
        email,
        duty,
        phoneNumber
    } = req.body;

    if ( ( await dbutil.carryOutRegisOps(req,res,next) ) !== false ) return false;

    const { healthFacilityId } = req.session.user;

    try {

        await dbutil.saveUniqueUsers( req , {
            idType: "internId",
            collection: "interns",
            idCred: {
                email,
                phoneNumber
            },
            data: {
                password: req.hashedPassword,
                role: "intern",
                fullName,
                phoneNumber,
                address,
                email,
                duty
            }
        });

        return res.status(200).json({ status: 200 , message: { address , phoneNumber , email , duty , internId: req.internId } });
    } catch(ex) {
        return next(ex);
    }
};

module.exports.registerLaboratorist = async ( req , res , next ) => {

    const {
        address,
        fullName,
        password,
        email,
        phoneNumber
    } = req.body;

    if ( ( await dbutil.carryOutRegisOps(req,res,next) ) !== false ) return false;

    const { healthFacilityId } = req.session.user;

    try {

        await dbutil.saveUniqueUsers( req , {
            idType: "laboratoristId",
            collection: "laboratorists",
            idCred: {
                email,
                phoneNumber
            },
            data: {
                password: req.hashedPassword,
                role: "laboratorist",
                fullName,
                phoneNumber,
                address,
                email
            }
        });

        return res.status(200).json({ status: 200 , message: { address , phoneNumber , email , laboratoristId: req.laboratoristId } });
    } catch(ex) {
        return next(ex);
    }

};

module.exports.registerPharmacist = async ( req , res , next ) => {

    const {
        address,
        fullName,
        password,
        email,
        phoneNumber
    } = req.body;

    if ( ( await dbutil.carryOutRegisOps(req,res,next) ) !== false ) return false;

    const { healthFacilityId } = req.session.user;

    try {

        await dbutil.saveUniqueUsers( req , {
            idType: "pharmacistId",
            collection: "pharmacists",
            idCred: {
                email,
                phoneNumber
            },
            data: {
                password: req.hashedPassword,
                role: "pharmacist",
                fullName,
                phoneNumber,
                address,
                email
            }
        });

        return res.status(200).json({ status: 200 , message: { address , phoneNumber , email , pharmacistId: req.pharmacistId } });
    } catch(ex) {
        return next(ex);
    }

};

module.exports.registerClient = async ( req , res , next ) => {

    const {
        cardNumber,
        code,
        password,
        email,
        phoneNumber,
        fullName,
        bloodGroup,
        age,
        dob,
        weight,
        height,
        genotype,
        occupation
    } = req.body;

    console.log(req.body);

    if ( ( await dbutil.carryOutRegisOps(req,res,next) ) !== false ) return false;

    const { healthFacilityId } = req.session.user;

    try {

        req.body.emergencyContacts = JSON.parse(req.body.emergencyContacts);

        // const clientId = util.createExternalId(email,phoneNumber,Date.now());

        // const client = await ( new model.client({
        //     healthFacility: healthFacilityId,
        //     password: req.hashedPassword,
        //     role: "client",
        //     phoneNumber,
        //     clientId,
        //     email,
        //     personalInfo: { fullName, bloodGroup, age, dob, weight, height, genotype, occupation }
        // })).save();

        return res.status(200).json(
            {
                status: 200 ,
                message: {
                    fullName,
                    phoneNumber,
                    email,
                    clientId,
                    bloodGroup,
                    age,
                    dob,
                    weight,
                    height,
                    genotype,
                    occupation
                }
            }
        );
    } catch(ex) {
        return next(ex);
    }

};

module.exports.registerReceptionist = async ( req , res , next ) => {

    const {
        address,
        fullName,
        password,
        email,
        phoneNumber
    } = req.body;

    if ( ( await dbutil.carryOutRegisOps(req,res,next) ) !== false ) return false;

    const { healthFacilityId } = req.session.user;

    try {

        await dbutil.saveUniqueUsers( req , {
            idType: "receptionistId",
            collection: "receptionists",
            idCred: {
                email,
                phoneNumber
            },
            data: {
                password: req.hashedPassword,
                role: "receptionist",
                fullName,
                phoneNumber,
                address,
                email
            }
        });

        return res.status(200).json({ status: 200 , message: { address , phoneNumber , email , receptionistId: req.receptionistId } });
    } catch(ex) {
        return next(ex);
    }

};
