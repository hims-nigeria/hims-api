"use strict";

const mongoose = require("mongoose");

const healthFacilitySchema = new mongoose.Schema({

    password : mongoose.Schema.Types.String,
    fullName : mongoose.Schema.Types.String,

    healthFacilityId  : {
        type: mongoose.Schema.Types.String,
        unique: true
    },

    email: {
        type: mongoose.Schema.Types.String,
        unique: true
    },

    hospitalName: mongoose.Schema.Types.String,

    location: {
        state : mongoose.Schema.Types.String,
        lga   : mongoose.Schema.Types.String,
        zone  : mongoose.Schema.Types.String
    }
});

module.exports = mongoose.model("HealthFacility", healthFacilitySchema);
