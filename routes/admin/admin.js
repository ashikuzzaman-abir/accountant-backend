const express = require("express");
const router = express.Router();

const loginRoute = require("./login");
const storeRoute = require("./store");
const entryRoute =require("./entry");
const signupRoute =require('./signup');

router.use("/signup", signupRoute);
router.use("/login", loginRoute);
router.use("/store", storeRoute);
router.use("/entry", entryRoute);







module.exports = router;