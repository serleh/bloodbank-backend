import Donor from "../models/donor.js";

// Create a donor
export const CreateDonor = async (data) => {
  const donor = new Donor(data);
  return await donor.save();
};

// Get All Donors
export const getDonors = async () => {
  return await Donor.find();
};

// SEARCH DONOR BY CITY,BLOOD_GROUP,AVAILABILITY AND NAME
export const SearchDonors = async (query) => {
  const { city, blood_group, availability, name } = query;

  const filter = {};

  if (city) filter.city = { $regex: city, $options: "i" };
  if (blood_group) filter.blood_group = { $regex: blood_group, $options: "i" };
  if (availability) filter.availability = availability === "true";
  if (name) filter.name = { $regex, $options: "i" };

  return await Donor.find(filter);
};

// GET DONOR BY ID
export const getDonorById = async (id) => {
  return await Donor.findById(id);
};

// DELETE A DONOR
export const deleteDonor = async (id) => {
  return await Donor.findByIdAndDelete(id);
};

// UPDATE A DONOR

export const updateDonor = async (id, data) => {
  return await Donor.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

// UPDATE DONOR AVAILABILITY
export const updateDonorAvailability = async (id, availability) => {
  return await Donor.findByIdAndUpdate(
    id,
    { availability },
    { new: true, runValidators: true }
  );
};
