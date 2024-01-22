import Car from "../models/Car.js";

// create a new Car

export const createCar = async (req, res) => {
  const newCar = new Car(req.body);
  try {
    const savedCar = await newCar.save();
    res.status(200).json({
      success: true,
      message: "Car created successfully",
      data: savedCar,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "internal server error" });
  }
};

//getSingle a Car
export const getSingleCar = async (req, res) => {
  try {
    const singleCar = await Car.findById(req.params.id).populate("reviews");
    res.status(200).json({
      success: true,
      message: "Car found successfully",
      data: singleCar,
    });
  } catch (error) {
    res
      .status(404)
      .json({ success: false, message: "Not found internal server error" });
  }
};

//getAll a Car
export const getAllCar = async (req, res) => {
  // for pagination
  const page = parseInt(req.query.page);
  try {
    const allCar = await Car.find({})
      .sort({ _id: -1 })
      .populate("reviews")
      .skip(page * 9)
      .limit(9);
    res.status(200).json({
      success: true,
      message: "All Cars found successfully",
      data: allCar,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: "internal server error" });
  }
};

//getCar count
export const getCarCount = async (req, res) => {
  try {
    const count = await Car.countDocuments({});
    res.status(200).json({
      success: true,
      message: "Cars count found successfully",
      data: count,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: "not found" });
  }
};
