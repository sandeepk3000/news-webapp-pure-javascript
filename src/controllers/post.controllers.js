import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { Post } from "../models/post.models.js";
const createPost = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    author,
    publishedAt,
    category,
    language,
    content,
    country,
    source,
    authorId,
    tags,
    thumbnail,
  } = req.body;
  if (
    [title, description, content, author, category, country, authorId].some(
      (field) => field?.trim() === "",
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }
  const post = await Post.create({
    title,
    description,
    content,
    author,
    publishedAt,
    category,
    language,
    country,
    source,
    authorId,
    tags,
    thumbnail,
  });
  const createdPost = await Post.findById(post._id);
  if (!createdPost) {
    throw new ApiError(500, "Something went wrong while creating the post");
  }
  return res
    .status(201)
    .json(new ApiResponse(200, createdPost, "Post created Successfully"));
});
export { createPost };
