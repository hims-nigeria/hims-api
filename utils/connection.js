"use strict";

const mongoose = require("mongoose");


const {
    mongoConnectionString
} = require("./config.js");

mongoose.connect( mongoConnectionString  , {
    useNewUrlParser: true,
    useCreateIndex: true,
    autoReconnect: true,
    keepAlive: true,
    keepAliveInitialDelay: 450000,
    bufferCommands: false,
    bufferMaxEntries: true
}, error => console.log( error ? error : "" ));

const db = mongoose.connection;

db.on("error", (err) => {
    console.error(err);
});
db.on("disconnected", () => {
    console.warn("Disconnected from database:");
});
db.on("connection", () => {
    console.log("Connected to database:");
});

module.exports = db;
