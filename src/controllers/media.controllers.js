import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
const uploadMedia = asyncHandler(async (req, res) => {
  const localFilePath = req.file?.path;
  if (!localFilePath) {
    throw new ApiError(400, "File is required");
  }
  const response = await uploadOnCloudinary(localFilePath);
  return res
    .status(200)
    .json(new ApiResponse(200, response, "Media uploaded successfully"));
});
export { uploadMedia };
