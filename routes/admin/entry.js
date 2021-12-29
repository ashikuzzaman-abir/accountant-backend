const express = require("express");
const { json } = require("express/lib/response");
const router = express.Router();

const authCheck = require("../../auth/adminAuthCheck");
const queryPasser = require("../../mysql/queryPasser");

router.get("/", authCheck, async (req, res) => {
    try {
        const sql = `
            SELECT e.entryId as entryId, e.uId as uId, u.name as name, u.role, e.storeId as storeId, s.storeName as store, e.saleAmount as amount, e.entryTime as time, e.status as status
            FROM entries e
                JOIN users u ON e.uId = u.uId
                JOIN stores s ON e.storeId  = s.storeId 
            WHERE status = 'pending'
            ORDER BY e.entryTime DESC
            `;
        const data = await queryPasser(sql);
        if (data.length < 1) {
            return res.status(200).json({
                message: "no more pending entries",
            });
        }
        return res.status(200).json(data);
    } catch (err) {
        if (err) throw err;
        return res.status(500).json({
            error: err,
        });
    }
});


router.get("/accepted", authCheck, async (req, res) => {
    try {
        const sql = `
            SELECT e.entryId as entryId, e.uId as uId, u.name as name, u.role as role, e.storeId as storeId, s.storeName as store, e.saleAmount as amount, e.entryTime as time, e.status as status
            FROM entries e
                JOIN users u ON e.uId = u.uId
                JOIN stores s ON e.storeId  = s.storeId 
            WHERE status = 'accepted'
            ORDER BY e.entryTime DESC
            `;
        const data = await queryPasser(sql);
        if (data.length < 1) {
            return res.status(200).json({
                message: "no accepted entries",
            });
        }
        return res.status(200).json(data);
    } catch (err) {
        if (err) throw err;
        return res.status(500).json({
            error: err,
        });
    }
});
router.get("/rejected", authCheck, async (req, res) => {
    try {
        const sql = `
            SELECT e.entryId as entryId, e.uId as uId, u.name as name, u.role, e.storeId as storeId, s.storeName as store, e.saleAmount as amount, e.entryTime as time, e.status as status
            FROM entries e
                JOIN users u ON e.uId = u.uId
                JOIN stores s ON e.storeId  = s.storeId 
            WHERE status = 'rejected'
            ORDER BY e.entryTime DESC
            `;
        const data = await queryPasser(sql);
        if (data.length < 1) {
            return res.status(200).json({
                message: "no rejected entries",
            });
        }
        return res.status(200).json(data);
    } catch (err) {
        if (err) throw err;
        return res.status(500).json({
            error: err,
        });
    }
});
router.get("/:entryId", authCheck, async (req, res) => {
    try {
        const sql = `
            SELECT e.entryId as entryId, e.uId as uId, u.name as name, u.role, e.storeId as storeId, s.storeName as store, e.saleAmount as amount, e.entryTime as time, e.status as status
            FROM entries e
                JOIN users u ON e.uId = u.uId
                JOIN stores s ON e.storeId  = s.storeId 
            WHERE entryId = ${req.params.entryId}
            `;
        const data = await queryPasser(sql);
        if (data.length < 1) {
            return res.status(200).json({
                message: "no entry found",
            });
        }
        return res.status(200).json(data);
    } catch (err) {
        if (err) throw err;
        return res.status(500).json({
            error: err,
        });
    }
});

router.put('/:entryId/accept', authCheck, async (req,res) => {
    try{
        const sql = `UPDATE entries SET status = 'accepted' WHERE entryId = ${req.params.entryId}`;
        const inReturn = await queryPasser(sql);
        if(inReturn.changedRows == 0){
            return res.status(401).json({
                message: 'unable to update'
            })
        }
        return res.status(201).json({
            message: "entry updated"
            
        })
    } catch(err){
        if (err) throw err;
        return res.status(500).json({
            error : err
        })
    }
});
router.put("/:entryId/reject", authCheck, async (req, res) => {
    try {
        const sql = `UPDATE entries SET status = 'rejected' WHERE entryId = ${req.params.entryId}`;
        const inReturn = await queryPasser(sql);
        if (inReturn.changedRows == 0) {
            return res.status(401).json({
                message: "unable to update",
            });
        }
        return res.status(201).json({
            message: "entry updated",
        });
    } catch (err) {
        if (err) throw err;
        return res.status(500).json({
            error: err,
        });
    }
});
module.exports = router;
