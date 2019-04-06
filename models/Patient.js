"use strict";

const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
    
    cardNumber     : mongoose.Schema.Types.Number,
    code           : mongoose.Schema.Types.String,
    password       : mongoose.Schema.Types.String,
    phoneNumber    : mongoose.Schema.Types.Number,

    accountBalance : mongoose.Schema.Types.Decimal128,

    email : {
        type: mongoose.Schema.Types.String,
        unique: true
    },

    personaInfo : {
        fullName   : mongoose.Schema.Types.String,
        bloodGroup : mongoose.Schema.Types.String,
        age        : mongoose.Schema.Types.Number,
        dob        : mongoose.Schema.Types.Number,
        weight     : mongoose.Schema.Types.String,
        height     : mongoose.Schema.Types.String,
        genotype   : mongoose.Schema.Types.String,
        occupation : mongoose.Schema.Types.String
    },

    emergencyContacts : {
        fullName     : mongoose.Schema.Types.String,
        address      : mongoose.Schema.Types.String,
        relationship : mongoose.Schema.Types.String,
        phoneNumber  : mongoose.Schema.Types.Number
    },

    healthFacility: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "HealthFacility"
    }
});
