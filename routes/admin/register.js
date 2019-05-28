"use strict";
const express = require("express");
const multer  = require("multer");
const upload  = multer({ storage: multer.memoryStorage() });
const register = require("../../controllers/registration.js");

const registerRoute = express.Router();


registerRoute.post(
    "/health-care-center",
    multer().fields([]),
    register.registerAdmin
);

registerRoute.post(
    "/nurse" ,
    upload.single("image"),
    register.registerNurse
);

registerRoute.post(
    "/accountant",
    upload.single("image"),
    register.registerAccountant
);

registerRoute.post(
    "/doctor",
    upload.single("image"),
    register.registerDoctor
);

registerRoute.post(
    "/intern",
    multer().fields([]),
    register.registerIntern
);

registerRoute.post(
    "/laboratorist",
    upload.single("image"),
    register.registerLaboratorist
);

registerRoute.post(
    "/pharmacist",
    upload.single("image"),
    register.registerPharmacist
);

registerRoute.post(
    "/client",
    upload.single("image"),
    register.registerClient
);

registerRoute.post(
    "/receptionist",
    upload.single("image"),
    register.registerReceptionist
);

registerRoute.post(
    "/intervention",
    multer().fields([]),
    register.registerIntervention
);

registerRoute.post(
    "/subintervention",
    multer().fields([]),
    register.registerSubIntervention
);

registerRoute.post(
    "/department",
    upload.single("image"),
    register.registerDepartment
);

module.exports = registerRoute;
