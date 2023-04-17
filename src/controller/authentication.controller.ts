import User from "../models/user.model";
import { comparePasswords, hashPassword } from "../utils/bcryptUtils";
import { signToken } from "../utils/jwtUtils";
import { generateGravatarUrl } from "../utils/gravatarUtils";
import { CustomResponse } from "../types/response.type";
import { CustomRequest } from "../types/request.type";

export const loginUser = async (req: CustomRequest, res: CustomResponse) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.customError({ message: "Invalid credentials" }, "Error", 400);
    }

    const isMatch = await comparePasswords(password, user.password);
    if (!isMatch) {
      return res.customError({ message: "Invalid credentials" }, "Error", 400);
    }

    const payload = { userId: user.id };
    const token = signToken(payload);

    res.customJson({ token: token }, "Success", 200);
  } catch (err) {
    console.error(err);
    return res.customError({ message: "Internal Server Error" }, "Error", 500);
  }
};

export const registerUser = async (req: CustomRequest, res: CustomResponse) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.customError({ message: "User already exists" }, "Error", 400);
    }

    const avatar = generateGravatarUrl(email);
    const hashedPassword = await hashPassword(password);

    user = new User({ email, password: hashedPassword, avatar });
    await user.save();

    const payload = { userId: user.id };
    const token = signToken(payload);

    res.customJson({ token: token }, "Success", 200);
  } catch (err) {
    console.error(err);
    return res.customError({ message: "Internal Server Error" }, "Error", 500);
  }
};
