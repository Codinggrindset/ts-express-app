"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../auth");
const users_1 = require("../users");
const bcrypt_1 = __importDefault(require("bcrypt"));
const zod_1 = require("zod");
const authRouter = (0, express_1.Router)();
const validate_1 = require("./validate");
const registerSchema = zod_1.z.object({
    username: zod_1.z
        .string("Username is required")
        .min(6, "Username must be at least 6 characters")
        .max(20, "Username cannot exceed 20 characters")
        .regex(/^[a-zA-Z0-9._-]+$/, "Username can only contain letters, numbers, dots, underscores, or hyphens"),
    password: zod_1.z
        .string("Password is required")
        .min(8, "Password must be at least 8 characters long")
        .refine((val) => /[A-Z]/.test(val), "Password must contain at least one uppercase letter"),
    email: zod_1.z.email("Invalid email format"),
});
const loginSchema = zod_1.z.object({
    email: zod_1.z.email("Invalid email format"),
    password: zod_1.z
        .string("Password is required")
        .min(8, "Password must be at least 8 characters long")
        .refine((val) => /[A-Z]/.test(val), "Password must contain at least one uppercase letter"),
});
authRouter.post("/register", (0, validate_1.validate)(registerSchema), async (req, res) => {
    const { username, password, email } = req.body;
    const existingUser = await users_1.User.findOne({ email: email });
    if (existingUser) {
        return res.status(400).json({ message: "You already have an account" });
    }
    const hashedPassword = await bcrypt_1.default.hash(password, 10);
    const newUser = await users_1.User.create({
        name: username,
        password: hashedPassword,
        email: email
    });
    console.log(newUser);
    return res.status(201).json(newUser);
});
authRouter.post("/login", (0, validate_1.validate)(loginSchema), async (req, res) => {
    const { email, password } = loginSchema.parse(req.body);
    const existingUser = await users_1.User.findOne({ email: email });
    if (!existingUser) {
        return res.status(400).json({ message: "You dont have an account" });
    }
    const comparePassword = await bcrypt_1.default.compare(password, existingUser.password);
    if (!comparePassword) {
        return res.status(401).json({ message: "Incorrect password entered" });
    }
    const token = (0, auth_1.generateAccessToken)(existingUser._id.toString());
    const refreshToken = (0, auth_1.generateRefreshToken)(existingUser._id.toString());
    return res
        .status(200)
        .json({ accessToken: token, refreshToken: refreshToken });
});
exports.default = authRouter;
//# sourceMappingURL=authentication.js.map