import {
  Button,
  Container,
  Box,
  Grid,
  Paper,
  Typography as MuiTypography,
} from '@mui/material';
import React from 'react';
import Navbar from '../components/Navbar';

const HomePage = () => {
  return (
    <Box>
      <Box
        sx={{
          backgroundImage: 'url(https://source.unsplash.com/1600x900/?jobs,career)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '400px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          textAlign: 'center',
        }}
      >
        <Container>
          <MuiTypography variant="h3" component="h1" sx={{ fontWeight: 'bold', mb: 2 }}>
            Find Your Dream Job
          </MuiTypography>
          <MuiTypography variant="h6" component="p" sx={{ mb: 3 }}>
            Join thousands of professionals and discover opportunities that match your skills.
          </MuiTypography>
          <Button
            variant="contained"
            color="primary"
            href="/signin"
            sx={{ px: 4, py: 2, fontSize: '1.1rem', textTransform: 'none' }}
          >
            Get Started
          </Button>
        </Container>
      </Box>

      {/* Features Section */}
      <Container sx={{ py: 8 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
              <MuiTypography variant="h5" component="h2" sx={{ mb: 2 }}>
                Explore Opportunities
              </MuiTypography>
              <MuiTypography variant="body1">
                Browse through a wide range of job listings tailored to your expertise.
              </MuiTypography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
              <MuiTypography variant="h5" component="h2" sx={{ mb: 2 }}>
                Apply Easily
              </MuiTypography>
              <MuiTypography variant="body1">
                Submit your applications with just a few clicks and track your progress.
              </MuiTypography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
              <MuiTypography variant="h5" component="h2" sx={{ mb: 2 }}>
                Connect with Employers
              </MuiTypography>
              <MuiTypography variant="body1">
                Build relationships with top employers and grow your career.
              </MuiTypography>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Footer */}
      <Box
        sx={{
          backgroundColor: 'primary.main',
          color: 'white',
          py: 4,
          mt: 8,
          textAlign: 'center',
        }}
      >
        <MuiTypography variant="body1">
          &copy; {new Date().getFullYear()} CareerConnect. All rights reserved.
        </MuiTypography>
      </Box>
    </Box>
  );
};

export default HomePage;