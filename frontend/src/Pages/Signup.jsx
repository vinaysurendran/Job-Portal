import { AlternateEmail } from '@mui/icons-material';
import { Box, Button, TextField, Typography, Paper, Container, FormControl, InputLabel, MenuItem, Select, RadioGroup, FormControlLabel, Radio, FormLabel } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from "../api";

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState("user");
  const navigate = useNavigate()

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Add your signup logic here
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
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 8, borderRadius: 2 }}>
        <Typography variant="h4" align="center" sx={{ mb: 4, fontWeight: 'bold', color: 'primary.main' }}>
          Create Your Account
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
              style: { borderRadius: 12 },
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
              style: { borderRadius: 12 },
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
              style: { borderRadius: 12 },
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
              style: { borderRadius: 12 },
            }}
          />
          <FormControl component="fieldset" sx={{ mb: 3 }}>
            <FormLabel component="legend">Select Role</FormLabel>
            <RadioGroup
              row
              aria-label="role"
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <FormControlLabel value="user" control={<Radio />} label="User" />
              <FormControlLabel value="admin" control={<Radio />} label="Admin" />
            </RadioGroup>
          </FormControl>
          <Button
            fullWidth
            variant="contained"
            type="submit"
            sx={{
              py: 1.5,
              borderRadius: 12,
              textTransform: 'none',
              fontSize: '1rem',
              fontWeight: 'bold',
              backgroundColor: 'primary.main',
              '&:hover': {
                backgroundColor: 'primary.dark',
              },
            }}
          >
            Sign Up
          </Button>
        </form>
        <Typography variant="body2" align="center" sx={{ mt: 3, color: 'text.secondary' }}>
          Already have an account? <a href="/signin" style={{ color: '#1976d2', textDecoration: 'none' }}>Sign in</a>
        </Typography>
      </Paper>
    </Container>
  );
};

export default Signup;