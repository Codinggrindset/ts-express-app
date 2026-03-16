import { NextFunction, Request, Response } from "express";
declare module "express-serve-static-core" {
    interface Request {
        userId?: string;
        user: {
            id: string;
            name: string;
        };
    }
}
declare function generateAccessToken(userId: string): string;
declare function generateRefreshToken(userId: string): string;
declare function authenticateToken(req: Request, res: Response, next: NextFunction): Response<any, Record<string, any>> | undefined;
export { generateAccessToken, generateRefreshToken, authenticateToken };
//# sourceMappingURL=auth.d.ts.map