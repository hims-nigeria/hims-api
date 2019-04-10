"use strict";

const express   = require("express");
const dashboard = express.Router();

dashboard.get("/" , (req,res) => {
    console.log("hisss");
    res.end();
});

module.exports = dashboard;
