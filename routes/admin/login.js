const express = require("express");
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
        if (objData !== undefined && objData.role === "admin") {
            const token = await jwt.sign(
                {
                    id: objData.uId,
                    name: objData.name,
                    username: objData.userName,
                    storeId: objData.storeId,
                    email: objData.email,
                    role: objData.role,
                },
                process.env.SECRET2,
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
                massege: "username or password incorrect or you are not admin",
            });
        }
    } catch (err) {
        console.log(err);
        return res.status(401).json({
            massege: "username or password incorrect",
        });
    }
});

module.exports = router;
