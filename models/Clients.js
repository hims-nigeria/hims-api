"use strict";

const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({

    cardNumber     : mongoose.Schema.Types.Number,
    code           : mongoose.Schema.Types.String,
    password       : mongoose.Schema.Types.String,
    phoneNumber    : mongoose.Schema.Types.Number,
    image          : mongoose.Schema.Types.String,
    accountBalance : mongoose.Schema.Types.Decimal128,

    email : {
        type: mongoose.Schema.Types.String,
        unique: true
    },

    fullName   : mongoose.Schema.Types.String,
    bloodGroup : mongoose.Schema.Types.String,
    age        : mongoose.Schema.Types.Number,
    dob        : mongoose.Schema.Types.Date,
    weight     : mongoose.Schema.Types.String,
    height     : mongoose.Schema.Types.String,
    genotype   : mongoose.Schema.Types.String,
    occupation : mongoose.Schema.Types.String,

    emergencyContacts : [{
        emergencyFullname     : mongoose.Schema.Types.String,
        emergencyAddress      : mongoose.Schema.Types.String,
        emergencyRelationship : mongoose.Schema.Types.String,
        emergencyPhonenumber  : mongoose.Schema.Types.Number
    }],

    healthFacility: {
        type: mongoose.Schema.Types.String,
        ref: "HealthFacilities"
    },

    clientId: {
        type: mongoose.Schema.Types.String,
        unique: true
    }
});

module.exports = mongoose.model("Clients", clientSchema);
