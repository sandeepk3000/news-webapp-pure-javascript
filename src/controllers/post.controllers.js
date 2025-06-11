import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { Post } from "../models/post.models.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

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
    authorId
  } = req.body;
  if (
    [title, description, content, author, publishedAt].some(
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
    authorId
  });
  const createdPost = await Post.findById(post._id);
  if (!createdPost) {
    throw new ApiError(500, "Something went wrong while creating the post");
  }
  return res
    .status(201)
    .json(new ApiResponse(200, createdPost, "Post created Successfully"));
});
const getPost = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const post = await Post.findById(postId);
  if (!post) {
    throw new ApiError(404, "Post not found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, post, "Post fetched Successfully"));
});
const getAllPosts = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, query, sortBy, sortType, filter } = req.query;
  const posts = await Post.find({})
    .sort({ [sortBy]: sortType })
    .skip((page - 1) * limit)
    .limit(limit);
  const totalPosts = await Post.countDocuments();
  const totalPages = Math.ceil(totalPosts / limit);
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { posts, totalPages, currentPage: page },
        "Posts fetched Successfully",
      ),
    );
});
const updatePost = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const {
    title,
    description,
    content,
    author,
    publishedAt,
    category,
    language,
  } = req.body;
  const post = await Post.findByIdAndUpdate(
    postId,
    {
      title,
      description,
      content,
      author,
      publishedAt,
      category,
      language,
    },
    { new: true },
  );
  if (!post) {
    throw new ApiError(404, "Post not found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, post, "Post updated Successfully"));
});
const deletePost = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const post = await Post.findByIdAndDelete(postId);
  if (!post) {
    throw new ApiError(404, "Post not found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, post, "Post deleted Successfully"));
});
export { createPost, getPost, getAllPosts, updatePost, deletePost };
