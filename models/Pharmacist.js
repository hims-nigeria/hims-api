"use strict";

const mongoose = require("mongoose");

const pharmacistSchema = new mongoose.Schema({

    address: mongoose.Schema.Types.String,
    fullName: mongoose.Schema.Types.String,
    password: mongoose.Schema.Types.String,
    role: mongoose.Schema.Types.String,

    email: {
        type: mongoose.Schema.Types.String,
        unique: true
    },

    phoneNumber : {
        type: mongoose.Schema.Types.Number,
        unique: true
    },

    healthFacility: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "HealthFacility"
    },

    pharmacistId: {
        type: mongoose.Schema.Types.String,
        unique: true
    }

});


module.exports = mongoose.model("Pharmacist", pharmacistSchema);
