import { Request, Response, Router } from "express";
import {
  generateAccessToken,
  generateRefreshToken,
  authenticateToken,
} from "../auth";
import { User } from "../users";
import bcrypt from "bcrypt";
import validator from 'validator'
import { z } from "zod";
const authRouter = Router();
import { validate } from "./validate";

const registerSchema = z.object({
  username: z
    .string("Username is required" )
    .min(6, "Username must be at least 6 characters")
    .max(20, "Username cannot exceed 20 characters")
    .regex(/^[a-zA-Z0-9._-]+$/, "Username can only contain letters, numbers, dots, underscores, or hyphens"),
  password: z
    .string("Password is required" )
    .min(8, "Password must be at least 8 characters long")
    .refine(
      (val) => /[A-Z]/.test(val),
      "Password must contain at least one uppercase letter"
    ),
  email: z.email("Invalid email format"),
});

const loginSchema = z.object({
  email: z.email("Invalid email format"),
  password: z
    .string("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .refine(
      (val) => /[A-Z]/.test(val),
      "Password must contain at least one uppercase letter"
    ),
});

authRouter.post("/register", validate(registerSchema), async (req: Request, res: Response) => {
    const { username, password, email } = req.body

    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "You already have an account" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name: username,
      password: hashedPassword,
      email: email
    });
    console.log(newUser)
    return res.status(201).json(newUser);
});

authRouter.post("/login", validate(loginSchema), async (req: Request, res: Response) => {
    const { email, password } = loginSchema.parse(req.body);

    const existingUser = await User.findOne({ email: email });

    if (!existingUser) {
      return res.status(400).json({ message: "You dont have an account" });
    }
    const comparePassword = await bcrypt.compare(
      password,
      existingUser.password as string
    );
    if (!comparePassword) {
      return res.status(401).json({ message: "Incorrect password entered" });
    }

    const token = generateAccessToken( existingUser._id.toString());
    const refreshToken = generateRefreshToken(existingUser._id.toString());
    
    return res
      .status(200)
      .json({ accessToken: token, refreshToken: refreshToken });
});

export default authRouter;
