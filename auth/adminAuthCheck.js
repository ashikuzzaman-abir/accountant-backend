const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.SECRET2);
        req.userData = decoded;
        next();
    } catch (err) {
        // console.log(err);
        return res.status(401).json({
            message: "you haven't loged in",
            error: err,
        });
    }
};
