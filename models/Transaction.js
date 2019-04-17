"use strict";

const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({

    transactionType: mongoose.Schema.Types.String,
    amount: mongoose.Schema.Types.String,
    transactionDate: mongoose.Schema.Types.Number,

    invoiceId: mongoose.Schema.Types.String,
    remarks: mongoose.Schema.Types.String,

    balanceBrtFwd: mongoose.Schema.Types.String,
    balanceCrdFwd: mongoose.Schema.Types.String,

    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department"
    },

    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient"
    },
    
    healthFacility: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "HealthFacility"
    },

    transactionId: {
        type: mongoose.Schema.Types.String,
        unique: true
    }
    
});


module.exports = mongoose.model("Transaction", transactionSchema);
