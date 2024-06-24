const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'Never Fall in love at your Early twenties';
const fetchuser = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "Please Authenticate with the valid Token" })
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ error: "Please Authenticate with the valid Token" })
    }

}

module.exports = fetchuser;