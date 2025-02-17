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
  Chip,
  CircularProgress
} from "@mui/material";
import { 
  Work as WorkIcon, 
  Logout, 
  BusinessCenter, 
  Description,
  Person,
  Search
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
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

  if (!user) return (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      background: 'linear-gradient(45deg, #fafafa, #e3f2fd)'
    }}>
      <CircularProgress size={60} thickness={4} sx={{ color: 'primary.main' }} />
    </Box>
  );

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
        <Grid container spacing={4}>
          {/* Profile Section */}
          <Grid item xs={12} md={4}>
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}>
              <Paper sx={{ 
                p: 3, 
                borderRadius: 4,
                backdropFilter: 'blur(16px)',
                background: 'rgba(255, 255, 255, 0.8)',
              }}>
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <Avatar 
                    src={user.avatarUrl || "https://source.unsplash.com/200x200/?portrait"} 
                    sx={{ 
                      width: 120, 
                      height: 120, 
                      mb: 2,
                      border: '3px solid',
                      borderColor: 'primary.main',
                      boxShadow: 3
                    }} 
                  />
                  <Typography variant="h5" sx={{ 
                    fontWeight: 700,
                    background: 'linear-gradient(45deg, #1976d2, #4CAF50)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}>
                    {user.name}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                    {user.email}
                  </Typography>
                </Box>

                <List sx={{ mt: 2 }}>
                  <ListItem 
                    button 
                    onClick={() => navigate("/browse-jobs")}
                    sx={{
                      borderRadius: 2,
                      mb: 1,
                      '&:hover': { 
                        backgroundColor: 'rgba(25, 118, 210, 0.05)',
                        transform: 'translateX(5px)'
                      }
                    }}
                  >
                    <BusinessCenter color="primary" sx={{ mr: 2 }} />
                    <ListItemText 
                      primary="Browse Jobs" 
                      primaryTypographyProps={{ fontWeight: 600 }} 
                    />
                  </ListItem>
                  <ListItem 
                    button 
                    onClick={() => navigate("/applied-jobs")}
                    sx={{
                      borderRadius: 2,
                      mb: 1,
                      '&:hover': { 
                        backgroundColor: 'rgba(25, 118, 210, 0.05)',
                        transform: 'translateX(5px)'
                      }
                    }}
                  >
                    <Description color="primary" sx={{ mr: 2 }} />
                    <ListItemText 
                      primary="Applied Jobs" 
                      primaryTypographyProps={{ fontWeight: 600 }} 
                    />
                    <Chip 
                      label={appliedJobs.length} 
                      color="primary" 
                      size="small" 
                    />
                  </ListItem>
                  <ListItem 
                    button 
                    disabled
                    sx={{
                      borderRadius: 2,
                      opacity: 0.7,
                      '&:hover': { backgroundColor: 'transparent' }
                    }}
                  >
                    <Person color="primary" sx={{ mr: 2 }} />
                    <ListItemText 
                      primary="Update Profile" 
                      secondary="Coming Soon"
                      primaryTypographyProps={{ fontWeight: 600 }} 
                    />
                  </ListItem>
                </List>
              </Paper>
            </motion.div>
          </Grid>

          {/* Applied Jobs Section */}
          <Grid item xs={12} md={8}>
            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }}>
              <Paper sx={{ 
                p: 3, 
                borderRadius: 4,
                backdropFilter: 'blur(16px)',
                background: 'rgba(255, 255, 255, 0.8)',
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                  <Description fontSize="large" color="primary" />
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    Applied Positions
                  </Typography>
                </Box>

                <AnimatePresence>
                  {appliedJobs.length > 0 ? (
                    <List>
                      {appliedJobs.map((job, index) => (
                        <motion.div
                          key={job._id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Paper 
                            sx={{ 
                              p: 2, 
                              mb: 2, 
                              borderRadius: 2,
                              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
                              '&:hover': { 
                                transform: 'translateY(-3px)',
                                transition: 'transform 0.3s'
                              }
                            }}
                          >
                            <ListItemText
                              primary={
                                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                  {job.title}
                                </Typography>
                              }
                              secondary={
                                <Box sx={{ mt: 1, display: 'flex', gap: 1.5 }}>
                                  <Chip 
                                    label={job.company} 
                                    size="small" 
                                    color="primary"
                                    variant="outlined"
                                  />
                                  <Chip 
                                    label={job.location} 
                                    size="small"
                                    sx={{ backgroundColor: 'rgba(25, 118, 210, 0.1)' }}
                                  />
                                  <Chip 
                                    label={new Date(job.createdAt).toLocaleDateString()}
                                    size="small"
                                  />
                                </Box>
                              }
                            />
                          </Paper>
                        </motion.div>
                      ))}
                    </List>
                  ) : (
                    <Box sx={{ 
                      display: 'flex', 
                      flexDirection: 'column', 
                      alignItems: 'center', 
                      p: 4,
                      textAlign: 'center'
                    }}>
                      <Search sx={{ fontSize: 60, color: 'text.disabled', mb: 2 }} />
                      <Typography variant="h6" color="text.secondary">
                        No applications yet. Start exploring opportunities!
                      </Typography>
                      <Button 
                        variant="contained" 
                        sx={{ 
                          mt: 2,
                          background: 'linear-gradient(45deg, #1976d2, #4CAF50)',
                          borderRadius: 2,
                          textTransform: 'none'
                        }}
                        onClick={() => navigate("/browse-jobs")}
                      >
                        Browse Jobs
                      </Button>
                    </Box>
                  )}
                </AnimatePresence>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
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

export default UserDashboard;