"use strict";

const express    = require("express");
const multer     = require("multer");
const deleteUser = express();

const {
    deleteUniqueUsers
} = require("../../utils/dbUtil.js");

const {
    selectUser
} = require("../../middleware.js");

deleteUser.delete(
    "/:type/:id",
    selectUser,
    deleteUniqueUsers
);



module.exports = deleteUser;
