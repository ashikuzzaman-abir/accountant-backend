const express = require("express");

const bcrypt = require("bcrypt");

const router = express.Router();

const authCheck = require("../../auth/adminAuthCheck");

const queryPasser = require("../../mysql/queryPasser");

router.post("/", authCheck, async (req, res, next) => {
    bcrypt.hash(req.body.password, 10, async (err, hash) => {
        if (err) throw err;
        const sql = `INSERT INTO users (storeId, name, userName, email, password,  role) VALUES ('${req.body.storeId}', '${req.body.name}', '${req.body.username}', '${req.body.email}', '${hash}', '${req.body.role}' )`;
        try {
            const data = await queryPasser(sql);
            console.log(`data inserted`);
            return res.status(201).json({
                massege: "data inserted",
                mysqlReturned: data,
            });
        } catch (error) {
            return res.status(203).json({
                massege: "insertion error",
                errorsql: error.sqlMessage,
            });
        }
    });
});


module.exports = router;
