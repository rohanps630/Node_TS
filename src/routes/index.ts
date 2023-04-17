import express from "express";
import { userRoutes } from "./user.routes";
import { authRoutes } from "./authentication.routes";

export const routes = express.Router();

routes.use([authRoutes, userRoutes]);
