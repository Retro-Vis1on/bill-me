const jwt = require('jsonwebtoken')
require('dotenv').config()
module.exports = ((req, res, next) => {
    const token = req.get('Authorization')
    if (!token) {
        req.isAuth = false;
        return next()
    }
    let decodedToken
    try {
        decodedToken = jwt.decode(token, process.env.KEY)
    }
    catch (err) {
        req.isAuth = false;
        return next()
    }
    if (!decodedToken) {
        req.isAuth = false;
        return next()
    }
    const curTime = (new Date()).getTime();
    if (curTime >= decodedToken.expirationTime) {
        req.isAuth = false;
        return next()
    }
    req.userId = decodedToken.userId
    req.isAuth = true;
    next()
})