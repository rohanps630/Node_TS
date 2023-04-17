import User from "../models/user.model";
import { CustomResponse } from "../types/response.type";
import { CustomRequest } from "../types/request.type";

export const userData = async (
  req: CustomRequest,
  res: CustomResponse
) => {
  try {
    const userId = req.payload.userId;
    const user = await User.findById(userId).select("-password");
    res.customJson({ user }, "Success", 200);
  } catch (err) {
    console.error(err);
    return res.customError({ message: "Internal Server Error" }, "Error", 500);
  }
};
