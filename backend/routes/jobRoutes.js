const express = require("express");
const Job = require("../models/Job");
const User = require("../models/User");
const router = express.Router();
const { verifyToken, isAdmin } = require("../middleware/auth"); // Add Middleware

// Apply for a Job
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


// Get User's Applied Jobs
router.get("/applied-jobs", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("appliedJobs");
    if (!user) return res.status(404).json({ error: "User Not Found" });

    res.json(user.appliedJobs);
  } catch (error) {
    res.status(500).json({ error: "Error Fetching Applied Jobs" });
  }
});

// Create Job
router.post("/", verifyToken, isAdmin, async (req, res) => {
  try {
    console.log("Job Create Request Body:", req.body); // Debugging

    const { _id, ...jobData } = req.body;
    const job = new Job(jobData);

    await job.save();
    res.status(201).json(job);
  } catch (error) {
    console.error("Error Creating Job:", error);
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
router.put("/:id", verifyToken, isAdmin, async (req, res) => {
  try {
    console.log("Job Update Request Body:", req.body); // Debugging
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!job) {
      return res.status(404).json({ error: "Job Not Found" });
    }

    res.json(job);
    console.log("Job Updated:", job);
  } catch (error) {
    console.error("Error Updating Job:", error);
    res.status(500).json({ error: "Error Updating Job" });
  }
});


// Delete Job
router.delete("/:id", verifyToken, isAdmin, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ error: "Job Not Found" });

    await job.deleteOne();
    console.log("Job Deleted:", job);
    res.json({ message: "Job Deleted" });
  } catch (error) {
    console.error("Error Deleting Job:", error);
    res.status(500).json({ error: "Error Deleting Job" });
  }
});


// Get All User Applications (Admin Only)
router.get("/applications", verifyToken, isAdmin, async (req, res) => {
  try {
    const users = await User.find({ appliedJobs: { $exists: true, $not: { $size: 0 } } })
      .populate("appliedJobs", "title company location") // Get job details
      .select("name email appliedJobs"); // Only return necessary fields

    res.json(users);
  } catch (error) {
    console.error("Error Fetching Applications:", error);
    res.status(500).json({ error: "Error Fetching Applications" });
  }
});


module.exports = router;
