import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  TextField,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import API from "../../api";

const AdminDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    requirements: "",
    location: "",
    salary: "",
    jobType: "Full-time",
  });
  const [editJob, setEditJob] = useState(null); // Stores job being edited
  const [openEditModal, setOpenEditModal] = useState(false); // Edit modal state

  // Fetch Jobs
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await API.get("/jobs");
        setJobs(res.data);
      } catch (err) {
        console.error("Error fetching jobs:", err);
      }
    };
    fetchJobs();
  }, []);

  // Handle Input Change for New & Edit Form
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Job Type Change
  const handleJobTypeChange = (e) => {
    setFormData({ ...formData, jobType: e.target.value });
  };

  // Create Job
  const handleCreateJob = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await API.post("/jobs", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJobs([...jobs, res.data]); // Update UI
      setFormData({ title: "", description: "", requirements: "", location: "", salary: "", jobType: "Full-time" });
    } catch (err) {
      console.error("Error creating job:", err);
    }
  };

  // Open Edit Modal
  const handleEditClick = (job) => {
    setEditJob(job);
    setFormData(job);
    setOpenEditModal(true);
  };

  // Save Edited Job
  const handleSaveEdit = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await API.put(`/jobs/${editJob._id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Update UI
      setJobs(jobs.map((job) => (job._id === editJob._id ? res.data : job)));
      setOpenEditModal(false);
    } catch (err) {
      console.error("Error updating job:", err);
    }
  };

  // Delete Job
  const handleDeleteJob = async (jobId) => {
    try {
      const token = localStorage.getItem("token");
      await API.delete(`/jobs/${jobId}`, { headers: { Authorization: `Bearer ${token}` } });
      setJobs(jobs.filter((job) => job._id !== jobId));
    } catch (err) {
      console.error("Error deleting job:", err);
    }
  };

  return (
    <Container>
      <Typography variant="h4" align="center" sx={{ mt: 4 }}>Admin Dashboard</Typography>

      {/* Job Creation Form */}
      <Box component="form" onSubmit={handleCreateJob} sx={{ mt: 4, mb: 4 }}>
        <TextField fullWidth name="title" label="Job Title" value={formData.title} onChange={handleChange} required sx={{ mb: 2 }} />
        <TextField fullWidth name="description" label="Description" value={formData.description} onChange={handleChange} required sx={{ mb: 2 }} />
        <TextField fullWidth name="requirements" label="Requirements" value={formData.requirements} onChange={handleChange} required sx={{ mb: 2 }} />
        <TextField fullWidth name="location" label="Location" value={formData.location} onChange={handleChange} required sx={{ mb: 2 }} />
        <TextField fullWidth name="salary" label="Salary" value={formData.salary} onChange={handleChange} required sx={{ mb: 2 }} />

        {/* Job Type Dropdown */}
        <Select fullWidth name="jobType" value={formData.jobType} onChange={handleJobTypeChange} required sx={{ mb: 2 }}>
          <MenuItem value="Full-time">Full-time</MenuItem>
          <MenuItem value="Part-time">Part-time</MenuItem>
          <MenuItem value="Internship">Internship</MenuItem>
        </Select>

        <Button type="submit" variant="contained" fullWidth>Add Job</Button>
      </Box>

      {/* Job List */}
      <Grid container spacing={3}>
        {jobs.map((job) => (
          <Grid item xs={12} md={6} key={job._id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{job.title}</Typography>
                <Typography color="text.secondary">{job.location} - ${job.salary}</Typography>
                <Typography variant="body2">{job.description}</Typography>
                <Typography variant="body2" color="primary">{job.jobType}</Typography>
              </CardContent>
              <CardActions>
                <Button color="primary" onClick={() => handleEditClick(job)}>Edit</Button>
                <Button color="error" onClick={() => handleDeleteJob(job._id)}>Delete</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Edit Job Modal */}
      <Dialog open={openEditModal} onClose={() => setOpenEditModal(false)}>
        <DialogTitle>Edit Job</DialogTitle>
        <DialogContent>
          <TextField fullWidth name="title" label="Job Title" value={formData.title} onChange={handleChange} required sx={{ mb: 2 }} />
          <TextField fullWidth name="description" label="Description" value={formData.description} onChange={handleChange} required sx={{ mb: 2 }} />
          <TextField fullWidth name="requirements" label="Requirements" value={formData.requirements} onChange={handleChange} required sx={{ mb: 2 }} />
          <TextField fullWidth name="location" label="Location" value={formData.location} onChange={handleChange} required sx={{ mb: 2 }} />
          <TextField fullWidth name="salary" label="Salary" value={formData.salary} onChange={handleChange} required sx={{ mb: 2 }} />

          {/* Job Type Dropdown */}
          <Select fullWidth name="jobType" value={formData.jobType} onChange={handleJobTypeChange} required sx={{ mb: 2 }}>
            <MenuItem value="Full-time">Full-time</MenuItem>
            <MenuItem value="Part-time">Part-time</MenuItem>
            <MenuItem value="Internship">Internship</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditModal(false)}>Cancel</Button>
          <Button onClick={handleSaveEdit} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AdminDashboard;
