"use strict";

const express   = require("express");
const dashboard = express.Router();

const getDashboard = require("../controllers/getDashboard.js");

dashboard.get("/" , getDashboard);

module.exports = dashboard;
