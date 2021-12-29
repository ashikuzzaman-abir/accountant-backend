const dbcon = require("./connection");

const queryPasser = sql => {
    return new Promise((resolve, reject) => {
        dbcon.query(sql, (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    })
}

module.exports = queryPasser;
