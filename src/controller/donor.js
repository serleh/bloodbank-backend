import {
  CreateDonor,
  getDonors,
  getDonorById,
  updateDonor,
  updateDonorAvailability,
  deleteDonor,
} from "../services/donor.js";
import { error } from "../utils/logger.js";

export const createDonorController = async (req, res, next) => {
  try {
    const donorData = req.body;
    const savedDonor = await CreateDonor(donorData);

    res.status(201).json(savedDonor);
  } catch (error) {
    next(error);
  }
};

export const getDonorsController = async (req, res) => {
  try {
    const donors = await getDonors();
    res.json(donors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDonorController = async (req, res, next) => {
  try {
    const donor = await getDonorById(req.params.id);
    if (!donor) return res.status(404).json({ message: "Donor not found" });
    res.json(donor);
  } catch (error) {
    next(error);
  }
};

export const updateDonorController = async (req, res, next) => {
  try {
    const updatedDonor = await updateDonor(req.params.id, req.body);

    if (!updateDonor) {
      return res.status(404).json({ message: "Donor not found" });
    }
    res.json(updatedDonor);
  } catch (error) {
    next(error);
  }
};

export const updateDonorAvailabilityController = async (req, res, next) => {
  try {
    const availabilty = req.body;
    const updatedDonor = await updateDonorAvailability(
      req.params.id,
      availabilty
    );

    if (!updateDonor) {
      return res.status(404).json({ message: "Donor not found" });
    }
    res.json(updateDonor);
  } catch (error) {
    next(error);
  }
};

export const deleteDonorController = async (req, res, next) => {
  try {
    await deleteDonor(req.params.id);
    res.json({ message: "Donor deleted" });
  } catch (error) {
    next(error);
  }
};
