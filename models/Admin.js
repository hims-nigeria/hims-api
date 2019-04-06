"use strict";

const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({

    adminId  : mongoose.Schema.Types.String,
    password : mongoose.Schema.Types.String,
    fullName : mongoose.Schema.Types.String,
    
    email: {
        type: mongoose.Schema.Types.String,
        unique: true
    },

    healthFacility: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "HealthFacility"
    }
    
});
