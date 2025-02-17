import React, { useMemo } from 'react';
import { Work as WorkIcon } from '@mui/icons-material';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { 
  Button, 
  Container, 
  Box, 
  Grid,
  Tooltip,
  Typography, 
  AppBar, 
  Toolbar, 
  IconButton,
  Fab, 
  Hidden,
  Chip
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { 
  GitHub, 
  Twitter, 
  Menu
} from '@mui/icons-material';
import { 
  motion, 
  useScroll, 
  useSpring
} from 'framer-motion';
import { useMediaQuery } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#4CAF50',
    },
    background: {
      default: '#fafafa',
    },
  },
  typography: {
    fontFamily: 'Inter, Arial, sans-serif',
    h1: {
      fontWeight: 900,
      lineHeight: 1.2,
    },
    h2: {
      fontWeight: 800,
      lineHeight: 1.3,
    },
  },
});

const GlassButton = styled(Button)(({ theme }) => ({
  backdropFilter: 'blur(12px)',
  background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.2), rgba(33, 150, 243, 0.1))',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  borderRadius: '16px',
  padding: '18px 48px',
  fontWeight: 700,
  color: '#fff',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: '0 12px 32px rgba(25, 118, 210, 0.3)',
    background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.3), rgba(33, 150, 243, 0.2))',
  },
}));

const HomePage = () => {
  const isMobile = useMediaQuery('(max-width:900px)');
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const navigate = useNavigate();

  const processSteps = useMemo(() => [
    { title: 'Create Profile', description: 'Build your professional identity' },
    { title: 'Discover Jobs', description: 'Find your perfect opportunity' },
    { title: 'Apply Smart', description: 'Apply with a Single Click' },
    { title: 'Get Hired', description: 'Start your new career journey' },
  ], []);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ 
        bgcolor: 'background.default', 
        minHeight: '100vh',
        transition: 'background 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
      }}>
        {/* Scroll Progress Bar */}
        <motion.div 
          style={{ 
            scaleX, 
            height: '4px', 
            background: 'linear-gradient(90deg, #1976d2,rgba(51, 197, 56, 0.92))',
            position: 'fixed', 
            top: 0, 
            left: 0, 
            right: 0, 
            zIndex: 9999 
          }} 
        />
        {/* Hero Section */}
        <Box id="hero" sx={{ 
          pt: 18, 
          pb: 12,
          background: 'linear-gradient(135deg,rgb(22, 107, 205) 0%,rgba(12, 186, 70, 0.69) 100%)',
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
          '&:after': {
            content: '""',
            position: 'absolute',
            bottom: -50,
            left: 0,
            right: 0,
            height: '100px',
            background: '#fafafa',
            transform: 'skewY(-3deg)',
            zIndex: 0
          }
        }}>
          <Container maxWidth="xl">
            <Grid container spacing={6} alignItems="center">
              <Grid item xs={12} md={6} sx={{ position: 'relative', zIndex: 1 }}>
                <motion.div 
                  initial={{ opacity: 0, y: 50 }} 
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <Chip 
                    label="🚀 #1 Job Platform of 2025" 
                    color="secondary" 
                    sx={{ 
                      mb: 3, 
                      fontWeight: 700, 
                      backdropFilter: 'blur(10px)',
                      background: 'rgb(132, 231, 52)',
                      fontSize: '1rem',
                      py: 1
                    }}
                  />
                  <Typography variant="h1" sx={{ 
                    fontWeight: 900, 
                    lineHeight: 1.2, 
                    mb: 3,
                    fontSize: { xs: '2.5rem', md: '4rem' },
                    background: 'linear-gradient(45deg,rgb(148, 251, 255),rgb(125, 240, 198))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}>
                    Launch Your Dream Career
                  </Typography>
                  <Typography variant="h5" sx={{ 
                    mb: 5, 
                    fontWeight: 400,
                    color: 'rgba(255, 255, 255, 0.73)'
                  }}>
                    Connect with innovative companies and find opportunities that match your skills and ambitions
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 3, alignItems: 'center', flexWrap: 'wrap' }}>
                    <GlassButton 
                      variant="contained" 
                      size="large"
                      onClick={() => navigate('/signup')}
                      endIcon={<WorkIcon sx={{ fontSize: 28 }} />}
                    >
                      Explore Opportunities
                    </GlassButton>
                  </Box>
                </motion.div>
              </Grid>
              <Grid item xs={12} md={6} sx={{ position: 'relative', zIndex: 1 }}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <Box sx={{
                    position: 'relative',
                    borderRadius: 4,
                    overflow: 'hidden',
                    boxShadow: '0 24px 48px rgba(0, 0, 0, 0.3)',
                    '&:before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'linear-gradient(45deg, rgba(100, 181, 246, 0.2), rgba(77, 208, 225, 0.2))',
                      mixBlendMode: 'soft-light'
                    }
                  }}>
                    <img 
                      src="https://img.freepik.com/free-vector/career-path-concept-illustration_114360-14354.jpg?t=st=1739783270~exp=1739786870~hmac=37b24a76f0d6c0e18de392c3782dbee4f52ca620d4360b9a06db849d52d4d30c&w=996" 
                      alt="Career illustration" 
                      style={{ 
                        width: '100%', 
                        height: 'auto',
                        display: 'block' 
                      }}
                    />
                  </Box>
                </motion.div>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Process Section */}
        <Box id="process" sx={{ py: 10, bgcolor: 'background.paper' }}>
          <Container>
            <Typography variant="h2" sx={{ 
              textAlign: 'center', 
              mb: 8, 
              fontWeight: 900,
              fontSize: { xs: '2.5rem', md: '3rem' }
            }}>
              How It Works
            </Typography>
            <Grid container spacing={4} justifyContent="center">
              {processSteps.map((step, index) => (
                <Grid item xs={12} md ={6} lg={3} key={step.title}>
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Box sx={{
                      p: 4,
                      height: '100%',
                      borderRadius: 4,
                      background: 'linear-gradient(145deg, #ffffff, #f5f5f5)',
                      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
                      transition: 'transform 0.3s, box-shadow 0.3s',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 16px 32px rgba(25, 118, 210, 0.15)'
                      }
                    }}>
                      <Box sx={{
                        width: 72,
                        height: 72,
                        borderRadius: '50%',
                        bgcolor: 'primary.main',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 3,
                        boxShadow: '0 8px 16px rgba(25, 118, 210, 0.2)'
                      }}>
                        <Typography variant="h3" sx={{ 
                          color: 'white', 
                          fontWeight: 700 
                        }}>
                          {index + 1}
                        </Typography>
                      </Box>
                      <Typography variant="h5" sx={{ fontWeight: 600 }}>
                        {step.title}
                      </Typography>
                      <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                        {step.description}
                      </Typography>
                    </Box>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Social Links */}
        <Box sx={{ position: 'fixed', bottom: 20, right: 20, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Tooltip title="GitHub" arrow>
            <Fab sx={{
              background: 'linear-gradient(45deg, #1DA1F2, #0d8ecf)',
              '&:hover': { transform: 'scale(1.1)' }
            }} onClick={() => window.open('https://github.com/vinaysurendran/Job-Portal')}>
              <GitHub />
            </Fab>
          </Tooltip>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default HomePage;