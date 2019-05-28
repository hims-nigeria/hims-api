"use strict";

const mongoose  = require("mongoose");


const interventionSchema = new mongoose.Schema({
    interventionName: mongoose.Schema.Types.String,
    interventionId: mongoose.Schema.Types.String,
    healthFacility: {
        type: mongoose.Schema.Types.String,
        ref: "HealthFacilities"
    }
});

module.exports = mongoose.model( "Interventions" , interventionSchema);
