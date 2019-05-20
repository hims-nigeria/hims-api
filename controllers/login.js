"use strict";


// i did not recommend this kind of design
// but client. so next guy to maintain this code
// don't think i am an asshole

const HealthFacility = require("../models/HealthFacility.js");
const util = require("../utils/util.js");

module.exports.loginUser = async ( req , res , next ) => {

    const { email , password } = req.body;

    const validateInput = util.validateClientInput({ email , password });

    if ( validateInput.status ) return res.status(validateInput.status).json({
        status: validateInput.status,
        message: validateInput.message
    });

    try {

        let result = await util.isEmailExists(email);

        // email does not exists
        if ( ! result.length ) {
            return res.status(404).json({ status: 404 , message: `${email} is not yet registered` });
        }

        const comparePassword = await util.comparePassword(password,result[0].password);

        if ( comparePassword instanceof Error ||  ! comparePassword ) {
            return res.status(404).json( { status: 404 , message: `email and/or password is incorrect` } );
        }

        ( [ result ] = result );

        req.session.user = {
            healthFacilityId: result.healthFacilityId,
            fullName: result.fullName,
            email: result.email,
            role: result.role
        };

        return res.status(200).json( { status: 200 , message: req.session.user} );

    } catch(ex) {
        return next(ex);
    }
};
