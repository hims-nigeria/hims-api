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
        ref: "Departments"
    },

    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Clients"
    },
    
    healthFacility: {
        type: mongoose.Schema.Types.String,
        ref: "HealthFacilities"
    },

    transactionId: {
        type: mongoose.Schema.Types.String,
        unique: true
    }
    
});


module.exports = mongoose.model("Transactions", transactionSchema);
