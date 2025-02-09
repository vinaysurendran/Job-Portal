const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
  title: String,
  description: String,
  requirements: String,
  location: String,
  salary: Number,
  jobType: { type: String, enum: ["Full-time", "Part-time", "Internship"] },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Job", JobSchema);
