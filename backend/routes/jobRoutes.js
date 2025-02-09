const express = require("express");
const Job = require("../models/Job");
const User = require("../models/User");
const router = express.Router();
const { verifyToken, isAdmin } = require("../middleware/auth"); // Add Middleware

// ✅ Apply for a Job
router.post("/:id/apply", verifyToken, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ error: "Job Not Found" });

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: "User Not Found" });

    if (user.appliedJobs.includes(job._id)) {
      return res.status(400).json({ error: "You have already applied for this job" });
    }

    user.appliedJobs.push(job._id);
    await user.save();

    res.json({ message: "Application Submitted Successfully", job });
  } catch (error) {
    console.error("Apply Job Error:", error);
    res.status(500).json({ error: "Error Applying for Job" });
  }
});


// ✅ Get User's Applied Jobs
router.get("/applied-jobs", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("appliedJobs");
    if (!user) return res.status(404).json({ error: "User Not Found" });

    res.json(user.appliedJobs);
  } catch (error) {
    res.status(500).json({ error: "Error Fetching Applied Jobs" });
  }
});

// Create Job (Admin Only)
router.post("/", async (req, res) => {
  try {
    const job = new Job(req.body);
    console.log(res.body);
    await job.save();
    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ error: "Error Creating Job" });
  }
});

// Get All Jobs
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find();
    console.log(res.body);
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: "Error Fetching Jobs" });
  }
});

// Update Job
router.put("/:id", verifyToken, isAdmin,async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(job);
    console.log(res.body);
  } catch (error) {
    res.status(500).json({ error: "Error Updating Job" });
  }
});

// Delete Job
router.delete("/:id",verifyToken, isAdmin, async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.json({ message: "Job Deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error Deleting Job" });
  }
});


module.exports = router;
