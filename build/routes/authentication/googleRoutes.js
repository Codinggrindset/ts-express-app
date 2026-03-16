"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleRoute = void 0;
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const googleRoute = (0, express_1.Router)();
exports.googleRoute = googleRoute;
function isLoggedIn(req, res, next) {
    if (!req.user) {
        return res.sendStatus(401);
    }
    console.log(req.user);
    next();
}
googleRoute.get('/', passport_1.default.authenticate('google', { scope: ['email', 'profile'] }));
googleRoute.get('/callback', passport_1.default.authenticate('google', {
    successRedirect: '/auth/google/protected',
    failureRedirect: '/auth/google/failure'
}));
googleRoute.get('/protected', isLoggedIn, (req, res) => {
    res.send(`Welcome to the protected route ${req.user.name}`);
});
googleRoute.get('/failure', (req, res) => {
    res.send('something went wrong');
});
googleRoute.get("/logout", (req, res) => {
    req.logout({ keepSessionInfo: false }, (err) => {
        if (err) {
            console.error("Logout error:", err);
            return res.status(500).json({ message: "Logout failed" });
        }
        req.session.destroy((err) => {
            if (err) {
                console.error("Session destroy error:", err);
                return res.status(500).json({ message: "Failed to destroy session" });
            }
            res.clearCookie("connect.sid"); // default session cookie name
            res.json({ message: "Logged out successfully" });
        });
    });
});
//# sourceMappingURL=googleRoutes.js.map