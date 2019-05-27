"use strict";

const mongoose = require("mongoose");

const internSchema = new mongoose.Schema({

    address   : mongoose.Schema.Types.String,
    fullName  : mongoose.Schema.Types.String,
    password  : mongoose.Schema.Types.String,
    role      : mongoose.Schema.Types.String,
    duty      : mongoose.Schema.Types.String,

    email: {
        type: mongoose.Schema.Types.String,
        unique: true
    },

    phoneNumber : {
        type: mongoose.Schema.Types.Number,
        unique: true
    },

    healthFacility: {
        type: mongoose.Schema.Types.String,
        ref: "HealthFacilities"
    },

    internId: {
        type: mongoose.Schema.Types.String,
        unique: true
    }

});


module.exports = mongoose.model("Interns", internSchema);
