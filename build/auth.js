"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAccessToken = generateAccessToken;
exports.generateRefreshToken = generateRefreshToken;
exports.authenticateToken = authenticateToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function generateAccessToken(userId) {
    return jsonwebtoken_1.default.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '10m'
    });
}
function generateRefreshToken(userId) {
    return jsonwebtoken_1.default.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '30m',
    });
}
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.sendStatus(401);
    }
    jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Invalid or expired token" });
        }
        const verifiedUser = user;
        req.userId = verifiedUser.userId;
        next();
    });
}
//# sourceMappingURL=auth.js.map