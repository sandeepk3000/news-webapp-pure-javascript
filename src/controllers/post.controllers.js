import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { Post } from "../models/post.models.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
const setStatus = (publishedAt, status) => {
  if (status === "SCHEDULE" && new Date(publishedAt) < new Date()) {
    return "PUBLISH";
  }
  return status;
};
const createPost = asyncHandler(async (req, res) => {
  const {
    title,
    slug,
    content,
    source,
    author,
    authorId,
    publishedAt,
    category,
    tags,
    language,
    country,
    status,
    isBreaking,
    thumbnail,
  } = req.body;
  if (
    [title, content, source, author, authorId, publishedAt, status, slug].some(
      (field) => field?.trim() === "",
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const post = await Post.create({
    title,
    slug,
    content,
    source,
    author,
    authorId,
    publishedAt,
    category,
    tags,
    language,
    country,
    status: setStatus(publishedAt, status),
    isBreaking,
    thumbnail,
  });
  return res.status(201).json(new ApiResponse(201, post, "Post created"));
});
export { createPost };
