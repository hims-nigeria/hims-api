"use strict";

const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
    name: mongoose.Schema.Types.String,
    department : mongoose.Schema.Types.String,
    rate: mongoose.Schema.Types.Number,
    healthFacility: {
        type: mongoose.Schema.Types.String,
        dref: "HealthFacilities"
    }
});
