import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      photo: req.body.photo,
    });

    await newUser.save();
    res
      .status(200)
      .json({ success: true, message: "User created successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to create try again" });
  }
};

export const login = async (req, res) => {
  const email = req.body.email;
  try {
    const user = await User.findOne({ email });

    //if user not found
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    //if user exsit then compare password
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    //if password is not valid
    if (!validPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Wrong password" });
    }

    const { password, ...rest } = user._doc;

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "15d" }
    );

    //set token in cookie
    res
      .cookie("token", token, {
        httpOnly: true,
        expires: token.expiresIn,
      })
      .json({
        token,
        data: { ...rest },
      });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to login" });
  }
};

export const logout = async (req, res) => {
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
