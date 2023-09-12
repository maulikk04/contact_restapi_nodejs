const jwt = require('jsonwebtoken');

const validatetoken = async (req, res, next) => {
    const authheader = req.headers.Authorization || req.headers.authorization
    if (authheader && authheader.startsWith("Bearer")) {
        const token = authheader.split(" ")[1];
        if (token) {
            jwt.verify(token, 'my-secret', (err, decoded) => {
                if (err) {
                    res.status(404).json({"error" : "Unauthorized user"});
                }
                else {
                    req.user = decoded.user;
                    next();
                }


            })
        }
        else {
            res.status(404).json({"error" : "Unauthorized user"});
        }
    }
}

module.exports = validatetoken;