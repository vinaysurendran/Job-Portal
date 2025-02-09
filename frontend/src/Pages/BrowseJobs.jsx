import React, { useEffect, useState } from "react";
import { Container, Grid, Card, CardContent, CardActions, Button, Typography, TextField, Select, MenuItem } from "@mui/material";
import API from "../api";

const BrowseJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({ jobType: "", location: "" });

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

  // Handle Apply for Job
  const applyForJob = async (jobId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You need to login first!");
        return;
      }
  
      const res = await API.post(`/jobs/${jobId}/apply`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      alert(res.data.message); // Success message
    } catch (err) {
      console.error("Apply Job Error:", err.response?.data || err.message);
      alert(err.response?.data?.error || "Failed to Apply for Job");
    }
  };

  // Filter Jobs
  const filteredJobs = jobs.filter(
    (job) =>
      (filters.jobType ? job.jobType === filters.jobType : true) &&
      (filters.location ? job.location.toLowerCase().includes(filters.location.toLowerCase()) : true)
  );

  return (
    <Container>
      <Typography variant="h4" align="center" sx={{ mt: 4 }}>Browse Jobs</Typography>

      {/* Filter Section */}
      <Grid container spacing={2} sx={{ my: 2 }}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Location"
            value={filters.location}
            onChange={(e) => setFilters({ ...filters, location: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Select
            fullWidth
            value={filters.jobType}
            onChange={(e) => setFilters({ ...filters, jobType: e.target.value })}
            displayEmpty
          >
            <MenuItem value="">All Job Types</MenuItem>
            <MenuItem value="Full-time">Full-time</MenuItem>
            <MenuItem value="Part-time">Part-time</MenuItem>
            <MenuItem value="Internship">Internship</MenuItem>
          </Select>
        </Grid>
      </Grid>

      {/* Job Listings */}
      <Grid container spacing={3}>
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <Grid item xs={12} md={6} key={job._id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{job.title}</Typography>
                  <Typography color="text.secondary">{job.location} - ${job.salary}</Typography>
                  <Typography variant="body2">{job.description}</Typography>
                  <Typography variant="body2" color="primary">{job.jobType}</Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary" onClick={() => applyForJob(job._id)}>
                    Apply Now
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography>No jobs found</Typography>
        )}
      </Grid>
    </Container>
  );
};

export default BrowseJobs;
