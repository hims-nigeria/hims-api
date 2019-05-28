"use strict";


const express = require("express");
const multer  = require("multer");
const controller = require("../../controllers/login.js");

const login = express.Router();

login.post(
    "/",
    multer().fields([]),
    controller.loginUser
);


module.exports = login;
