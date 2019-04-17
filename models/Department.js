"use strict";

const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({

    name: mongoose.Schema.Types.String,
    description: mongoose.Schema.Types.String,

    departmentId: {
        type: mongoose.Schema.Types.String,
        unique: true
    },

    healthFacility: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "HealthFacility"
    }
});


module.exports = mongoose.model("Department", departmentSchema);
