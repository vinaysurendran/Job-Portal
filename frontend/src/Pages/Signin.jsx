import { Box, Button, TextField, Typography, Paper, Container, FormControlLabel, Radio, RadioGroup, FormControl, FormLabel } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const res = await API.post("/auth/login",{email, password,role});
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      res.data.role === "admin" ? navigate("/admin/dashboard") : navigate("/user/dashboard");
    } catch (err) {
      alert(err.response?.data?.error || "Login Failed");
    }
  };

  return (
    <>
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 8, borderRadius: 2 }}>
        <Typography variant="h4" align="center" sx={{ mb: 4, fontWeight: 'bold', color: 'primary.main' }}>
          Welcome Back
        </Typography>
        <form onSubmit={handleSubmit}>
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
          <FormControl component="fieldset" sx={{ mb: 3 }}>
            <FormLabel component="legend">Login as</FormLabel>
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
            Login
          </Button>
        </form>
        <Typography variant="body2" align="center" sx={{ mt: 3, color: 'text.secondary' }}>
          Don't have an account? <a href="/signup" style={{ color: '#1976d2', textDecoration: 'none' }}>Sign up</a>
        </Typography>
      </Paper>
    </Container>
    </>
  );
};

export default Signin;