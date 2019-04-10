"use strict";

// i did not recommend this kind of design
// but client. so next guy to maintain this code
// don't think i am an asshole

const express = require("express");
const controller = require("../controllers/login.js");

const login = express.Router();

login.post("/", controller.loginUser );


module.exports = login;
