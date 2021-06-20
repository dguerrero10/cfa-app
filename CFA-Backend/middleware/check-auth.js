const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, '87CE40D3FFDB218326DBDA1E3602214F1E40EB73A1CD73A08011DEA986881A6B');
        req.userData = {userId: decodedToken.userId}
        next();
    } catch (error) {
        res.status(401).json({
            message: 'Authorization failed'
        });
    }
};