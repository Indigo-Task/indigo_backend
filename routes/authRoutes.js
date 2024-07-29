import express from "express";
import {
  createUser,
  deleteMe,
  getAllUser,
  getUser,
  updateMe,
} from "../controllers/authController.js";

const router = express.Router();

router.route("/").get(getAllUser).post(createUser);
router.route("/:id").put(updateMe).delete(deleteMe).get(getUser);
export default router;
