"use strict";

const path = require("path");

let node_env, projectRoot = path.dirname(__dirname);

const dotenv = require("dotenv").config({
    path: ( () => {
        switch(process.env.NODE_ENV) {
        case "development":
            node_env = path.join( projectRoot, ".env.development");
            break;
        case "production":
            node_env = path.join( projectRoot, ".env.development");
            break;
        case "test":
            node_env = path.join( projectRoot, ".env.development");
            break;
        case "staging":
            node_env = path.join( projectRoot, ".env.development");
            break;
        default:
        }
        return node_env;
    })()
});

const {
    dbHost,
    dbPort,
    dbName
} = process.env;

module.exports.port   = process.env.port;
module.exports.session_secret = process.env.secret;


module.exports.mongoConnectionString = `mongodb://${dbHost}:${dbPort}/${dbName}`;
