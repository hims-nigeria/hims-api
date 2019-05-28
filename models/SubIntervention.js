"use strict";

const mongoose = require("mongoose");

const subInterventionSchema = new mongoose.Schema({
    subInterventionName: mongoose.Schema.Types.String,
    subInterventionId: mongoose.Schema.Types.String,
    interventionName:  mongoose.Schema.Types.String,
    healthFacility: {
        type: mongoose.Schema.Types.String,
        ref: "HealthFacilities"
    }
});


module.exports = mongoose.model( "Subinterventions" , subInterventionSchema );
