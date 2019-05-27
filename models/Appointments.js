"use strict";

const mongoose  = require("mongoose");

const appointmentSchema = new mongoose.Schema({

    status    : mongoose.Schema.Types.String,
    createdAt : mongoose.Schema.Types.Number,
    updatedAt : mongoose.Schema.Types.Number,
    message   : mongoose.Schema.Types.String,
    
    
    appointmentId: {
        type: mongoose.Schema.Types.String,
        unique: true
    },

    healthFacility: {
        type: mongoose.Schema.Types.String,
        ref: "HealthFacilities"
    },

    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Clients"
    },

    doctorAssignedId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctors"
    }
    
});
