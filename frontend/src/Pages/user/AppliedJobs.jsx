import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
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
  Description,
  Search
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import API from "../../api";

const AppliedJobs = () => {
  const navigate = useNavigate();
  const [appliedJobs, setAppliedJobs] = useState([]);

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

export default AppliedJobs;