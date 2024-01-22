import express from "express";
import {
  createCar,
  getAllCar,
  getCarCount,
  getSingleCar,
} from "../controllers/carController.js";
//import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";
const router = express.Router();

// create a new review to a tour

router.post("/", createCar);
router.get("/:id", getSingleCar);
router.get("/", getAllCar);
router.get("/search/getCarCount", getCarCount);

export default router;
