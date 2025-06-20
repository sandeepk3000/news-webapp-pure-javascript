import express from "express";
import {
  createPost,
  uploadThumbnail,
} from "../controllers/post.controllers.js";
import jwtVerify from "../middlewares/auth.middleware.js";
import verifyAdmin from "../middlewares/admin.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
const router = express.Router();

router.route("/").post(jwtVerify, verifyAdmin, createPost);
router
  .route("/:id/upload-thumbnail")
  .post(jwtVerify, verifyAdmin, upload.single("thumbnail"), uploadThumbnail);
export default router;
