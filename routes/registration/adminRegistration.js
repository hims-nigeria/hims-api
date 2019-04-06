"use strict";

const express = require("express");
const registerRoute = express.Router();

const register = require("../../controllers/registration.js");


registerRoute.post("/health-care-center", register.registerAdmin );

module.exports = registerRoute;
