import express from "express";
import {
  createDonorController,
  getDonorController,
  getDonorsController,
  updateDonorController,
  updateDonorAvailabilityController,
  deleteDonorController,
} from "../controller/donor.js";

const router = express.Router();

router.post("/", createDonorController);
router.get("/", getDonorsController);
router.get("/:id", getDonorController);
router.put("/:id", updateDonorController);
router.patch("/:id/availability", updateDonorAvailabilityController);
router.delete("/:id", deleteDonorController);

export default router;
