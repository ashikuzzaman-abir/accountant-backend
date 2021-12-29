const express = require("express");
const { json } = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const queryPasser = require("../../mysql/queryPasser");

router.post("/", async (req, res, next) => {
    try {
        const sql = `SELECT * FROM users WHERE userName = '${req.body.username}'`;
        const dbdata = await queryPasser(sql);
        const data = await JSON.stringify(dbdata);
        const objData = await JSON.parse(data)[0];
        if (objData !== undefined) {
            const token = await jwt.sign(
                {
                    id: objData.uId,
                    username: objData.userName,
                    storeId: objData.storeId,
                    email: objData.email,
                    role: objData.role,
                },
                process.env.SECRET,
                {
                    expiresIn: "12h",
                }
            );
            const match = await bcrypt.compare(
                req.body.password,
                `${objData.password}`
            );
            if (match) {
                // jwt logic will work here
                return res.status(200).json({
                    message: "successfully loged in",
                    token: token,
                });
            } else {
                return res.status(401).json({
                    massege: "username or password incorrect",
                });
            }
        } else {
            return res.status(401).json({
                massege: "username or password incorrect",
            });
        }
    } catch (err) {
        console.log(err);
        return res.status(401).json({
            massege: "username or password incorrect",
        });
    }
});

router.get("/", (req, res, next) => {
    res.status(200).json([
        {
            title: "login route",
            massege: "🤑login route !!Congratulation🤑😲!!",
        },
    ]);
});

module.exports = router;
