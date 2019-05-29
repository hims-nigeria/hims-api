"use strict";

const {
    nurses,
    doctors,
    interns,
    clients,
    pharmacists,
    accountants,
    departments,
    laboratorists,
    interventions,
    receptionists,
    subinterventions
}  = require("./models/");


module.exports.isLogin = (req,res,next) => {
    console.log(req.session.user);
    if ( ! req.session.user ) {
        return res.status(401).json({
            status: 401,
            message: "You need to login to access the dashboard"
        });
    }

    return next();
};

module.exports.selectUser = ( req , res , next ) => {

    let error = -1;
    console.log(req.body);
    req.__internalProps = {

        collection: ( () => {

            switch(req.params.type) {
            case "subintervention": return {
                notUser: true,
                type: "subinterventions" ,
                idType: "subInterventionId" ,
                colObject: subinterventions
            };
            case "intervention": return {
                notUser: true,
                idType: "interventionId",
                type: "interventions" ,
                colObject: interventions
            };
            case "department": return {
                notUser: true,
                type: "departments",
                idType: "departmentId",
                colObject: departments
            };
            case "laboratorist": return {
                type: "laboratorists",
                idType: "laboratoristId",
                colObject: laboratorists
            };
            case "receptionist": return {
                type: "receptionists",
                idType: "receptionistId",
                colObject: receptionists
            };
            case "accountant": return {
                type: "accountants",
                idType: "accountantId",
                colObject: accountants
            };
            case "pharmacist": return {
                type: "pharmacists",
                idType: "pharmacistId",
                colObject: pharmacists
            };
            case "client": return {
                type: "clients",
                idType: "clientId",
                colObject: clients
            };
            case "doctor": return {
                type: "doctors",
                idType: "doctorId",
                colObject: doctors
            };
            case "intern": return {
                type: "interns",
                idType: "internId",
                colObject: interns
            };
            case "nurse": return {
                type: "nurses",
                idType: "nurseId",
                colObject: nurses
            };
            default: error = 0; return {};

            }

        })()
    };

    if ( error === -1 )
        return next();

    return next("user type is not recognized");

};
