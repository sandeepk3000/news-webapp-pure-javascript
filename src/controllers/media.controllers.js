import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import {
  uploadOnCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinary.js";
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
const deleteMedia = asyncHandler(async (req, res) => {
  const { public_id } = req.body;
  if (!public_id) {
    throw new ApiError(400, "public_id is required");
  }
  const response = await deleteFromCloudinary(public_id);
  return res
    .status(200)
    .json(new ApiResponse(200, response, "Media deleted successfully"));
});
export { uploadMedia, deleteMedia };
