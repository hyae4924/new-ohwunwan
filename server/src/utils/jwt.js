import jwt from "jsonwebtoken";
import config from "../config/config.js";

export async function createToken(userId) {
  return jwt.sign(
    {
      userId,
    },
    config.jwt.secretKey,
    {
      expiresIn: config.jwt.expires,
    }
  );
}

export function setToken(res, token) {
  const option = {
    maxAge: config.jwt.expires * 1000,
    httpOnly: true,
    sameSite: "none",
    secure: true,
  };
  res.cookie("token", token, option);
}
