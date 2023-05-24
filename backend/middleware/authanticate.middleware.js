const jwt = require("jsonwebtoken")
const authenticate = (req, res, next) => {
    const token = req.headers.authorization
    if (token) {
        jwt.verify(token, "secretkey", (err, decoded) => {
            if (decoded) {

                req.body.user=decoded.userID
                console.log(decoded)
                next()
            } else {
                res.send({ "msg": "login first" })
            }
        })


    } else {
        res.send({ "msg": "login first" })

    }
}

module.exports = {
    authenticate
}