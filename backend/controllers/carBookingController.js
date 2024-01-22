import Booking from "../models/CarBooking.js";

// create a new tour

export const createBooking = async (req, res) => {
  const newBooking = new Booking(req.body);
  try {
    const savedBooking = await newBooking.save();
    res.status(200).json({
      success: true,
      message: "Booking Submitted",
      data: savedBooking,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "internal server error in booking" });
  }
};

//update a Booking

export const updateBooking = async (req, res) => {
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Booking updated successfully",
      data: updatedBooking,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to update try again" });
  }
};

//getSingle a Booking
export const getSingleBooking = async (req, res) => {
  try {
    const singleBooking = await Booking.findById(req.params.id);
    res.status(200).json({
      success: true,
      message: "Booking found successfully",
      data: singleBooking,
    });
  } catch (error) {
    res
      .status(404)
      .json({ success: false, message: "Not found internal server error" });
  }
};

//getAll a Booking
export const getAllBooking = async (req, res) => {
  // for pagination
  const page = parseInt(req.query.page);
  try {
    const allBooking = await Booking.find({})
      .sort({ _id: -1 })
      .skip(page * 8)
      .limit(8);
    res.status(200).json({
      success: true,
      message: "All Bookings found successfully",
      data: allBooking,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: "internal server error" });
  }
};

//get Pending a Booking
export const getPendingBooking = async (req, res) => {
  // for pagination
  const page = parseInt(req.query.page);
  try {
    const allBooking = await Booking.find({ status: "Pending" })
      .sort({ _id: -1 })
      .skip(page * 8)
      .limit(8);
    res.status(200).json({
      success: true,
      message: "All Bookings found successfully",
      data: allBooking,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: "internal server error" });
  }
};

//get Done a Booking
export const getDoneBooking = async (req, res) => {
  // for pagination
  const page = parseInt(req.query.page);
  try {
    const allBooking = await Booking.find({ status: "Done" })
      .sort({ _id: -1 })
      .skip(page * 8)
      .limit(8);
    res.status(200).json({
      success: true,
      message: "All Bookings found successfully",
      data: allBooking,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: "internal server error" });
  }
};

//get Cancelled a Booking
export const getCancelledBooking = async (req, res) => {
  // for pagination
  const page = parseInt(req.query.page);
  try {
    const allBooking = await Booking.find({ status: "Cancelled" })
      .sort({ _id: -1 })
      .skip(page * 8)
      .limit(8);
    res.status(200).json({
      success: true,
      message: "All Bookings found successfully",
      data: allBooking,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: "internal server error" });
  }
};
//getBooking count
export const getBookingCount = async (req, res) => {
  try {
    const count = await Booking.countDocuments({});
    res.status(200).json({
      success: true,
      message: "Bookings count found successfully",
      data: count,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: "not not found" });
  }
};
