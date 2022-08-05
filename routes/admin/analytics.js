const express = require("express");
const router = express.Router();
const authCheck = require("../../auth/adminAuthCheck");
const queryPasser = require("../../mysql/queryPasser");

router.get("/monthlysale/:storeid", authCheck, async (req, res, next) => {
	try {
		const date = new Date();
		let currentMonth = date.getMonth() + 1;
		let sql, serverReturn, records, total;
		let sum = 0;

		if (req.query.month) {
			currentMonth = req.query.month;
		}
		sql = `select * from entries where storeId= '${req.params.storeid}' and MONTH(entryTime) = '${currentMonth}' and status = 'accepted'`;
		serverReturn = await queryPasser(sql);
		records = await JSON.stringify(serverReturn);
		let parsed = await JSON.parse(records);
		parsed.map((element) => {
			sum += parseInt(element.saleAmount);
		});
		return res.status(200).json({ "total": sum });
	} catch (error) {
		if (error) throw error;
	}
});

module.exports = router;
