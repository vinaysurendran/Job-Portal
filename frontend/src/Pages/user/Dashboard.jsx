import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Grid,
  Avatar,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import API from "../../api";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/signin");
    }
  }, [navigate]);

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

  const handleLogout = () => {
    localStorage.clear();
    navigate("/signin");
  };

  if (!user) return <Typography>Loading...</Typography>;

  return (
    <Box>
      {/* Navbar */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Job Portal</Typography>
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ py: 4 }}>
        <Grid container spacing={4}>
          {/* Profile Section */}
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Avatar src={user.avatarUrl || "https://source.unsplash.com/100x100/?portrait"} sx={{ width: 100, height: 100, mb: 2 }} />
                <Typography variant="h6">{user.name}</Typography>
                <Typography variant="body1" color="text.secondary">{user.email}</Typography>
              </Box>
              <Divider sx={{ my: 3 }} />
              <List>
                <ListItem button onClick={() => navigate("/browse-jobs")}>
                  <ListItemText primary="Browse Jobs" />
                </ListItem>
                <ListItem button onClick={() => navigate("/applied-jobs")}>
                  <ListItemText primary="View Applied Jobs" />
                </ListItem>
                <ListItem button>
                  <ListItemText primary="Update Profile (Coming Soon)" />
                </ListItem>
              </List>
            </Paper>
          </Grid>

          {/* Applied Jobs Section */}
          <Grid item xs={12} md={8}>
            <Typography variant="h5" sx={{ mb: 3 }}>Applied Jobs</Typography>
            <List>
              {appliedJobs.map((job) => (
                <ListItem key={job._id}>
                  <ListItemText primary={job.title} secondary={`${job.company} - ${job.location}`} />
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default UserDashboard;
