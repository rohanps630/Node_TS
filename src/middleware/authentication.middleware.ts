import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwtUtils";
import { CustomRequest } from "../types/request.type";
import { CustomResponse } from "../types/response.type";

export const authMiddleware = (
  req: CustomRequest,
  res: CustomResponse,
  next: NextFunction
) => {
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = authorizationHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const payload = verifyToken(token);
    req.payload = payload;
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ error: "Unauthorized" });
  }
};
