"use strict";

require("./utils/connection.js");

const express     = require("express");
const mongoose    = require("mongoose");
const helmet      = require("helmet");
const multer      = require("multer")();
const cors        = require("cors");
const session     = require("express-session");
const config      = require("./utils/config.js");
const bodyParser  = require("body-parser");
const MongoStore  = require("connect-mongo")(session);
const compression = require("compression");
const middleware  = require("./middleware.js");

const http   = require("http");
const routes = require("./routes/");

const app = express();

app.set("PORT", process.env.PORT || config.port);

//app.use();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(helmet());
app.use(compression());
app.use(cors());


app.use(session({
    key: "sessionId",
    secret: config.session_secret,
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

app.use("/admin/register", routes.registrationRoute);
app.use("/admin/loaduser", routes.loadUsers);
app.use("/dashboard", middleware.isLogin, routes.getDashboard );
app.use("/login", routes.loginUser);
app.use("/logout", routes.logoutUser);

app.all("*", ( error , req, res, next ) => {
    // just log out errors for now
    console.log({...error});
    res.end("smething bad happened");
});

app.all("*", ( req , res ) => {
    return res.status(400).json({ status: 400 , message: `${req.path} ${http.STATUS_CODES["404"]}` });
});

app.listen(app.get("PORT"), () => {
    console.log("Server is now listening on port " , app.get("PORT"));
});
