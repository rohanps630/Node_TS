import { NextFunction } from "express";
import { IResponseFormat, ResponseFactory } from "../utils/responseFactory";
import { CustomResponse } from "../types/response.type";
import { CustomRequest } from "../types/request.type";
import { verifyToken } from "../utils/jwtUtils";

const unprotectedPaths = ["/api/login", "/api/register"];

export const responseFormatMiddleware = (
  req: CustomRequest,
  res: CustomResponse,
  next: NextFunction
) => {
  if (!unprotectedPaths.includes(req.path)) {
    const formattedError: IResponseFormat = ResponseFactory.formatError(
      { message: "Unauthorized" },
      "Error",
      401
    );
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return res.status(401).json(formattedError);
    }
    const token = authorizationHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json(formattedError);
    }
    try {
      verifyToken(token);
    } catch (err) {
      console.error(err);
      return res.status(401).json(formattedError);
    }
  }

  res.customJson = (data: any, message: string, status: number = 200) => {
    const formattedResponse: IResponseFormat = ResponseFactory.format(
      data,
      message,
      status
    );
    res.status(status).json(formattedResponse);
  };

  res.customError = (error: any, message: string, status: number = 500) => {
    const formattedError: IResponseFormat = ResponseFactory.formatError(
      error,
      message,
      status
    );
    res.status(status).json(formattedError);
  };

  next();
};
