import Tour from "../models/Tour.js";
import Review from "../models/Review.js";

// create a new tour

export const createReview = async (req, res) => {
  const tourId = req.params.tourId;
  const newReview = new Review({ ...req.body });
  try {
    const savedReview = await newReview.save();
    //after saving the review, we need to add the review to the tour
    await Tour.findByIdAndUpdate(tourId, {
      $push: { reviews: savedReview._id },
    });
    res
      .status(200)
      .json({ success: true, message: "Review Submitted", data: savedReview });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to Submit try again" });
  }
};
