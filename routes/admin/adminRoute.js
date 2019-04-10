"use strict";

const express = require("express");
const admin   = express.Router();


admin.use("/", (req,res,next) => {
    console.log('hisss');
});

module.exports = admin;
