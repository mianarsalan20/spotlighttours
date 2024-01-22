import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import tourRoute from "./routes/tours.js";
import userRoute from "./routes/users.js";
import authRoute from "./routes/auth.js";
import reviewRoute from "./routes/reviews.js";
import bookingRoute from "./routes/bookings.js";
import blogRoute from "./routes/blogs.js";
import carRoute from "./routes/cars.js";
import carReviewRoute from "./routes/carReviews.js";
import carBookingRoute from "./routes/carBookings.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;
const corsOptions = {
  origin: true,
  credentials: true,
};

// database connection
mongoose.set("strictQuery", false);
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.log("MongoDB connection error");
  }
};

//for testing
{
  /*app.get('/', (req, res) => {
    res.send('Hello World!');
});*/
}

// Middleware
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/tours", tourRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/reviews", reviewRoute);
app.use("/api/v1/bookings", bookingRoute);
app.use("/api/v1/blogs", blogRoute);
app.use("/api/v1/cars", carRoute);
app.use("/api/v1/carReviews", carReviewRoute);
app.use("/api/v1/carBookings", carBookingRoute);

app.listen(port, () => {
  connect();
  console.log(`Server is running on port ${port}`);
});
