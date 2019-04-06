"use strict";

const http = require("http");

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

module.exports.hashPassword = async (pwd, cpwd, next) => {

    const bcrypt = require("bcrypt");

    if ( pwd !== cpwd ) return {
        status: 422,
        message: `password and confirm password does not match`
    };

    try { return await bcrypt.hash( pwd , 10 ); } catch(ex) { return next(ex); }
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
