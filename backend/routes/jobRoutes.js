const express = require("express");
const Job = require("../models/Job");
const router = express.Router();

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
router.put("/:id", async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(job);
    console.log(res.body);
  } catch (error) {
    res.status(500).json({ error: "Error Updating Job" });
  }
});

// Delete Job
router.delete("/:id", async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.json({ message: "Job Deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error Deleting Job" });
  }
});

module.exports = router;
