import { Router } from "express";
const router = Router();
import {
  createPost,
  getPost,
  getAllPosts,
  updatePost,
  deletePost,
} from "../controllers/post.controllers.js";
import verifyJWT from "../middlewares/auth.middleware.js";
import verifyAdmin from "../middlewares/admin.middleware.js";

router.route("/").get(getAllPosts);
router.route("/:postId").get(getPost);
router.route("/").post(verifyJWT, verifyAdmin, createPost);
router.route("/:postId").put(verifyJWT, verifyAdmin, updatePost);
router.route("/:postId").delete(verifyJWT, verifyAdmin, deletePost);
export default router;
