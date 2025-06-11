import { Router } from "express";
const router = Router();
import { loginUser, registerUser } from "../controllers/user.controllers.js";
import { upload } from "../middlewares/multer.js";
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
export default router;
