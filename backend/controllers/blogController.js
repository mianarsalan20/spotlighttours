import Blog from "../models/Blog.js";

// create a new Blog

export const createBlog = async (req, res) => {
  const newBlog = new Blog(req.body);
  try {
    const savedBlog = await newBlog.save();
    res
      .status(200)
      .json({ success: true, message: "Blog Submitted", data: savedBlog });
  } catch (error) {
    res.status(500).json({ success: false, message: "internal server error" });
  }
};

//getSingle a Blog
export const getSingleBlog = async (req, res) => {
  try {
    const singleBlog = await Blog.findById(req.params.id);
    res.status(200).json({
      success: true,
      message: "Blog found successfully",
      data: singleBlog,
    });
  } catch (error) {
    res
      .status(404)
      .json({ success: false, message: "Not found internal server error" });
  }
};

//getAll a Blog
export const getAllBlog = async (req, res) => {
  try {
    const allBlog = await Blog.find({}).sort({ _id: -1 });
    res.status(200).json({
      success: true,
      message: "All Blogs found successfully",
      data: allBlog,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: "internal server error" });
  }
};

//getBlog count
export const getBlogCount = async (req, res) => {
  try {
    const count = await Blog.countDocuments({});
    res.status(200).json({
      success: true,
      message: "Blogs count found successfully",
      data: count,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: "not found" });
  }
};
