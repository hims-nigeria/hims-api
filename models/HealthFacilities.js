"use strict";

const mongoose = require("mongoose");

const healthFacilitySchema = new mongoose.Schema({

    password : mongoose.Schema.Types.String,
    fullName : mongoose.Schema.Types.String,

    role     : mongoose.Schema.Types.String,

    healthFacilityId  : {
        type: mongoose.Schema.Types.String,
        unique: true
    },

    email: {
        type: mongoose.Schema.Types.String,
        unique: true
    },

    dashboardInfo: {
        laboratorists: { type: mongoose.Schema.Types.Number , default: 0 },
        transactions:  { type: mongoose.Schema.Types.Number , default: 0 },
        pharmacists:   { type: mongoose.Schema.Types.Number , default: 0 },
        accountants:   { type: mongoose.Schema.Types.Number , default: 0 },
        clients:      { type: mongoose.Schema.Types.Number , default: 0 },
        doctors:       { type: mongoose.Schema.Types.Number , default: 0 },
        nurses:        { type: mongoose.Schema.Types.Number , default: 0 },
        interns:       { type: mongoose.Schema.Types.Number , default: 0 }
    },

    healthCareName: mongoose.Schema.Types.String,

    state : mongoose.Schema.Types.String,
    lga   : mongoose.Schema.Types.String,
    zone  : mongoose.Schema.Types.String
});

module.exports = mongoose.model("HealthFacilities", healthFacilitySchema);
