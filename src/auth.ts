import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import { UserAuthToken } from "./routers";

declare module "express-serve-static-core" {
  interface Request {
    userId?: string;
    user: {
      id: string;
      name: string;
    };
  }
}


function generateAccessToken(userId: string) {
  return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET as string, {
    expiresIn: '10m'
  });
}

function generateRefreshToken(userId: string) {
  return jwt.sign({userId}, process.env.REFRESH_TOKEN_SECRET as string, {
    expiresIn: '30m',
  });
}

function authenticateToken(req: Request, res: Response, next: NextFunction) {
const authHeader = req.headers['authorization']
const token = authHeader && authHeader.split(' ')[1]
  if(!token ) {
    return res.sendStatus(401)
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (err, user ) => {
    if(err) {
      return res.status(403).json({message: "Invalid or expired token"})
  }
  const verifiedUser = user as UserAuthToken
    req.userId = verifiedUser.userId;
    next()
  })
}

export {
  generateAccessToken,
  generateRefreshToken,
  authenticateToken
};
