"use strict";

module.exports.logoutUser = async (req,res,next) => {
    try {
        await req.session.destroy();
        return res.status(200).json({ status: 200 , message: {} });
    } catch(ex) {
        return next(ex);
    }
};
