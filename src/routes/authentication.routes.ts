import {
  loginUser,
  registerUser,
} from "../controller/authentication.controller";
import express from "express";
import { body } from "express-validator";

export const authRoutes = express.Router();

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register users
 *     description: Register users
 */
authRoutes.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  registerUser
);

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Login users
 *     description: Login users
 */
authRoutes.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("password").exists().withMessage("Password is required"),
  ],
  loginUser
);
