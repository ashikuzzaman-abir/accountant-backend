const express = require("express");
const router = express.Router();

const authCheck = require("../../auth/adminAuthCheck");
const queryPasser = require("../../mysql/queryPasser");

router.get("/", authCheck, async (req, res) => {
    try {
        const sql = `select * from stores`;
        const data = await queryPasser(sql);
        return res.status(200).json(JSON.stringify(data));
    } catch (err) {
        if (err) throw err;
        return res.status(500).json({
            error: err,
        });
    }
});

router.get("/:storeId", authCheck, async (req, res) => {
    try {
        const sql = `select * from stores where storeId = '${req.params.storeId}'`;
        const data = await queryPasser(sql);
        if (data.length < 1) {
            return res.status(200).json({ message: "no store" });
        }
        return res.status(200).json(data[0]);
    } catch (err) {
        if (err) throw err;
        return res.status(500).json({
            error: err,
        });
    }
});

router.get("/:storeId/employees", authCheck, async (req, res) => {
    try {
        const sql = `select uId, name, userName, email, role, signupDate from users where storeId = ${req.params.storeId}`;
        const data = await queryPasser(sql);
        if (data.length < 1) {
            return res
                .status(200)
                .json({ message: "sorry there is no employees" });
        }
        return res.status(200).json(data);
    } catch (err) {
        if (err) throw err;
        return res.status(500).json({ error: err });
    }
});

//here i have to implement join for getting the user data from users table!!!
router.get("/:storeId/entries", authCheck, async (req, res) => {
    try {
        const sql = `select * from entries where storeId = ${req.params.storeId}`;
        const data = await queryPasser(sql);
        if (data.length < 1) {
            return res.status(200).json({ message: "sorry there is entry" });
        }
        return res.status(200).json(data);
    } catch (err) {
        if (err) throw err;
        return res.status(500).json({ error: err });
    }
});

router.get("/:storeId/account", authCheck, async (req, res) => {
    try {
        const sql = `select * from entries where storeId = ${req.params.storeId} and status = 'aceepted'`;
        const data = await queryPasser(sql);
        if (data.length < 1) {
            return res.status(200).json({
                message: "sorry there is approved entries in this account",
            });
        }
        return res.status(200).json(data);
    } catch (err) {
        if (err) throw err;
        return res.status(500).json({ error: err });
    }
});
router.post("/", authCheck, async (req, res) => {
    try {
        const sql = `insert into stores (storeName, address, type) values ('${req.body.storeName}','${req.body.address}','${req.body.type}')`;
        const data = await queryPasser(sql);
        return res.status(201).json({
            message: "store added successfully",
            data: data
        });
    } catch (err) {
        if (err) throw err;
        return res.status(500).json({ error: err });
    }
});

module.exports = router;
