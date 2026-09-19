const jwt = require("jsonwebtoken")

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization


        if (!authHeader?.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: "Authentication required",
            });
        }
        const token = authHeader?.split(" ")?.[1]

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Authentication required",
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.user = {
            userId: decoded.userId,
        }

        next()
    } catch (e) {
        return res.status(401).json({
            message: "Invalid or expired token" || e.message
        })
    }
}

module.exports = {
    authMiddleware
}