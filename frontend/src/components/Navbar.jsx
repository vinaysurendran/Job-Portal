import { 
  AppBar, Button, Toolbar, Typography, 
  IconButton, useMediaQuery 
} from '@mui/material';
import { Box } from '@mui/system';
import { Work as WorkIcon, Menu as MenuIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {
  const isMobile = useMediaQuery('(max-width:900px)');
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar 
        position="fixed" 
        sx={{ 
          backdropFilter: 'blur(12px)',
          background: 'rgba(255, 255, 255, 0.92)',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
        }}
      >
        <Toolbar sx={{ 
          justifyContent: 'space-between',
          py: 1,
          px: { xs: 2, md: 4 }
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }}>
              <IconButton
                component={Link}
                to="/"
                size="large"
                edge="start"
                sx={{ 
                  p: 1,
                  '&:hover': { background: 'rgba(25, 118, 210, 0.1)' }
                }}
              >
                <WorkIcon sx={{ 
                  fontSize: '2rem',
                  color: 'primary.main',
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
                }} />
              </IconButton>
            </motion.div>
            
            <Typography 
              variant="h5"
              sx={{ 
                fontWeight: 800,
                background: 'linear-gradient(45deg, #1976d2, #4CAF50)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: { xs: 'none', md: 'block' }
              }}
            >
              CareerConnect
            </Typography>
          </Box>

          {isMobile ? (
            <IconButton size="large" color="inherit">
              <MenuIcon sx={{ color: 'text.primary' }} />
            </IconButton>
          ) : (
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <Button
                component={Link}
                to="/signin"
                sx={{
                  px: 3,
                  fontWeight: 600,
                  textTransform: 'none',
                  color: 'text.primary',
                  background: 'rgba(25, 118, 210, 0.1)',
                  border: '1px solid rgba(25, 118, 210, 0.2)',
                  borderRadius: '50px',
                  '&:hover': {
                    background: 'rgba(25, 118, 210, 0.2)',
                    transform: 'translateY(-2px)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                Sign In
              </Button>
              
              <Button 
                variant="contained"
                component={Link}
                to="/signup"
                sx={{
                  px: 4,
                  py: 1,
                  fontWeight: 700,
                  textTransform: 'none',
                  background: 'linear-gradient(45deg, #1976d2, #4CAF50)',
                  borderRadius: '50px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 8px rgba(0, 0, 0, 0.2)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                Sign Up
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;