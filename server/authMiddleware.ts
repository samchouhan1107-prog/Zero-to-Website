import { Request, Response, NextFunction } from "express";
import { findSession } from "./db";

export interface AuthRequest extends Request {
  userId?: string;
}

export function requireAuth(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!token) {
    return res.status(401).json({ error: "Authentication required" });
  }

  const session = findSession(token);
  if (!session) {
    return res.status(401).json({ error: "Invalid or expired session" });
  }

  req.userId = session.userId;
  next();
}
