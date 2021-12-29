const express = require("express");
const router = express.Router();

const loginRoute = require("./login");
const entryRoute = require("./entry");




router.get("/", (req, res, nest) => {
 return res.status(200).json({
  message: "User Route Happiness💫"
 })
});


router.use("/login", loginRoute);
router.use("/entry", entryRoute);



module.exports = router;