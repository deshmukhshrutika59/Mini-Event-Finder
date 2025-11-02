// src/middleware/authMiddleware.ts
import jwt from "jsonwebtoken";
import User from "../models/User";
import { Request, Response, NextFunction } from "express";

export interface AuthRequest extends Request {
  user?: any;
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
const user = await User.findById(payload.id).select("-password");

    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token invalid or expired" });
  }
};


// import { Request, Response, NextFunction } from "express";
// import jwt from "jsonwebtoken";

// interface JwtPayload {
//   id: string;
//   email?: string;
// }

// export interface AuthRequest extends Request {
//   user?: JwtPayload;
// }

// export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction) => {
//   try {
//     const header = req.header("Authorization");
//     if (!header) return res.status(401).json({ message: "Authorization header missing" });

//     const token = header.replace("Bearer ", "");
//     if (!token) return res.status(401).json({ message: "Token missing" });

//     const secret = process.env.JWT_SECRET;
//     if (!secret) return res.status(500).json({ message: "JWT_SECRET not set" });

//     const decoded = jwt.verify(token, secret) as JwtPayload;
//     req.user = decoded;
//     next();
//   } catch (err) {
//     return res.status(401).json({ message: "Invalid or expired token" });
//   }
// };