"use strict";
const mongoose = require("mongoose");

const accoutantSchema = new mongoose.Schema({
    
    address  : mongoose.Schema.Types.String,
    fullName : mongoose.Schema.Types.String,
    password : mongoose.Schema.Types.String,

    accountantId : {
        type: mongoose.Schema.Types.String,
        unique: true
    },

    phoneNumber : {
        type: mongoose.Schema.Types.Number,
        unique: true
    },

    email: {
        type: mongoose.Schema.Types.String,
        unique: true
    },

    healthFacility: {
        type: mongoose.Schema.Types.String,
        dref: "HealthFacilities"
    }
});

module.exports = mongoose.model("Accountants", accoutantSchema);
