import express from "express";
import { createPost } from "../controllers/post.controllers.js";
import jwtVerify from "../middlewares/auth.middleware.js";
import verifyAdmin from "../middlewares/admin.middleware.js";

const router = express.Router();

router.route("/").post(jwtVerify, verifyAdmin, createPost);

export default router;
