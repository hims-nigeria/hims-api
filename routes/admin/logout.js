"use strict";

const express = require("express");
const logout  = express.Router();

const controller = require("../../controllers/logout.js");

logout.post("/", controller.logoutUser);

module.exports = logout;
