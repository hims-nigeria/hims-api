"use strict";

const express = require("express");
const loadUser = express.Router();

const {
    loadUserUniqueInterface
} = require("../../utils/dbUtil.js");

const {
    selectUser
} = require("../../middleware.js");

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
}  = require("../../models/");

loadUser.get("/:type", selectUser , loadUserUniqueInterface );

module.exports = loadUser;
