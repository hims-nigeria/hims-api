"use strict";

const express    = require("express");
const multer     = require("multer");
const editUser   = express();

const upload     = multer({ storage: multer.memoryStorage() });

const {
    editUniqueUsers
} = require("../../utils/dbUtil.js");

const {
    selectUser
} = require("../../middleware.js");

editUser.post(
    "/:type",
    upload.single("image"),
    selectUser,
    editUniqueUsers,
);

module.exports = editUser;
