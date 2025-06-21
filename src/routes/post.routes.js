import express from "express";
import {
  publishPost,
  uploadThumbnail,
} from "../controllers/post.controllers.js";
import jwtVerify from "../middlewares/auth.middleware.js";
import verifyAdmin from "../middlewares/admin.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
const router = express.Router();

router.route("/:id/publish").post(jwtVerify, verifyAdmin, publishPost);
router.route("/publish").post(jwtVerify, verifyAdmin, publishPost);
router
  .route("/:id/upload-thumbnail")
  .post(jwtVerify, verifyAdmin, upload.single("thumbnail"), uploadThumbnail);
export default router;
