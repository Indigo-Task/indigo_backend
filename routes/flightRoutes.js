import express from "express";
import {
  createFlight,
  deleteFlight,
  getAllFlights,
  getFlight,
  updateFlight,
} from "../controllers/flightsController.js";

const router = express.Router();

router.route("/").get(getAllFlights).post(createFlight);
router.route("/:id").put(updateFlight).delete(deleteFlight).get(getFlight);
export default router;
