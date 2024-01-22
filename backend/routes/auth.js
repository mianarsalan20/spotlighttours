import express from "express";
import { login, register } from "../controllers/authController.js";
const router = express.Router();

//Register a new User

router.post("/register", register);

//Login a User

router.post("/login", login);

export default router;
