const mysql = require("mysql");
const dbcon = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "dbstore",
});

dbcon.connect((err) => {
    if (err) {
        console.log("!! ERROR: database couldn't connect!! ");
        throw err;
    };
    console.log("database connected");
});

module.exports = dbcon;
