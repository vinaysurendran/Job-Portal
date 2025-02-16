import {
  Button,
  Container,
  Box,
  Grid,
  Paper,
  Typography as MuiTypography,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';
import React from 'react';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';

const HomePage = () => {
  return (
    <Box>
      <Box
        sx={{
          position: 'relative',
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
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
          }}
        />
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
          {[
            {
              title: 'Explore Opportunities',
              description: 'Browse through a wide range of job listings tailored to your expertise.',
              image: 'https://source.unsplash.com/400x300/?opportunity',
            },
            {
              title: 'Apply Easily',
              description: 'Submit your applications with just a few clicks and track your progress.',
              image: 'https://source.unsplash.com/400x300/?apply',
            },
            {
              title: 'Connect with Employers',
              description: 'Build relationships with top employers and grow your career.',
              image: 'https://source.unsplash.com/400x300/?employer',
            },
          ].map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Card elevation={3} sx={{ textAlign: 'center' }}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={feature.image}
                    alt={feature.title}
                  />
                  <CardContent>
                    <MuiTypography variant="h5" component="h2" sx={{ mb: 2 }}>
                      {feature.title}
                    </MuiTypography>
                    <MuiTypography variant="body1">
                      {feature.description}
                    </MuiTypography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
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