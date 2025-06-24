import express from "express";
import { deleteMedia, uploadMedia } from "../controllers/media.controllers.js";
import jwtVerify from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import verifyAdmin from "../middlewares/admin.middleware.js";
const router = express.Router();
router
  .route("/upload-post-media")
  .post(jwtVerify, verifyAdmin, upload.single("media"), uploadMedia);

router.route("/delete-post-media").post(jwtVerify, verifyAdmin, deleteMedia);
export default router;
