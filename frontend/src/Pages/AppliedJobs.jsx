import React, { useEffect, useState } from "react";
import { Container, List, ListItem, ListItemText, Typography } from "@mui/material";
import API from "../api";

const AppliedJobs = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);

  // Fetch Applied Jobs
  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await API.get("/jobs/applied-jobs", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAppliedJobs(res.data);
      } catch (err) {
        console.error("Error fetching applied jobs:", err);
      }
    };
    fetchAppliedJobs();
  }, []);

  return (
    <Container>
      <Typography variant="h4" align="center" sx={{ mt: 4 }}>Applied Jobs</Typography>
      <List>
        {appliedJobs.length > 0 ? (
          appliedJobs.map((job) => (
            <ListItem key={job._id}>
              <ListItemText primary={job.title} secondary={`${job.company} - ${job.location}`} />
            </ListItem>
          ))
        ) : (
          <Typography>No jobs applied for yet.</Typography>
        )}
      </List>
    </Container>
  );
};

export default AppliedJobs;
