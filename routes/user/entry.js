const express = require("express");

const router = express.Router();

const authCheck = require("../../auth/authCheck");
const queryPasser = require("../../mysql/queryPasser");

router.get("/", authCheck, async (req, res, next) => {
    try {
        const sql = `SELECT * FROM entries WHERE uId= ${req.userData.id}`;
        const result = await queryPasser(sql);
        const data = await JSON.stringify(result);
        res.status(200).json(result);
    } catch (err) {
        res.status(404).json({
            message: "sql resolve error",
            err: err,
        });
    }
});

router.get("/:entryId", authCheck, async (req, res, next) => {
    try {
        const sql = `SELECT * FROM entries WHERE entryId= ${req.params.entryId}`;
        const result = await queryPasser(sql);
        const data = await JSON.stringify(result);
        res.status(200).json(result);
    } catch (err) {
        res.status(404).json({
            message: "sql resolve error",
            err: err,
        });
    }
});

router.post("/", authCheck, async (req, res, next) => {
    try {
        const sql = `INSERT INTO entries (storeId, uId, saleAmount) VALUES ('${req.userData.storeId}', '${req.userData.id}', '${req.body.saleAmount}')`;
        await queryPasser(sql);
        res.status(201).json({
            message: "Data Inserted",
        });
    } catch (err) {
        res.status(401).json({
            message: "sql resolve error",
            err: err,
        });
    }
});

module.exports = router;
