import { 
  Box, Button, TextField, Typography, Container, 
  FormControl, FormLabel, RadioGroup, FormControlLabel, Radio,
  Divider
} from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Google } from '@mui/icons-material';
import API from '../api';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState("user");
  const navigate = useNavigate()

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    try{
      await API.post("/auth/signup",{name,email,password,role})
      alert("Signup Successfull! Please login.")
      navigate("/signin")
    }
    catch(e){
      alert(e.response?.data?.error || "Signup Failed");
      console.log(e);
    }
  };

  return (
    <Box sx={{
      minHeight: '120vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(45deg, #1976d2 0%, #4CAF50 100%)',
      p: 2
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{
          backdropFilter: 'blur(16px)',
          background: 'rgba(255, 255, 255, 0.9)',
          borderRadius: 4,
          p: 6,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          width: { xs: '100%', sm: 500 },
          border: '1px solid rgba(255, 255, 255, 0.3)'
        }}>
          <Typography variant="h3" sx={{ 
            mb: 4, 
            fontWeight: 800,
            background: 'linear-gradient(45deg, #1976d2, #4CAF50)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textAlign: 'center'
          }}>
            Create Account
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{ mb: 3 }}
              required
              variant="outlined"
              InputProps={{
                sx: {
                  borderRadius: 3,
                  transition: '0.3s',
                  '&:hover fieldset': { borderColor: 'primary.main' },
                }
              }}
            />

            <TextField
              fullWidth
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 3 }}
              required
              type="email"
              variant="outlined"
              InputProps={{
                sx: {
                  borderRadius: 3,
                  transition: '0.3s',
                  '&:hover fieldset': { borderColor: 'primary.main' },
                }
              }}
            />

            <TextField
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ mb: 3 }}
              required
              variant="outlined"
              InputProps={{
                sx: {
                  borderRadius: 3,
                  transition: '0.3s',
                  '&:hover fieldset': { borderColor: 'primary.main' },
                }
              }}
            />

            <TextField
              fullWidth
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              sx={{ mb: 3 }}
              required
              variant="outlined"
              InputProps={{
                sx: {
                  borderRadius: 3,
                  transition: '0.3s',
                  '&:hover fieldset': { borderColor: 'primary.main' },
                }
              }}
            />

            <FormControl component="fieldset" fullWidth sx={{ mb: 3 }}>
              <FormLabel sx={{ mb: 1, fontWeight: 600 }}>Select Role</FormLabel>
              <RadioGroup
                row
                aria-label="role"
                name="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                sx={{
                  '& .MuiButtonBase-root': {
                    padding: '8px 16px',
                    borderRadius: 2,
                    '&.Mui-selected': {
                      background: 'rgba(25, 118, 210, 0.1)'
                    }
                  }
                }}
              >
                <FormControlLabel 
                  value="user" 
                  control={<Radio />} 
                  label="User" 
                  sx={{ mr: 2 }}
                />
                <FormControlLabel 
                  value="admin" 
                  control={<Radio />} 
                  label="Admin" 
                />
              </RadioGroup>
            </FormControl>

            <Button
              fullWidth
              variant="contained"
              type="submit"
              sx={{
                py: 2,
                borderRadius: 3,
                fontSize: '1rem',
                fontWeight: 700,
                background: 'linear-gradient(45deg, #1976d2, #4CAF50)',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 16px rgba(25, 118, 210, 0.3)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              Create Account
            </Button>
          </form>

          <Typography variant="body2" align="center" sx={{ mt: 3, color: 'text.secondary' }}>
            Already have an account?{' '}
            <Button 
              component="a" 
              href="/signin" 
              sx={{ 
                textTransform: 'none', 
                color: 'primary.main',
                fontWeight: 600,
                '&:hover': { textDecoration: 'underline' }
              }}
            >
              Sign In
            </Button>
          </Typography>
        </Box>
      </motion.div>
    </Box>
  );
};

export default Signup;