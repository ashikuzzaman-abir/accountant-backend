//globals
const error = "error: ";

//modules
const { json } = require("express");
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

// const bodyParser = require("body-parser");

require("./mysql/connection");

require("dotenv").config();

//router import
const engineRoute = require("./routes/engine");
const userRoute = require("./routes/user/user");
const adminRoute = require("./routes/admin/admin");

const app = express();
const port = process.env.PORT || 5000;

//bodyParser middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get("/", (req, res) => {
    if (req.header.authorization) {
        return res.send("Has Auth!!");
    }
    return res.status(201).send("Hello World");
});

app.use("/engine", engineRoute);
app.use("/user", userRoute);
app.use("/admin", adminRoute);

app.listen(port, (err) => {
    if (err) {
        console.log(error, err);
    }
    console.log(`This is server-1 @ PORT-> ${port}`);
});







