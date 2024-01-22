import express from "express";
//import { verifyAdmin } from "../utils/verifyToken.js";
import {
  createTour,
  updateTour,
  deleteTour,
  getSingleTour,
  getAllTour,
  getFeaturedTour,
  getTourCount,
  getTourBySearch,
} from "./../controllers/tourController.js";
const router = express.Router();

//create a new tour

router.post("/", createTour);

//update a tour

router.put("/:id", updateTour);

//delete a tour

router.delete("/:id", deleteTour);

//getSingle tour

router.get("/:id", getSingleTour);

//getAll tour

router.get("/", getAllTour);

router.get("/search/getTourBySearch", getTourBySearch);

router.get("/search/getFeaturedTour", getFeaturedTour);

router.get("/search/getTourCount", getTourCount);

export default router;
