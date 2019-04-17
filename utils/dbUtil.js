"use strict";

const util = require("./util.js");

module.exports.carryOutRegisOps = async (req,res,next) => {

    const validateInput = util.validateClientInput({ ...req.body });

    if ( validateInput.status ) return res.status(validateInput.status).json({
        status: validateInput.status,
        message: validateInput.message
    });

    const hashedPassword = await util.hashPassword(req.body.password,req.body.confirmPassword,next);

    if ( hashedPassword.status ) return res.status(hashedPassword.status).json({
        status: hashedPassword.status,
        message: hashedPassword.message
    });

    const checkEmail = await util.checkUserEmail(req.body.email,next);

    if ( checkEmail.status ) return res.status(checkEmail.status).json({
        status: checkEmail.status,
        message: checkEmail.message
    });

    req.hashedPassword = hashedPassword;

    const result = await util.isEmailExists(req.body.email);

    // if result.length is greater than 0
    // then that email address is aready taken
    if ( result.length ) {
        return res.status(409).json( { status: 409 , message: `${req.body.email} is not available for use` });
    }

    return false;
};
