const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.SECRET);
        req.userData = decoded;
        next();
    } catch (err) {
        // console.log(err);
        return res.status(401).json({
            massege: "you haven't loged in",
            error: err,
        });
    }
};
