import React, { useState, useMemo } from 'react';
import { Work as WorkIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
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
  Avatar, 
  Chip, 
  Fab, 
  Fade, 
  Snackbar, 
  Alert, 
  Dialog, 
  DialogTitle, 
  DialogContent,
  TextField, 
  useMediaQuery, 
  Divider, 
  useScrollTrigger, 
  Slide,
  InputAdornment
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { 
  LinkedIn, 
  GitHub, 
  Twitter, 
  Close, 
  Menu, 
  Email, 
  Lock, 
  Google 
} from '@mui/icons-material';
import { 
  motion, 
  useScroll, 
  useSpring, 
  AnimatePresence 
} from 'framer-motion';


const GlassButton = styled(Button)(({ theme }) => ({
  backdropFilter: 'blur(12px)',
  background: 'rgba(25, 118, 210, 0.1)',
  border: '1px solid rgba(25, 118, 210, 0.2)',
  borderRadius: '50px',
  padding: '16px 40px',
  fontWeight: 700,
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: '0 8px 24px rgba(25, 118, 210, 0.2)',
  },
}));

const HomePage = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width:900px)');
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const navigate = useNavigate();

  const categories = useMemo(() => [
    { name: 'Tech', icon: '💻', jobs: 3200 },
    { name: 'Finance', icon: '💰', jobs: 1500 },
    { name: 'Healthcare', icon: '🏥', jobs: 2750 },
    { name: 'Engineering', icon: '⚙️', jobs: 4200 },
    { name: 'Design', icon: '🎨', jobs: 1800 },
    { name: 'Marketing', icon: '📈', jobs: 2100 },
  ], []);

  const processSteps = [
    { title: 'Create Profile', description: 'Build your professional identity' },
    { title: 'Discover Jobs', description: 'Find your perfect opportunity' },
    { title: 'Apply Smart', description: 'Use AI-powered applications' },
    { title: 'Get Hired', description: 'Start your new career journey' },
  ];

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const yOffset = -80;
      const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    setShowAuthModal(null);
    setOpenSnackbar(true);
  };

  return (
    <Box sx={{ 
      bgcolor: '#fafafa', 
      minHeight: '100vh',
      transition: 'background 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
    }}>
      {/* Animated Scroll Progress */}
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

{/* Hero Section */}
<Box id="hero" sx={{ pt: 18, pb: 12 }}>
  <Container maxWidth="xl">
    <Grid container spacing={6} alignItems="center">
      <Grid item xs={12} md={6}>
        <motion.div 
          initial={{ opacity: 0, x: -50 }} 
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Chip 
            label="🚀 #1 Job Platform of 2025" 
            color="secondary" 
            sx={{ mb: 3, fontWeight: 700, backdropFilter: 'blur(10px)' }}
          />
          <Typography variant="h1" sx={{ 
            fontWeight: 900, 
            lineHeight: 1.2, 
            mb: 3,
            background: 'linear-gradient(45deg, #1976d2, #4CAF50)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Transform Your Career Journey
          </Typography>
          <Box sx={{ display: 'flex', gap: 3, alignItems: 'center', flexWrap: 'wrap' }}>
            <GlassButton 
              variant="outlined" 
              size="large"
              onClick={() => scrollToSection('process')}
            >
              Explore Jobs
            </GlassButton>
          </Box>
        </motion.div>
      </Grid>

      {/* Image Section */}
      <Grid item xs={12} md={6}>
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Box
            component="img"
            src="https://cdn-icons-png.flaticon.com/512/6214/6214076.png"
            alt="Frontend developer illustration"
            sx={{
              width: '100%',
              height: 'auto',
              maxWidth: 600,
              borderRadius: 4,
              boxShadow: '0 24px 48px rgba(0, 0, 0, 0.1)',
              transform: 'perspective(1000px) rotateY(-10deg)',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'perspective(1000px) rotateY(-5deg)'
              }
            }}
          />
        </motion.div>
      </Grid>
    </Grid>
  </Container>
</Box>
      {/* Categories Grid */}
      <Box id="categories" sx={{ py: 10, bgcolor: 'background.paper' }}>
        <Container>
          <Typography variant="h2" sx={{ textAlign: 'center', mb: 8, fontWeight: 900 }}>
            Explore Opportunities
          </Typography>
          <Grid container spacing={4} sx={{ overflowX: 'auto', pb: 2 }}>
            {categories.map((category, i) => (
              <Grid item xs={12} sm={6} md={4} lg ={3} key={category.name}>
                <motion.div 
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Box sx={{ 
                    p: 4, 
                    borderRadius: '24px', 
                    bgcolor: 'background.default',
                    boxShadow: 3,
                    textAlign: 'center',
                    cursor: 'pointer',
                    position: 'relative',
                    overflow: 'hidden',
                  }}>
                    <Typography variant="h3" sx={{ mb: 2 }}>
                      {category.icon}
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>
                      {category.name}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1, opacity: 0.8 }}>
                      {category.jobs.toLocaleString()}+ Open Roles
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Process Section */}
      <Box id="process" sx={{ py: 10 }}>
        <Container>
          <Typography variant="h2" sx={{ textAlign: 'center', mb: 8, fontWeight: 900 }}>
            Our Process
          </Typography>
          <Grid container spacing={8}>
            {processSteps.map((step, index) => (
              <Grid item xs={12} md={3} key={step.title}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                  transition={{ delay: index * 0.2 }}
                >
                  <Box sx={{
                    p: 4,
                    textAlign: 'center',
                    position: 'relative',
                  }}>
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>
                      {step.title}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      {step.description}
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Auth Modal */}
      <Dialog open={Boolean(showAuthModal)} onClose={() => setShowAuthModal(null)}>
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            {showAuthModal === 'signin' ? 'Sign In' : 'Create Account'}
            <IconButton onClick={() => setShowAuthModal(null)}>
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleAuthSubmit}>
            <TextField 
              label="Email" 
              type="email" 
              fullWidth 
              required 
              sx={{ mb: 2 }} 
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                ),
              }}
            />
            <TextField 
              label="Password" 
              type="password" 
              fullWidth 
              required 
              sx={{ mb: 2 }} 
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
              }}
            />
            <Button 
              fullWidth 
              variant="contained" 
              type="submit" 
              sx={{ mt: 2, borderRadius: '50px', py: 1.5 }}
            >
              Continue
            </Button>
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Typography variant="body2">or</Typography>
              <Button 
                variant="outlined" 
                startIcon={<Google />} 
                fullWidth 
                sx={{ mt: 1 }}
              >
                Sign in with Google
              </Button>
            </Box>
          </form>
        </DialogContent>
      </Dialog>

      {/* Social Links */}
      <Fade in timeout={1000}>
        <Box sx={{ position: 'fixed', right: 32, bottom: 32, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Tooltip title="LinkedIn" arrow>
            <Fab color="primary" onClick={() => window.open('https://linkedin.com', '_blank')}>
              <LinkedIn />
            </Fab>
          </Tooltip>
          <Tooltip title="GitHub" arrow>
            <Fab color="primary" onClick={() => window.open('https:// github.com', '_blank')}>
              <GitHub />
            </Fab>
          </Tooltip>
          <Tooltip title="Twitter" arrow>
            <Fab color="primary" onClick={() => window.open('https://twitter.com', '_blank')}>
              <Twitter />
            </Fab>
          </Tooltip>
        </Box>
      </Fade>

      {/* Notifications */}
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
        <Alert severity="success">
          Action completed successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default HomePage;