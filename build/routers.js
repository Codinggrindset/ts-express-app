"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_1 = require("./auth");
const router = (0, express_1.Router)();
exports.router = router;
router.post("/token", async (req, res) => {
    try {
        const refreshToken = req.body.token;
        if (!refreshToken) {
            return res.sendStatus(401);
        }
        const verifyToken = jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        console.log(verifyToken);
        const accessToken = (0, auth_1.generateAccessToken)(verifyToken.userId);
        return res.status(201).json({ accessToken });
    }
    catch (error) {
        return res.status(403).json({ message: "Invalid or expired token" });
    }
});
router.get("/protected", auth_1.authenticateToken, async (req, res) => {
    try {
        return res.status(200).json(req.userId);
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
//# sourceMappingURL=routers.js.map