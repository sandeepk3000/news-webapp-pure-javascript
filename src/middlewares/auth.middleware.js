import { User } from "../models/user.models.js";
import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";

const jwtVerify = asyncHandler(async (req, _, next) => {
  const token =
    req.cookies?.accessToken ||
    req.headers("Authorization")?.replace("Bearer ", "");
  if (!token) {
    throw new ApiError(401, "Unauthorized request");
  }
  const decodedToken = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  const user = await User.findById(decodedToken?._id).select(
    "-refreshToken -password",
  );
  if (!user) {
    throw new ApiError(404, "User is not signup");
  }
  req.user = user;
  next();
});
export default jwtVerify;
