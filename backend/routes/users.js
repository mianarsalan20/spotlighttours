import express from "express";
import {
  updateUser,
  deleteUser,
  getSingleUser,
  getAllUser,
} from "./../controllers/usersController.js";
const router = express.Router();

import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

//update a User

router.put("/:id", verifyUser, updateUser);

//delete a User

router.delete("/:id", verifyUser, deleteUser);

//getSingle User

router.get("/:id", verifyUser, getSingleUser);

//getAll User

router.get("/", verifyAdmin, getAllUser);

export default router;
