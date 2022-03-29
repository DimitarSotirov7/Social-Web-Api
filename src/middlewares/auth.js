const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

module.exports = function(req, res, next) {
    const token = req.cookie;
    try {
        const result = jwt.verify(token, config.jwtSecretKey);
    } catch (error) {
        
    }
    next();
}