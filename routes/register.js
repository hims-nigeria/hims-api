"use strict";

const express = require("express");
const registerRoute = express.Router();

const register = require("../controllers/registration.js");


registerRoute.post("/health-care-center", register.registerAdmin );
registerRoute.post("/nurse", register.registerNurse );
registerRoute.post("/accountant", register.registerAccountant );
registerRoute.post("/doctor", register.registerDoctor );
registerRoute.post("/intern", register.registerIntern);
registerRoute.post("/laboratorist", register.registerLaboratorist );
registerRoute.post("/pharamcist", register.registerPharmacist );
registerRoute.post("/patient", register.registerPatient);

module.exports = registerRoute;
