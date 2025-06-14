import { Router } from "express";
const router = Router();
import {
  createPost,
  getPost,
  getAllPosts,
  updatePost,
  deletePost,
  bookmarkPost,
  getTrendingPosts,
} from "../controllers/post.controllers.js";
import verifyJWT from "../middlewares/auth.middleware.js";
import verifyAdmin from "../middlewares/admin.middleware.js";

router.route("/").get(getAllPosts);
router.route("/:postId").get(getPost);
router.route("/").post(verifyJWT, verifyAdmin, createPost);
router.route("/:postId").put(verifyJWT, verifyAdmin, updatePost);
router.route("/:postId").delete(verifyJWT, verifyAdmin, deletePost);
router.route("/bookmark/:postId").get(verifyJWT, bookmarkPost);
export default router;
