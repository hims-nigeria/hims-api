"use strict";

const mongoose = require("mongoose");

const healthFacilitySchema = new mongoose.Schema({
    hospitalName: mongoose.Schema.Types.String,
    location: {
        state : mongoose.Schema.Types.String,
        lga   : mongoose.Schema.Types.String,
        zone  : mongoose.Schema.Types.String
    }
});
