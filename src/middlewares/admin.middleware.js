import { User } from "../models/user.models.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
const verifyAdmin = asyncHandler(async (req, _, next) => {
  const user = await User.findById(req.user._id);
  if (user.role !== "ADMIN") {
    throw new ApiError(req,401, "User is not an admin");
  }
  next();
});
export default verifyAdmin;
