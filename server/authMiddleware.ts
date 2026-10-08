import { Request, Response, NextFunction } from "express";
import { findSession } from "./db";

export interface AuthRequest extends Request {
  userId?: string;
}

export function requireAuth(req: AuthRequest, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!token) {
    res.status(401).json({ error: "Authentication required" });
    return;
  }

  const session = findSession(token);
  if (!session) {
    res.status(401).json({ error: "Invalid or expired session" });
    return;
  }

  req.userId = session.userId;
  next();
}
