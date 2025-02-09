import { AppBar, Button, Toolbar, Typography, IconButton } from '@mui/material';
import { Box } from '@mui/system';
import WorkIcon from '@mui/icons-material/Work';
import { Link } from 'react-router-dom';

const Navbar = () => {
  // Style constants for a lighter theme
  const navBarColors = {
    primary: '#ffffff', // Light background
    secondary: '#1976d2', // Primary color for buttons
    hover: '#e3f2fd', // Light hover effect
    text: '#000000', // Dark text for contrast
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar 
        position="static" 
        sx={{ 
          backgroundColor: navBarColors.primary,
          boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Toolbar sx={{ py: 1.5 }}>
          {/* Logo and Title */}
          <IconButton
            size="medium"
            edge="start"
            color="inherit"
            aria-label="job-portal-logo"
            component={Link}to="/"
            sx={{ mr: 1 }}
          >
            <WorkIcon sx={{ fontSize: '2rem', color: navBarColors.text }} />
          </IconButton>
          
          <Typography 
            variant="h5"
            component="div"
            sx={{ 
              flexGrow: 1,
              fontWeight: 600,
              letterSpacing: '0.5px',
              color: navBarColors.text,
              fontFamily: 'BlinkMacSystemFont, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
            }}
          >
            CareerConnect
          </Typography>

          {/* Navigation Links */}
          <Button 
            color="primary"
            component={Link}
            to="/signin"
            sx={{
              mx: 1.5,
              fontSize: '1rem',
              fontWeight: 500,
              textTransform: 'none',
              position: 'relative',
              '&:hover': {
                backgroundColor: navBarColors.hover,
                borderRadius: '4px',
              },
            }}
          >
            Sign In
          </Button>
          
          <Button 
            variant="contained"
            component={Link}
            to="/signup"
            sx={{
              ml: 1.5,
              px: 3,
              py: 1,
              fontSize: '1rem',
              fontWeight: 600,
              textTransform: 'none',
              backgroundColor: navBarColors.secondary,
              borderRadius: '8px',
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: '#1565c0', // Darker shade on hover
                transform: 'translateY(-1px)',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
              },
            }}
          >
            Get Started
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;