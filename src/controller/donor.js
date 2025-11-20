import {
  CreateDonor,
  getDonors,
  getDonorById,
  updateDonor,
  updateDonorAvailability,
  deleteDonor,
} from "../services/donor.js";

export const createDonorController = async (req, res) => {
  try {
    const donorData = req.body;
    const savedDonor = await CreateDonor(donorData);

    res.status(201).json(savedDonor);
  } catch (error) {
    res.status(400).json({ message: error.message });
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

export const getDonorController = async (req, res) => {
  try {
    const donor = await getDonorById(req.params.id);
    if (!donor) return res.status(404).json({ message: "Donor not found" });
    res.json(donor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateDonorController = async (req, res) => {
  try {
    const updatedDonor = await updateDonor(req.params.id, req.body);

    if (!updateDonor) {
      return res.status(404).json({ message: "Donor not found" });
    }
    res.json(updatedDonor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateDonorAvailabilityController = async (req, res) => {
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
    res.status(500).json({ message: error.message });
  }
};

export const deleteDonorController = async (req, res) => {
  try {
    await deleteDonor(req.params.id);
    res.json({ message: "Donor deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
