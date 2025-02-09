import React, { useEffect, useState } from "react";
import { Container, List, ListItem, ListItemText, Typography, Paper } from "@mui/material";
import API from "../../api";

const ViewApplications = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await API.get("/jobs/applications", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setApplications(res.data);
      } catch (err) {
        console.error("Error fetching applications:", err);
      }
    };
    fetchApplications();
  }, []);

  return (
    <Container>
      <Typography variant="h4" align="center" sx={{ mt: 4 }}>
        User Job Applications
      </Typography>
      <Paper sx={{ mt: 3, p: 3 }}>
        {applications.length > 0 ? (
          <List>
            {applications.map((user) =>
              user.appliedJobs.map((job) => (
                <ListItem key={job._id} divider>
                  <ListItemText
                    primary={`${user.name} applied for ${job.title}`}
                    secondary={`Email: ${user.email} | Location: ${job.location}`}
                  />
                </ListItem>
              ))
            )}
          </List>
        ) : (
          <Typography>No applications found.</Typography>
        )}
      </Paper>
    </Container>
  );
};

export default ViewApplications;
