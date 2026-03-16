import { request, Request, Response, Router } from "express";
import { User } from "./users";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import {
  generateAccessToken,
  generateRefreshToken,
  authenticateToken,
} from "./auth";

export interface UserAuthToken extends JwtPayload {
  userId: string;
}

const router = Router();

router.post("/token", async (req, res) => {
  try {
    const refreshToken = req.body.token;
    if (!refreshToken) {
      return res.sendStatus(401);
    }
    const verifyToken: UserAuthToken = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET as string
    ) as UserAuthToken;
    console.log(verifyToken);
    const accessToken = generateAccessToken(verifyToken.userId);
    return res.status(201).json({ accessToken });
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
});

router.get("/protected", authenticateToken, async (req: Request, res: Response) => {
  try {
    return res.status(200).json(req.userId);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});



export { router };
