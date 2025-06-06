// middleware/auth.js

const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
const authHeader = req.headers.authorization;

  // 1. Check if authorization header exists and starts with "Bearer "

if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
    error: "Unauthorized",
    message: "Authentication invalid",
    });
}

const token = authHeader.split(" ")[1];

try {
    // 2. Verify token using secret

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Attach user info to request

    req.user = {
    userid: decoded.userid,
    username: decoded.username,
    };

    // 4. Move to next middleware/route
    
    next();
} catch (err) {
    return res.status(401).json({
    error: "Unauthorized",
    message: "Authentication invalid",
    });

}

module.exports = auth;
