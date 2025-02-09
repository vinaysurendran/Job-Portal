const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ["user", "admin"], default: "user" },
  appliedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }] // Track Applied Jobs
});

module.exports = mongoose.model("User", UserSchema);
