import express from "express";
import {
  registerUser,
  loginUser,
  uploadAvatar,
} from "../controllers/user.controllers.js";
import jwtVerify from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
const router = express.Router();

router.route("/").post(registerUser);

router.route("/login").post(loginUser);

router
  .route("/upload-avatar")
  .post(jwtVerify, upload.single("avatar"), uploadAvatar);

export default router;
