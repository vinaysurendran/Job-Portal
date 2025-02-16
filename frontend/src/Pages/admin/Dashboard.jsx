import React, { useEffect, useState } from "react";
import {
  AppBar, Toolbar, Typography, Button, Container, Box, Grid, Card,
  CardContent, CardActions, Paper, List, ListItem, ListItemText,
  Chip, Dialog, DialogTitle, DialogContent, DialogActions, TextField,
  Select, MenuItem
} from '@mui/material';
import { Work as WorkIcon, Logout, Person, BusinessCenter } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import API from "../../api";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    requirements: "",
    location: "",
    salary: "",
    jobType: "Full-time",
  });
  const [editJob, setEditJob] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateJob = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Authentication error! Please log in.");
        return;
      }

      const res = await API.post("/jobs", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setJobs([...jobs, res.data]);
      setFormData({ title: "", description: "", requirements: "", location: "", salary: "", jobType: "Full-time" });
      setOpenCreateModal(false);
      alert("Job Created Successfully!");
    } catch (err) {
      console.error("Error creating job:", err.response?.data || err.message);
      alert(err.response?.data?.error || "Error Creating Job");
    }
  };

  const handleEditClick = (job) => {
    setEditJob(job);
    setFormData(job);
    setOpenEditModal(true);
  };

  const handleSaveEdit = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Authentication error! Please log in.");
        return;
      }

      const res = await API.put(`/jobs/${editJob._id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setJobs(jobs.map((job) => (job._id === editJob._id ? res.data : job)));
      setOpenEditModal(false);
      alert("Job Updated Successfully!");
    } catch (err) {
      console.error("Error updating job:", err.response?.data || err.message);
      alert(err.response?.data?.error || "Error Updating Job");
    }
  };

  const handleDeleteJob = async (jobId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Authentication error! Please log in.");
        return;
      }

      await API.delete(`/jobs/${jobId}`, { headers: { Authorization: `Bearer ${token}` } });
      setJobs(jobs.filter((job) => job._id !== jobId));
      alert("Job Deleted Successfully!");
    } catch (err) {
      console.error("Error deleting job:", err.response?.data || err.message);
      alert(err.response?.data?.error || "Error Deleting Job");
    }
  };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <Box sx={{ bgcolor: '#fafafa', minHeight: '100vh' }}>
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
        <Grid container spacing={4}>
          {/* Applications Section */}
          <Grid item xs={12} md={4}>
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}>
              <Paper sx={{ 
                p: 3, 
                borderRadius: 4,
                backdropFilter: 'blur(16px)',
                background: 'rgba(255, 255, 255, 0.8)',
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                  <Person fontSize="large" color="primary" />
                  <Typography variant="h5" sx={{ fontWeight: 700 }}>
                    Applications
                  </Typography>
                </Box>
                <List>
                  <ListItem 
                    button 
                    onClick={() => navigate("/admin/applications")}
                    sx={{ 
                      borderRadius: 2,
                      '&:hover': { backgroundColor: 'rgba(25, 118, 210, 0.05)' }
                    }}
                  >
                    <ListItemText 
                      primary="View All Applications"
                      primaryTypographyProps={{ fontWeight: 600 }}
                    />
                  </ListItem>
                </List>
              </Paper>
            </motion.div>
          </Grid>

          {/* Job Postings Section */}
          <Grid item xs={12} md={8}>
            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }}>
              <Paper sx={{ 
                p: 3, 
                borderRadius: 4,
                backdropFilter: 'blur(16px)',
                background: 'rgba(255, 255, 255, 0.8)',
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                  <BusinessCenter fontSize="large" color="primary" />
                  <Typography variant="h5" sx={{ fontWeight: 700 }}>
                    Job Management
                  </Typography>
                </Box>
                <AnimatePresence>
                  {jobs.map((job, index) => (
                    <motion.div
                      key={job._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card sx={{ 
                        mb: 2, 
                        borderRadius: 2,
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
                        '&:hover': { transform: 'translateY(-3px)' },
                        transition: 'transform 0.3s'
                      }}>
                        <CardContent>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div>
                              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                {job.title}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {job.location} - ${job.salary}
                              </Typography>
                              <Chip
                                label={job.jobType}
                                color="primary"
                                size="small"
                                sx={{ mt: 1 }}
                              />
                            </div>
                          </Box>
                        </CardContent>
                        <CardActions sx={{ px: 2, pb: 2 }}>
                          <Button
                            size="small"
                            variant="contained"
                            sx={{ 
                              textTransform: 'none',
                              background: 'linear-gradient(45deg, #1976d2, #4CAF50)'
                            }}
                            onClick={() => handleEditClick(job)}
                          >
                            Edit
                          </Button>
                          <Button
                            size="small"
                            color="error"
                            variant="outlined"
                            sx={{ textTransform: 'none' }}
                            onClick={() => handleDeleteJob(job._id)}
                          >
                            Delete
                          </Button>
                        </CardActions>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<BusinessCenter />}
                  sx={{ 
                    mt: 2,
                    background: 'linear-gradient(45deg, #1976d2, #4CAF50)',
                    borderRadius: 2,
                    textTransform: 'none'
                  }}
                  onClick={() => setOpenCreateModal(true)}
                >
                  Add New Job
                </Button>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </Container>

      {/* Create Job Dialog */}
      <Dialog open={openCreateModal} onClose={() => setOpenCreateModal(false)}>
        <DialogTitle sx={{ fontWeight: 700 }}>Create New Job</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="normal"
            label="Job Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Requirements"
            name="requirements"
            value={formData.requirements}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Salary"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
          />
          <Select
            fullWidth
            margin="dense"
            name ="jobType"
            value={formData.jobType}
            onChange={handleChange}
          >
            <MenuItem value="Full-time">Full-time</MenuItem>
            <MenuItem value="Part-time">Part-time</MenuItem>
            <MenuItem value="Internship">Internship</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCreateModal(false)}>Cancel</Button>
          <Button onClick={handleCreateJob} color="primary">Create</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Job Dialog */}
      <Dialog open={openEditModal} onClose={() => setOpenEditModal(false)}>
        <DialogTitle sx={{ fontWeight: 700 }}>Edit Job</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="normal"
            label="Job Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Requirements"
            name="requirements"
            value={formData.requirements}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Salary"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
          />
          <Select
            fullWidth
            margin="dense"
            name="jobType"
            value={formData.jobType}
            onChange={handleChange}
          >
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

export default AdminDashboard;