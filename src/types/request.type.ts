import { Request } from "express";
import { Payload } from "./payload.type";

export interface CustomRequest extends Request {
  payload: Payload;
}