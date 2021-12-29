const express = require("express");
const router = express.Router();

router.get("/", (req, res, cb) => {
    res.status(200).json({ message: "🪐🌌🌏" });
});

module.exports = router;
