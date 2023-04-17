import { Payload } from "../types/payload.type";
import * as jwt from "jsonwebtoken";
import config from "../config";

const JWT_SECRET = config.get("JWT_SECRET");
const JWT_EXPIRATION = config.getOrDefault("JWT_EXPIRATION", "1h");

/**
 * Signs a JWT token with the given payload.
 *
 * @param {Payload} payload - The payload to be included in the JWT token.
 * @returns {string} - The signed JWT token.
 */
export const signToken = (payload: Payload): string => {
  try {
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
    return token;
  } catch (error) {
    throw new Error("Error signing JWT token");
  }
};

/**
 * Verifies and decodes a JWT token to retrieve the payload.
 *
 * @param {string} token - The JWT token to be verified and decoded.
 * @returns {Payload} - The decoded payload from the JWT token.
 */
export const verifyToken = (token: string): Payload => {
  try {
    const payload = jwt.verify(token, JWT_SECRET) as Payload;
    return payload;
  } catch (error) {
    throw new Error("Error verifying JWT token");
  }
};
