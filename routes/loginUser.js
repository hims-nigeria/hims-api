"use strict";

// i did not recommend this kind of design
// but client. so next guy to maintain this code
// don't think i am an asshole

const express = require("express");
const multer  = require("multer");
const controller = require("../controllers/login.js");

const login = express.Router();

login.post("/", multer().fields([]), controller.loginUser );


module.exports = login;
