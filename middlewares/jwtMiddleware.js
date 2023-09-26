const jwt = require('jsonwebtoken')


const jwtMiddleware = (req, res, next) => {

    try {
        // access token from headers
        const token = req.headers['access_token']
        if (!token) {
            return res.status(401).json({
                status: false,
                message: "Token is missing , Please login",
                statusCode: 401
            })
        }

        // true / false
        jwt.verify(token, "secretkey123")
        //to continue middleware
        next()
    }

    catch {
        res.status(401).json({
            status: false,
            message: "please login",
            statusCode: 401
        })
    }
}

module.exports = {jwtMiddleware}