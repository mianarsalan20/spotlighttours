import Tour from "../models/Tour.js";

// create a new tour

export const createTour = async (req, res) => {
  const newTour = new Tour(req.body);
  try {
    const savedTour = await newTour.save();
    res.status(200).json({
      success: true,
      message: "Tour created successfully",
      data: savedTour,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to create try again" });
  }
};

//update a tour

export const updateTour = async (req, res) => {
  try {
    const updatedTour = await Tour.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Tour updated successfully",
      data: updatedTour,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to update try again" });
  }
};

//delete a tour
export const deleteTour = async (req, res) => {
  try {
    const deletedTour = await Tour.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ success: true, message: "Tour deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to delete try again" });
  }
};

//getSingle a tour
export const getSingleTour = async (req, res) => {
  try {
    const singleTour = await Tour.findById(req.params.id).populate("reviews");
    res.status(200).json({
      success: true,
      message: "Tour found successfully",
      data: singleTour,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: "not found" });
  }
};

//getAll a tour
export const getAllTour = async (req, res) => {
  // for pagination
  const page = parseInt(req.query.page);

  try {
    const allTour = await Tour.find({})
      .sort({ _id: -1 })
      .populate("reviews")
      .skip(page * 9)
      .limit(9);
    res.status(200).json({
      success: true,
      count: allTour.length,
      message: "Tours found successfully",
      data: allTour,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: "not found" });
  }
};

//getFeatured a tour
export const getFeaturedTour = async (req, res) => {
  try {
    const featuredTour = await Tour.find({ featured: true })
      .sort({ _id: -1 })
      .populate("reviews")
      .limit(8);
    res.status(200).json({
      success: true,
      message: "Featured Tours found successfully",
      data: featuredTour,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: "not found" });
  }
};

//getTour by search
export const getTourBySearch = async (req, res) => {
  const { search } = req.query;
  try {
    const tours = await Tour.find({
      name: { $regex: search, $options: "i" },
    }).populate("reviews");
    res.status(200).json({
      success: true,
      message: "Tours found successfully",
      data: tours,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: "not found" });
  }
};

//getTour count
export const getTourCount = async (req, res) => {
  try {
    const count = await Tour.countDocuments({});
    res.status(200).json({
      success: true,
      message: "Tours count found successfully",
      data: count,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: "not found" });
  }
};
