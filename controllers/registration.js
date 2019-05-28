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
        department,
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

        await dbutil.saveUniqueUsers( req , {
            idType: "doctorId",
            collection: "doctors",
            idCred: {
                email,
                phoneNumber
            },
            data: {
                password: req.hashedPassword,
                role: "doctor",
                department,
                fullName,
                phoneNumber,
                address,
                email,
                rank,
                socialLinks: { facebook , twitter, googlePlus, linkedin }
            }
        });
        return res.status(200).json({ status: 200 , message: { address , phoneNumber , email , doctorId: req.doctorId } });
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
        address,
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

    if ( ( await dbutil.carryOutRegisOps(req,res,next) ) !== false ) return false;

    const { healthFacilityId } = req.session.user;

    try {

        req.body.emergencyContacts = JSON.parse(req.body.emergencyContacts);

        await dbutil.saveUniqueUsers( req , {
            idType: "clientId",
            collection: "clients",
            idCred: {
                email,
                phoneNumber
            },
            data: {
                emergencyContacts: req.body.emergencyContacts,
                password: req.hashedPassword,
                role: "client",
                fullName,
                phoneNumber,
                address,
                email,
                cardNumber,
                bloodGroup,
                age,
                dob,
                weight,
                height,
                genotype,
                occupation
            }
        });

        return res.status(200).json(
            {
                status: 200 ,
                message: {
                    fullName,
                    phoneNumber,
                    email,
                    bloodGroup,
                    age,
                    dob,
                    weight,
                    height,
                    genotype,
                    occupation,
                    emergencyContacts: req.body.emergencyContacts,
                    clientId: req.clientId
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

module.exports.registerIntervention = async ( req , res , next ) => {

    const { interventionName } = req.body;

    const validateInput = util.validateClientInput({ ...req.body });

    if ( validateInput.status ) return res.status(validateInput.status).json({
        status: validateInput.status,
        message: validateInput.message
    });

    const { healthFacilityId } = req.session.user;

    try {

        await dbutil.saveUniqueUsers( req , {
            notUser: true,
            idType: "interventionId",
            collection: "interventions",
            idCred: { interventionName },
            data: { interventionName }
        });

        return res.status(200).json({ status: 200 , message: { interventionName , interventionId: req.interventionId }});

    } catch(ex) {
        return next(ex);
    };
};


module.exports.registerSubIntervention = async ( req , res , next ) => {

    const { interventionName , subInterventionName } = req.body;

    const validateInput = util.validateClientInput({ ...req.body });

    if ( validateInput.status ) return res.status(validateInput.status).json({
        status: validateInput.status,
        message: validateInput.message
    });

    const { healthFacilityId } = req.session.user;

    try {

        await dbutil.saveUniqueUsers( req , {
            notUser: true,
            idType: "subInterventionId",
            collection: "subinterventions",
            idCred: { interventionName,subInterventionName },
            data: { interventionName, subInterventionName }
        });

        return res.status(200).json({ status: 200 , message: { interventionName , subInterventionName , subInterventionId: req.subInterventionId }});

    } catch(ex) {
        return next(ex);
    };
};

module.exports.registerDepartment = async ( req , res , next ) => {

    const { name , description } = req.body;

    const validateInput = util.validateClientInput({ ...req.body });

    if ( validateInput.status ) return res.status(validateInput.status).json({
        status: validateInput.status,
        message: validateInput.message
    });

    const { healthFacilityId } = req.session.user;

    try {

        await dbutil.saveUniqueUsers( req , {
            notUser: true,
            idType: "departmentId",
            collection: "departments",
            idCred: { name , description },
            data: { name, description }
        });

        return res.status(200).json({ status: 200 , message: { name , description , departmentId: req.departmentId }});

    } catch(ex) {
        return next(ex);
    };
};
