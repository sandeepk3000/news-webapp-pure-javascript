import express from "express";
import { registerUser } from "../controllers/user.controllers";

const router = express.Router();

router.route("/").post(registerUser);
