import { RequestHandler } from "express";

export function authenticatedRequest(): RequestHandler {
  return (req, res, next) => {
    const { profile, firebaseToken } = req.user ?? {};
    if (!profile || !firebaseToken) {
      res.status(401).json({ message: "Unauthorized request" });
      return;
    }
    next();
  };
}
