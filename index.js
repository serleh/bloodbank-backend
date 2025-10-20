require("dotenv").config();
const express = require("express");
const Donor = require("./models/donors");

const app = express();

const requestLogger = (req, res, next) => {
  console.log("Method: ", req.method);
  console.log("Path: ", req.path);
  console.log("Body: ", req.body);
  console.log("---");

  next();
};

const ErrorHandler = (error, req, res, next) => {
  console.log(error.message);

  if (error.name == "CastError") {
    return res.status(400).send({ error: "Malformatted id" });
  } else if (error.name === "ValidationError") {
    return res.status(400).send({ error: error.message });
  } else if (error.code === 11000) {
    const field = Object.keys(error.keyValue);
    return res.status(409).json({
      error: `Duplicate value for field: ${field}. Please use another value.`,
    });
  }
  next();
};

app.use(express.json());
app.use(requestLogger);

// TESTING
app.get("/api/", (req, res) => {
  res.send("TESTTING TESTING");
});

// Add A DONOR

app.post("/api/donors", (req, res, next) => {
  const body = req.body;

  const requiredFields = [
    "name",
    "address",
    "city",
    "sex",
    "weight",
    "dob",
    "blood_group",
    "contact",
    "email",
  ];
  const missingFields = requiredFields.filter((field) => !body[field]);
  if (missingFields.length > 0) {
    return res
      .status(400)
      .json({ error: `Missing required fields: ${missingFields.join(", ")}` });
  }

  const donor = new Donor({
    name: body.name,
    address: body.address,
    city: body.city,
    weight: body.weight,
    dob: body.dob,
    blood_group: body.blood_group,
    contact: body.contact,
    availability: body.availability,
    email: body.email,
    last_donated: body.last_donated,
    sex: body.sex,
  });
  donor
    .save()
    .then((savedDonor) => {
      res.json(savedDonor);
    })
    .catch((error) => next(error));
});

// GET ALL DONORS
app.get("/api/donors", (req, res) => {
  Donor.find({}).then((donors) => {
    res.json(donors);
  });
});

// SEARCH DONOR BY CITY,BLOOD_GROUP,AVAILABILITY AND NAME

app.get("/api/donors/search", (req, res) => {
  const { city, blood_group, availability, name } = req.query;

  const filter = {};

  if (city) filter.city = { $regex: city, $options: "i" };
  if (blood_group) filter.blood_group = { $regex: Blob, $options: "i" };
  if (availability) filter.availability = availability === "true";
  if (name) filter.name = { $regex: name, $options: "i" };

  const donors = Donor.find(filter).then((results) => {
    if (results.length === 0) {
      return res.status(404).json({
        message:
          "SORRY! DONORS ARE NOT AVAILABLE WITH THE FOLLOWING BLOOD GROUP OR AREA",
      });
    }
    res.json(results);
  });
});

// GET DONOR BY ID

app.get("/api/donors/:id", (req, res) => {
  const id = req.params.id;

  Donor.findById(id).then((donor) => {
    if (donor) {
      return res.json(donor);
    } else {
      return res.status(404).end();
    }
  });
});

// DELETE A DONOR

app.delete("/api/donors/:id", (req, res) => {
  const id = req.params.id;
  Donor.findByIdAndDelete(id).then(() => {
    res.status(204).end();
  });
});

// UPDATE A DONOR
app.put("/api/donors/:id", (req, res, next) => {
  const { id } = req.params;
  const {
    name,
    address,
    city,
    sex,
    weight,
    dob,
    blood_group,
    contact,
    email,
    availability,
  } = req.body;
  Donor.findById(id)
    .then((donor) => {
      if (!donor) {
        return res.status(404).end();
      }
      donor.name = name;
      donor.address = address;
      donor.city = city;
      donor.sex = sex;
      donor.weight = weight;
      donor.dob = dob;
      donor.blood_group = blood_group;
      donor.contact = contact;
      donor.email = email;
      donor.availability = availability;

      return donor.save().then((updatedDonor) => {
        res.json(updatedDonor);
      });
    })
    .catch((error) => next(error));
});

// UPDATE DONOR AVAILABILITY
app.patch("/api/donors/:id/availability", (req, res) => {
  const { id } = req.params;
  const { availability } = req.body;
  Donor.findByIdAndUpdate(id, { availability }, { new: true })
    .then((updatedDonor) => {
      if (!updatedDonor) {
        return res.status(404).json({ message: "Donor not found" });
      }
      res.json(updatedDonor);
    })
    .catch((error) => next(error));
});

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);
app.use(ErrorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App listening on ${PORT} go and catch it 🚀`);
});
