import express from "express";
import { authMiddleware } from "../middleware/authentication.middleware";
import { userData } from "../controller/user.controller";

export const userRoutes = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get user detail
 *     description: Get user detail.
 */
userRoutes.get("/users", authMiddleware, userData);
