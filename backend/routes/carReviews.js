import express from "express";
import { createReview } from "../controllers/carReviewController.js";
//import { verifyUser } from "../utils/verifyToken.js";
const router = express.Router();

// create a new review to a tour

router.post("/:carId", createReview);

export default router;
