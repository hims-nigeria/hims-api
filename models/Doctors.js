"use strict";

const mongoose = require("mongoose");


const doctorSchema = new mongoose.Schema({

    address    : mongoose.Schema.Types.String,
    fullName   : mongoose.Schema.Types.String,
    password   : mongoose.Schema.Types.String,
    rank       : mongoose.Schema.Types.String,

    image      : mongoose.Schema.Types.String,

    email: {
        type: mongoose.Schema.Types.String,
        unique: true
    },

    phoneNumber : {
        type: mongoose.Schema.Types.Number,
        unique: true
    },

    doctorId: {
        type: mongoose.Schema.Types.String,
        unique: true
    },

    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Departments"
    },

    healthFacility: {
        type: mongoose.Schema.Types.String,
        ref: "HealthFacilities"
    },

    socialLinks: {
        facebook: mongoose.Schema.Types.String,
        twitter:  mongoose.Schema.Types.String,
        googlePlus: mongoose.Schema.Types.String,
        linkedin: mongoose.Schema.Types.String
    }
});

module.exports = mongoose.model("Doctors", doctorSchema);
