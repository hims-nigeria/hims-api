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

    // response has already been carried out
    if ( ( await dbutil.carryOutRegisOps(req,res,next) ) !== false ) return false;

    try {

        const healthFacilityId = util.createExternalId(healthCareName,Date.now());

        const healthFacility = await (new model.healthFacility({
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
        confirmPassword,
        rank,
        email,
        phoneNumber
    } = req.body;

    if ( ( await dbutil.carryOutRegisOps(req,res,next) ) !== false ) return false;

    const { healthFacilityId } = req.session.user;

    try {
        
        const nurseId = util.createExternalId(email,phoneNumber,Date.now());

        const nurse = await ( new model.nurse({
            healthFacility: (await model.healthFacility.findOne( { healthFacilityId } ))._id,
            password: req.hashedPassword,
            role: "nurse",
            fullName,
            phoneNumber,
            nurseId,
            address,
            email,
            rank
        })).save();

        // since admin is registering nurses
        // no need to set req.session.user
        // only set req.session.user when nurse is logging in
        return res.status(200).json({ status: 200, message: { fullName, address, email, rank , nurseId }});
    } catch(ex) {
        return next(ex);
    }

};


module.exports.registerAccountant = async ( req , res , next ) => {

    const {
        address,
        fullName,
        password,
        confirmPassword,
        email,
        phoneNumber
    } = req.body;

    if ( ( await dbutil.carryOutRegisOps(req,res,next) ) !== false ) return false;

    const { healthFacilityId } = req.session.user;

    try {

        const accountantId = util.createExternalId(email,phoneNumber,Date.now());

        const accountant = await ( new model.accountants({
            healthFacility: (await model.healthFacility.findOne( { healthFacilityId } ))._id,
            password: req.hashedPassword,
            role: "accountant",
            fullName,
            phoneNumber,
            accountantId,
            address,
            email
        })).save();

        return res.status(200).json({ status: 200 , message: { address , phoneNumber , email , accountantId } });
    } catch(ex) {
        return next(ex);
    }

};

module.exports.registerDoctor = async ( req , res , next ) => {

    const {
        address,
        fullName,
        password,
        confirmPassword,
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
            healthFacility: (await model.healthFacility.findOne( { healthFacilityId } ))._id,
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
        confirmPassword,
        email,
        phoneNumber
    } = req.body;

    if ( ( await dbutil.carryOutRegisOps(req,res,next) ) !== false ) return false;

    const { healthFacilityId } = req.session.user;

    try {

        const internId = util.createExternalId(email,phoneNumber,Date.now());

        const intern = await ( new model.intern({
            healthFacility: (await model.healthFacility.findOne( { healthFacilityId } ))._id,
            password: req.hashedPassword,
            role: "intern",
            fullName,
            phoneNumber,
            internId,
            address,
            email
        })).save();

        return res.status(200).json({ status: 200 , message: { address , phoneNumber , email , internId } });
    } catch(ex) {
        return next(ex);
    }
};

module.exports.registerLaboratorist = async ( req , res , next ) => {

    const {
        address,
        fullName,
        password,
        confirmPassword,
        email,
        phoneNumber
    } = req.body;

    if ( ( await dbutil.carryOutRegisOps(req,res,next) ) !== false ) return false;

    const { healthFacilityId } = req.session.user;

    try {

        const laboratoristId = util.createExternalId(email,phoneNumber,Date.now());

        const laboratorist = await ( new model.laboratorist({
            healthFacility: (await model.healthFacility.findOne( { healthFacilityId } ))._id,
            password: req.hashedPassword,
            role: "laboratorist",
            fullName,
            phoneNumber,
            laboratoristId,
            address,
            email
        })).save();

        return res.status(200).json({ status: 200 , message: { address , phoneNumber , email , laboratoristId } });
    } catch(ex) {
        return next(ex);
    }

};

module.exports.registerPharmacist = async ( req , res , next ) => {

    const {
        address,
        fullName,
        password,
        confirmPassword,
        email,
        phoneNumber
    } = req.body;

    if ( ( await dbutil.carryOutRegisOps(req,res,next) ) !== false ) return false;

    const { healthFacilityId } = req.session.user;

    try {

        const pharmacistId = util.createExternalId(email,phoneNumber,Date.now());

        const pharamacist = await ( new model.pharmacist({
            healthFacility: (await model.healthFacility.findOne( { healthFacilityId } ))._id,
            password: req.hashedPassword,
            role: "pharmacist",
            fullName,
            phoneNumber,
            pharmacistId,
            address,
            email
        })).save();

        return res.status(200).json({ status: 200 , message: { address , phoneNumber , email , pharmacistId } });
    } catch(ex) {
        return next(ex);
    }

};

module.exports.registerPatient = async ( req , res , next ) => {

    const {
        cardNumber,
        code,
        password,
        confirmPassword,
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

        const patientId = util.createExternalId(email,phoneNumber,Date.now());

        const patient = await ( new model.patient({
            healthFacility: (await model.healthFacility.findOne( { healthFacilityId } ))._id,
            password: req.hashedPassword,
            role: "patient",
            phoneNumber,
            patientId,
            email,
            personalInfo: { fullName, bloodGroup, age, dob, weight, height, genotype, occupation }
        })).save();

        return res.status(200).json(
            {
                status: 200 ,
                message: {
                    fullName,
                    phoneNumber,
                    email,
                    patientId,
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
