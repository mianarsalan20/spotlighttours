import User from "../models/User.js";

//update a User

export const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to update try again" });
  }
};

//delete a User
export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to delete try again" });
  }
};

//getSingle a User
export const getSingleUser = async (req, res) => {
  try {
    const singleUser = await User.findById(req.params.id);
    res.status(200).json({
      success: true,
      message: "User found successfully",
      data: singleUser,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: "not found" });
  }
};

//getAll a User
export const getAllUser = async (req, res) => {
  try {
    const allUser = await User.find({});
    res.status(200).json({
      success: true,
      count: allUser.length,
      message: "Users found successfully",
      data: allUser,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: "not found" });
  }
};
