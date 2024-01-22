import express from "express";
import {
  createBooking,
  getAllBooking,
  getSingleBooking,
  updateBooking,
  getBookingCount,
  getPendingBooking,
  getDoneBooking,
  getCancelledBooking,
} from "../controllers/bookingController.js";
//import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";
const router = express.Router();

// create a new review to a tour

router.post("/", createBooking);
router.get("/:id", getSingleBooking);
router.get("/", getAllBooking);
router.put("/:id", updateBooking);
router.get("/search/getBookingCount", getBookingCount);
router.get("/search/getPendingBooking", getPendingBooking);
router.get("/search/getDoneBooking", getDoneBooking);
router.get("/search/getCancelledBooking", getCancelledBooking);

export default router;
