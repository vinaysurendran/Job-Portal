import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Grid,
  Paper,
  Card,
  CardContent,
  CardActions,
  TextField,
  Select,
  MenuItem,
  Chip,
  CircularProgress
} from "@mui/material";
import { 
  Work as WorkIcon, 
  Logout, 
  Search as SearchIcon,
  BusinessCenter
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import API from "../api";

const BrowseJobs = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({ jobType: "", location: "" });
  const [loading, setLoading] = useState(true);

  // Fetch Jobs
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await API.get("/jobs");
        setJobs(res.data);
      } catch (err) {
        console.error("Error fetching jobs:", err);
      } finally {
        setLoading(false);
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
  
      alert(res.data.message);
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

  const handleLogout = () => {
    localStorage.clear();
    navigate("/signin");
  };

  return (
    <Box sx={{ bgcolor: '#fafafa', minHeight: '100vh' }}>
      {/* Modern AppBar */}
      <AppBar position="static" sx={{ 
        backdropFilter: 'blur(12px)',
        background: 'rgba(255, 255, 255, 0.92)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
      }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <WorkIcon sx={{ 
              fontSize: '2rem',
              color: 'primary.main',
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
            }} />
            <Typography variant="h5" sx={{ 
              fontWeight: 800,
              background: 'linear-gradient(45deg, #1976d2, #4CAF50)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              CareerConnect
            </Typography>
          </Box>
          <Button
            startIcon={<Logout />}
            onClick={handleLogout}
            sx={{
              fontWeight: 600,
              textTransform: 'none',
              color: 'primary.main',
              '&:hover': { backgroundColor: 'rgba(25, 118, 210, 0.1)' }
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ py: 4 }}>
        <Paper sx={{ 
          p: 3, 
          mb: 4,
          borderRadius: 4,
          backdropFilter: 'blur(16px)',
          background: 'rgba(255, 255, 255, 0.8)',
        }}>
          <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
            Find Your Next Opportunity
          </Typography>
          
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Search Location"
                value={filters.location}
                onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                InputProps={{
                  startAdornment: <SearchIcon color="action" sx={{ mr: 1 }} />
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Select
                fullWidth
                value={filters.jobType}
                onChange={(e) => setFilters({ ...filters, jobType: e.target.value })}
                displayEmpty
                inputProps={{ 'aria-label': 'Select job type' }}
              >
                <MenuItem value="">All Job Types</MenuItem>
                <MenuItem value="Full-time">Full-time</MenuItem>
                <MenuItem value="Part-time">Part-time</MenuItem>
                <MenuItem value="Internship">Internship</MenuItem>
              </Select>
            </Grid>
          </Grid>
        </Paper>

        {/* Job Listings */}
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress size={60} thickness={4} sx={{ color: 'primary.main' }} />
          </Box>
        ) : (
          <Grid container spacing={3}>
            <AnimatePresence>
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job, index) => (
                  <Grid item xs={12} md={6} key={job._id}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card sx={{ 
                        height: '100%',
                        borderRadius: 4,
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
                        '&:hover': { 
                          transform: 'translateY(-5px)',
                          transition: 'transform 0.3s'
                        }
                      }}>
                        <CardContent>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                            <Typography variant="h5" sx={{ fontWeight: 700 }}>
                              {job.title}
                            </Typography>
                            <Chip 
                              label={job.jobType} 
                              color="primary" 
                              variant="outlined"
                            />
                          </Box>
                          
                          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                            <Chip
                              label={job.location}
                              size="small"
                              sx={{ backgroundColor: 'rgba(25, 118, 210, 0.1)' }}
                            />
                            <Chip
                              label={`$${job.salary}`}
                              size="small"
                              color="success"
                              variant="outlined"
                            />
                          </Box>

                          <Typography variant="body1" sx={{ mb: 2 }}>
                            {job.description}
                          </Typography>

                          <Typography variant="body2" color="text.secondary">
                            Posted: {new Date(job.createdAt).toLocaleDateString()}
                          </Typography>
                        </CardContent>
                        <CardActions sx={{ p: 2 }}>
                          <Button
                            fullWidth
                            variant="contained"
                            onClick={() => applyForJob(job._id)}
                            sx={{
                              background: 'linear-gradient(45deg, #1976d2, #4CAF50)',
                              borderRadius: 2,
                              textTransform: 'none',
                              py: 1
                            }}
                          >
                            Apply Now
                          </Button>
                        </CardActions>
                      </Card>
                    </motion.div>
                  </Grid>
                ))
              ) : (
                <Box sx={{ 
                  width: '100%', 
                  textAlign: 'center', 
                  p: 4,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}>
                  <SearchIcon sx={{ fontSize: 80, color: 'text.disabled', mb: 2 }} />
                  <Typography variant="h5" color="text.secondary">
                    No jobs found matching your criteria
                  </Typography>
                </Box>
              )}
            </AnimatePresence>
          </Grid>
        )}
      </Container>

      {/* Footer */}
      <Box
        sx={{
          mt: 8,
          py: 3,
          px: 2,
          backgroundColor: 'background.paper',
          borderTop: '1px solid rgba(0, 0, 0, 0.12)',
          textAlign: 'center'
        }}
      >
        <Typography variant="body2" color="text.secondary">
          &copy; {new Date().getFullYear()} CareerConnect. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default BrowseJobs;