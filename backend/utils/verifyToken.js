import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res.status(401).json({ success: false, message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    console.log("pass toke verify");
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: "Unauthorized" });
  }
};

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.id === req.params.id || req.user.role === "user") {
      next();
    } else {
      res
        .status(403)
        .json({ success: false, message: "You are not allowed to do that" });
    }
  });
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.id === req.params.id && req.user.role === "admin") {
      console.log("pass admin verify");
      next();
    } else {
      res
        .status(403)
        .json({ success: false, message: "You are not allowed to do that" });
    }
  });
};
