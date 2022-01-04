const express = require("express");
const router = express.Router();

const loginRoute = require("./login");
const storeRoute = require("./store");
const entryRoute =require("./entry");
const signupRoute =require('./signup');
const analyticsRoute =require("./analytics");

router.use("/signup", signupRoute);
router.use("/login", loginRoute);
router.use("/store", storeRoute);
router.use("/entry", entryRoute);
router.use("/analytics", analyticsRoute);







module.exports = router;