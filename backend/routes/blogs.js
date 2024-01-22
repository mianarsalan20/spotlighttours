import express from "express";
import {
  createBlog,
  getAllBlog,
  getBlogCount,
  getSingleBlog,
} from "../controllers/blogController.js";
//import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";
const router = express.Router();

// create a new review to a tour

router.post("/", createBlog);
router.get("/:id", getSingleBlog);
router.get("/", getAllBlog);
router.get("/search/getBlogCount", getBlogCount);

export default router;
