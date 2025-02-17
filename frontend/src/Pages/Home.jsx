import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { styled, useTheme } from '@mui/material/styles';
import {
  Button, Container, Box, Grid, Typography, Link, Skeleton, Stack, IconButton
} from '@mui/material';
import {
  RocketLaunch, TrendingUp, HealthAndSafety,
  Brush, Engineering, Send, WorkHistory, CheckCircleOutline,
  VerifiedUser, LightbulbOutlined, Facebook as FacebookIcon,
  Twitter as TwitterIcon, LinkedIn as LinkedInIcon
} from '@mui/icons-material';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import API from '../api';

// ------------------------ Styled Components ------------------------
const GradientTypography = styled(Typography)(({ theme }) => ({
  background: 'linear-gradient(45deg, #1976d2, #4CAF50)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
}));

const SectionHeading = styled(GradientTypography)(({ theme }) => ({
  textAlign: 'center',
  fontWeight: 900,
  fontSize: '3rem',
  marginBottom: theme.spacing(8),
}));

const StyledContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(8),
}));

const CardBox = styled(motion.Box)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: 12,
  backgroundColor: theme.palette.background.paper,
  boxShadow: '0 16px 48px rgba(0, 0, 0, 0.06)',
  textAlign: 'center',
  transition: 'transform 0.2s, box-shadow 0.2s',
  '&:hover': {
    boxShadow: '0 32px 64px rgba(0, 0, 0, 0.08)',
  },
}));

const IconBox = styled(Box)(({ theme, color }) => ({
  width: 80,
  height: 80,
  borderRadius: '50%',
  backgroundColor: `${color}1A`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto',
  marginBottom: theme.spacing(3),
  color: color,
}));

// ------------------------ Section Components ------------------------
const HeroSection = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Box id="hero" sx={{
      pt: { xs: 12, md: 16 },
      pb: { xs: 8, md: 12 },
      background: 'radial-gradient(circle at 20% top, rgba(25,118,210,0.08), transparent 50%), radial-gradient(circle at 80% bottom, rgba(76,175,80,0.08), transparent 50%)'
    }}>
      <StyledContainer maxWidth="xl">
        <Grid container spacing={5} alignItems="center">
          <Grid item xs={12} md={6}>
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}>
              <GradientTypography variant="h1" sx={{ fontWeight: 900, mb: 3.5 }}>
                Find Your Dream Career
              </GradientTypography>
              <Typography variant="subtitle1" sx={{ mb: 5, color: 'text.secondary' }}>
                Streamline your job search with our intelligent platform
              </Typography>
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/jobs')}
                sx={{ px: 6, py: 2, fontWeight: 700 }}
              >
                Get Started
              </Button>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={6}>
            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }}>
              <Box
                component="img"
                src="https://img.freepik.com/free-vector/modern-isometric-illustration-job-search-concept_187891-139.jpg"
                alt="Career search"
                sx={{ width: '100%', borderRadius: 4 }}
              />
            </motion.div>
          </Grid>
        </Grid>
      </StyledContainer>
    </Box>
  );
};

const ValuePropositionSection = () => {
  const valueProps = [
    {
      title: 'Smart Matching',
      description: 'AI-powered job recommendations based on your profile',
      icon: <VerifiedUser fontSize="large" />,
      color: '#4CAF50'
    },
    {
      title: 'Easy Applications',
      description: 'One-click apply to thousands of positions',
      icon: <Send fontSize="large" />,
      color: '#2196f3'
    },
  ];

  return (
    <Box id="value-props" sx={{ bgcolor: 'background.paper' }}>
      <StyledContainer maxWidth="lg">
        <SectionHeading>Why Choose Us</SectionHeading>
        <Grid container spacing={4}>
          {valueProps.map((prop) => (
            <Grid item xs={12} md={6} key={prop.title}>
              <CardBox whileHover={{ scale: 1.05 }}>
                <IconBox color={prop.color}>{prop.icon}</IconBox>
                <Typography variant="h6" fontWeight={700}>{prop.title}</Typography>
                <Typography variant="body2" color="text.secondary">{prop.description}</Typography>
              </CardBox>
            </Grid>
          ))}
        </Grid>
      </StyledContainer>
    </Box>
  );
};

const CategoryGrid = ({ categories, loading }) => {
  const navigate = useNavigate();

  return (
    <Box id="categories">
      <StyledContainer maxWidth="lg">
        <SectionHeading>Popular Categories</SectionHeading>
        <Grid container spacing={3}>
          {loading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Skeleton variant="rectangular" height={200} sx={{ borderRadius: 3 }} />
              </Grid>
            ))
          ) : (
            categories.map((category) => (
              <Grid item xs={12} sm={6} md={3} key={category._id}>
                <CardBox whileHover={{ scale: 1.03 }} onClick={() => navigate(`/jobs?category=${category.name}`)}>
                  <IconBox color={category.color}>
                    {category.icon === 'tech' ? <Engineering /> : <WorkHistory />}
                  </IconBox>
                  <Typography variant="h6" fontWeight={700}>{category.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {category.jobCount}+ positions
                  </Typography>
                </CardBox>
              </Grid>
            ))
          )}
        </Grid>
      </StyledContainer>
    </Box>
  );
};

CategoryGrid.propTypes = {
  categories: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

// ------------------------ Main Component ------------------------
const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await API.get("/jobs/categories");
        setCategories(res.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      <motion.div style={{
        scaleX,
        height: '4px',
        background: 'linear-gradient(90deg, #1976d2, #4CAF50)',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999
      }} />

      <HeroSection />
      <ValuePropositionSection />
      <CategoryGrid categories={categories} loading={loading} />
    </Box>
  );
};

export default HomePage;