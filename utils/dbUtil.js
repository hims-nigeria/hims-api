"use strict";

const { PAGE_LIMIT } = require("../utils/constants.js");

const util  = require("./util.js");
const model = require("../models/");

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

module.exports.loadUserUniqueInterface = async (  req , res , next ) => {

    const {
        __internalProps: { collection },
        query: { page }
    } = req;

    try {

        const { fullName, role } = req.session.user;

        const result = await collection.colObject.find({}, { password: false , _id: false }).skip(page * PAGE_LIMIT ).limit(PAGE_LIMIT).lean();

        const responseObject = {
            hasMore: await collection.colObject.count() > ((page + 1) * PAGE_LIMIT),
            [collection.type]: result,
            fullName,
            role
        };

        return res.status(200).json( { status: 200 , message: responseObject });
    } catch(ex) {
        console.log(ex);
        return next(ex);
    }
};

module.exports.saveUniqueUsers = async ( req , body ) => {

    const { healthFacilityId } = req.session.user;

    const userId = util.createExternalId(...Object.values(body.idCred));
    const image  = util.checkUploadedImage(req);

    if ( image ) body.data.image = image;

    req[body.idType] = userId;

    await ( new model[body.collection](
        Object.assign(
            body.data,
            {
                [body.idType]: userId,
                healthFacility: healthFacilityId
            }
        )
    )).save();

    if ( ! body.notUser )
        await model.healthFacilities.updateOne(
            { healthFacilityId: healthFacilityId } ,
            { $inc: { [`dashboardInfo.${body.collection}`] : 1 } }
        );
};


module.exports.deleteUniqueUsers = async ( req , res , next ) => {

    const { id: userId } = req.params;

    const {
        __internalProps: {
            collection: { colObject , idType , type  , notUser }
        }
    } = req;

    if ( ! userId ) {
        return next("userId cannot be undefined or null");
    }

    try {

        const { healthFacilityId } = req.session.user;

        const result = await colObject.findOneAndDelete( { healthFacility: healthFacilityId , [idType]: userId } );

        if ( ! result ) {
            return res.status(200).json( { status: 200 , message: `${userId} cannot be deleted` });
        }

        if ( ! notUser )
            await model.healthFacilities.updateOne(
                { healthFacilityId: healthFacilityId } ,
                { $inc: { [`dashboardInfo.${type}`] : -1 } }
            );

        return res.status(200).json({ status: 200 , message: `${userId} has been successfully deleted` });
    } catch(ex) {
        return next(ex);
    }
};

module.exports.editUniqueUsers = async ( req , res , next ) => {

    const {
        __internalProps: {
            collection: { colObject , idType , type  , notUser }
        }
    } = req;

    try {

        await util.validateEditUserEmail(req,res,idType);
        await util.validateEditUserPassword(req,res);

        const image = util.checkUploadedImage(req);
        if ( image ) req.body.image = image;

        const { healthFacilityId } = req.session.user;

        const result = await colObject.findOneAndUpdate(
            { healthFacility: healthFacilityId , [idType]: req.body[idType] },
            { $set: req.body },
            { new: true , fields: { password: false , _id: false } }
        ).lean();

        return res.status(200).json({ status: 200 , message: result });
    } catch(ex) {
        return next(ex);
    }
};
