import jwt from "jsonwebtoken";

export const generateAccessToken = (userId: string) => {
  const secret = process.env.JWT_SECRET!;
  return jwt.sign({ userId }, secret, { expiresIn: "15m" });
};

export const generateRefreshToken = (userId: string) => {
  const secret = process.env.REFRESH_TOKEN_SECRET!;
  return jwt.sign({ userId }, secret, { expiresIn: "7d" });
};
