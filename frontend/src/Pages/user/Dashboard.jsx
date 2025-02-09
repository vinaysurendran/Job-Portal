import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Avatar,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import API from "../../api"; // Import Axios instance
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const [user, setUser] = useState(null); // Store user info
  const [jobs, setJobs] = useState([]); // Store jobs
  const navigate = useNavigate();

  // Fetch User Info from localStorage
  useEffect(() => {
    const fetchUser = async () => {
      const storedUser = JSON.parse(localStorage.getItem("user")); // User info from login
      if (!storedUser) {
        navigate("/signin");
      } else {
        setUser(storedUser);
      }
    };

    fetchUser();
  }, [navigate]);

  // Fetch Jobs from Backend
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await API.get("/jobs"); // Fetch from backend
        setJobs(res.data);
      } catch (err) {
        console.error("Error fetching jobs:", err);
      }
    };

    fetchJobs();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/signin");
  };

  if (!user) return <Typography>Loading...</Typography>;

  return (
    <Box>
      {/* Navbar */}
      <AppBar position="static" sx={{ backgroundColor: "primary.main" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Job Portal
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* Dashboard Content */}
      <Container sx={{ py: 4 }}>
        <Grid container spacing={4}>
          {/* Profile Section */}
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Avatar
                  alt={user.name}
                  src={user.avatarUrl || "https://source.unsplash.com/100x100/?portrait"}
                  sx={{ width: 100, height: 100, mb: 2 }}
                />
                <Typography variant="h6" component="h2" sx={{ mb: 1 }}>
                  {user.name}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {user.email}
                </Typography>
              </Box>
              <Divider sx={{ my: 3 }} />
            </Paper>
          </Grid>

          {/* Job Listings Section */}
          <Grid item xs={12} md={8}>
            <Typography variant="h5" component="h1" sx={{ mb: 3 }}>
              Job Listings
            </Typography>
            <Grid container spacing={3}>
              {jobs.map((job) => (
                <Grid item xs={12} key={job._id}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" component="h2">
                        {job.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        {job.company} - {job.location}
                      </Typography>
                      <Typography variant="body1" sx={{ mt: 2 }}>
                        {job.description}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" color="primary">
                        Apply Now
                      </Button>
                      <Button size="small" color="secondary">
                        Save Job
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>

      {/* Footer */}
      <Box
        sx={{
          backgroundColor: "primary.main",
          color: "white",
          py: 4,
          mt: 8,
          textAlign: "center",
        }}
      >
        <Typography variant="body1">
          &copy; {new Date().getFullYear()} Job Portal. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default UserDashboard;
