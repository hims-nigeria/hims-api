"use strict";

const express = require("express");
const multer  = require("multer");
const registerRoute = express.Router();

const upload  = multer({ storage: multer.memoryStorage() });

const register = require("../controllers/registration.js");



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
    register.registerAccountant
);

registerRoute.post(
    "/doctor",
    register.registerDoctor
);

registerRoute.post(
    "/intern",
    register.registerIntern
);

registerRoute.post(
    "/laboratorist",
    register.registerLaboratorist
);

registerRoute.post(
    "/pharamcist",
    register.registerPharmacist
);

registerRoute.post(
    "/patient",
    register.registerPatient
);

module.exports = registerRoute;
