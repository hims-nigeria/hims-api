"use strict";

const http = require("http");
const bcrypt = require("bcrypt");

const model = require("../models/");

const emailRegexp = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i;

module.exports.validateClientInput = (values) => {

    if ( ! values || Array.isArray(values) || typeof(values) !== "object" ) return {
        status: 422,
        message: `Invalid Input`
    };

    if ( Object.keys(values).length === 0 ) return {
        message: "all fields are required" , status: 422
    };

    for ( let props of Object.keys(values) ) {
        if ( ! values[props] ) return {
            status: 422,
            message: `${props} is required`
        };
    }

    return {};
};

const hashPassword = async (pwd, cpwd, next) => {

    if ( cpwd && (pwd !== cpwd) ) return {
        status: 422,
        message: `password and confirm password does not match`
    };

    try { return await bcrypt.hash( pwd , 10 ); } catch(ex) { return next(ex); }
};

module.exports.hashPassword = hashPassword;

module.exports.comparePassword = async ( plaintextPwd, hashedPwd )  => {
    try {
        return (await bcrypt.compare( plaintextPwd, hashedPwd ));
    } catch(ex) {
        return ex;
    }
};

module.exports.createExternalId = (...criteria) => {
    const crypto = require("crypto");
    return crypto.createHash("sha1").update(criteria.join("")).digest("hex");
};

module.exports.checkUserEmail = (email,next) => {
    if ( ! emailRegexp.test(email) ) return {
        status: 422,
        message: `${email} is not a valid email address`
    };
    return {};
};

// return value contain an array of a single element
// or no element. The single element is the found data

const isEmailExists = async ( email ) => (
    await Promise.all([
        await model.healthFacilities.findOne({ email }),
        await model.accountants.findOne({ email }),
        await model.doctors.findOne({ email }),
        await model.interns.findOne({ email }),
        await model.laboratorists.findOne({ email }),
        await model.pharmacists.findOne({ email }),
        await model.nurses.findOne({ email }),
        await model.receptionists.findOne({ email })
    ])
).filter( x => x !== null);

module.exports.isEmailExists = isEmailExists;

const isValidImage = (req) => {

    const fileType = require("file-type");
    const fileObj = fileType(req.file.buffer);

    const { mime, ext } = fileObj || { mime: undefined, ext: undefined };

    if (!mime ||
        !/(image\/gif|image\/png|image\/jpeg|image\/bmp|image\/webp)/.test(mime) ||
        !/(gif|jpg|png|jpeg|bmp|webp)/.test(ext)
       ) {
        return false;
    }
    req.__image__buffer = `data:${mime};base64,${req.file.buffer.toString("base64")}`;
    return true;
};

module.exports.isValidImage = isValidImage;

module.exports.checkUploadedImage = req => {
    if ( req.file || req.files.length ) {
        const isImageValid  = isValidImage(req);
        if ( ! isImageValid )
            throw new Error("Invalid image type");
        return req.__image__buffer;
    }
    return false;
};

module.exports.validateEditUserEmail = async (req,res,idType) => {

    const result = await isEmailExists(req.body.email);

    if ( result.length ) {
        if ( Object.keys(result[0]._doc).includes(idType) )
            delete req.body.email;
        else
            res.status(409).json(
                {
                    status: 409 ,
                    message: `${req.body.email} is not available for use`
                }
            );
    }
    return;
};

module.exports.validateEditUserPassword = async (req,res) => {
    if ( req.body.password.length !== 0 ) {
        const hashedPassword = await hashPassword(req.body.password,req.body.confirmPassword,next);
        if ( hashedPassword.status ) res.status(hashedPassword.status).json({
            status: hashedPassword.status,
            message: hashedPassword.message
        });
        req.body.password = hashedPassword;
    } else delete req.body.password;
    return;
};
