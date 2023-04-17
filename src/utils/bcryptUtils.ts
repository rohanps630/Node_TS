import * as bcrypt from "bcryptjs";

const SALT_ROUNDS = 10; // Number of salt rounds for bcrypt

/**
 * Hashes a password using bcrypt.
 *
 * @param {string} password - The plain text password to be hashed.
 * @returns {Promise<string>} - A Promise that resolves to the hashed password.
 */
export const hashPassword = async (password: string): Promise<string> => {
  try {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    throw new Error("Error hashing password");
  }
};

/**
 * Compares a plain text password with a hashed password using bcrypt.
 *
 * @param {string} password - The plain text password to be compared.
 * @param {string} hashedPassword - The hashed password to be compared against.
 * @returns {Promise<boolean>} - A Promise that resolves to a boolean value indicating whether the passwords match.
 */
export const comparePasswords = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  try {
    const passwordMatch = await bcrypt.compare(password, hashedPassword);
    return passwordMatch;
  } catch (error) {
    throw new Error("Error comparing passwords");
  }
};
