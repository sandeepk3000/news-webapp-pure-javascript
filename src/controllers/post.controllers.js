import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { Post } from "../models/post.models.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
const createPost = async ({
  title,
  content,
  author,
  publishedAt,
  status,
  category,
  language,
  country,
  state,
  city,
  source,
  authorId,
  tags,
  thumbnail,
}) => {
  try {
    if (
      [title, content, author, category, country, state, city, authorId].some(
        (field) => field?.trim() === "",
      )
    ) {
      throw new ApiError(400, "All fields are required");
    }
    const post = await Post.create({
      title,
      content,
      author,
      publishedAt,
      status,
      category,
      language,
      country,
      state,
      city,
      source,
      authorId,
      tags,
      thumbnail,
    });
    if (!post) {
      throw new ApiError(500, "Something went wrong while creating the post");
    }
    return post;
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};
const updatePost = async (postId, data) => {
  try {
    const postExist = await Post.findById(postId);
    if (!postExist) {
      throw new ApiError(404, "Post is not exist");
    }
    const updatedPost = await Post.findByIdAndUpdate(postId, data, {
      new: true,
    });
    if (!updatedPost) {
      throw new ApiError(500, "Something went wrong while updating the post");
    }
    return updatedPost;
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};

const publishPost = asyncHandler(async (req, res) => {
  const postId = req.params.id;
  let publishedPost = null;
  if (!postId) {
    publishedPost = await createPost(req.body);
  } else {
    publishedPost = await updatePost(postId, req.body);
  }
  return res
    .status(201)
    .json(
      new ApiResponse(200, publishedPost, "Post is published Successfully"),
    );
});
const savePost = asyncHandler(async (req, res) => {
  const postId = req.params.id;
  let post = null;
  if (postId) {
    post = await updatePost(postId, req.body);
  } else {
    post = await createPost(req.body);
  }
  return res.status(201).json(new ApiResponse(200, post, "Post is saved"));
});
const uploadThumbnail = asyncHandler(async (req, res) => {
  const thumbnailLocalPath = req?.file?.path;
  const postId = req.params.id;
  const postExist = await Post.findById(postId);
  if (!postExist) {
    throw new ApiError(404, "Post is not exist");
  }
  if (!thumbnailLocalPath) {
    throw new ApiError(404, "Thumbnail local path is required");
  }
  const cloudinaryResponse = await uploadOnCloudinary(thumbnailLocalPath);
  postExist.thumbnail = cloudinaryResponse?.url || postExist.url;
  postExist.save();

  return res
    .status(200)
    .json(new ApiResponse(200, postExist, "Thumbnail uploaded"));
});
export { publishPost, savePost, uploadThumbnail };
