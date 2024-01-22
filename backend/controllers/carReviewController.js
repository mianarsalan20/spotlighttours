import Car from "../models/Car.js";
import CarReview from "../models/CarReview.js";

// create a new car

export const createReview = async (req, res) => {
  const carId = req.params.carId;
  const newReview = new CarReview({ ...req.body });
  try {
    const savedReview = await newReview.save();
    //after saving the review, we need to add the review to the car
    await Car.findByIdAndUpdate(carId, {
      $push: { reviews: savedReview._id },
    });
    console.log("carId", carId);
    res
      .status(200)
      .json({ success: true, message: "Review Submitted", data: savedReview });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to Submit try again" });
  }
};
