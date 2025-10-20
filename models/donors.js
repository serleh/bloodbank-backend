const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log("Error", err));

// DONORS SCHEMA

const donorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, minlength: 4 },
    address: { type: String, required: true },
    city: { type: String, required: true },
    sex: { type: String, required: true },
    weight: { type: Number, required: true },
    dob: {
      type: Date,
      required: true,
      validate: function (value) {
        const age = new Date().getFullYear() - value.getFullYear();
        return age >= 18;
      },
      message: "Donor must be at least 18 years old",
    },
    blood_group: {
      type: String,
      required: true,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },
    contact: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    availability: { type: Boolean, default: true },
    last_donated: { type: Date },
  },
  { timestamps: true }
);

donorSchema.set("toJSON", {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id.toString();
    delete returnedObj._id;
    delete returnedObj.__v;
    delete returnedObj.createdAt;
    delete returnedObj.updatedAt;
  },
});

// Donor model

const Donor = mongoose.model("Donor", donorSchema);

module.exports = Donor;
