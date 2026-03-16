import { ZodError } from "zod";
import { Request, Response, NextFunction } from "express";

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  if (err instanceof ZodError) {
    return res.status(400).json({
      message: "Validation failed",
      errors: err.issues.map((i) => i.message),
    });
  }

  console.error(err);
 return res.status(500).json({ message: "Internal server error" });
}