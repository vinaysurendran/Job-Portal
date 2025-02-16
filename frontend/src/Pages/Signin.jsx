import { 
  Box, Button, TextField, Typography, Paper, Container, 
  FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Divider 
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Google } from "@mui/icons-material";
import { motion } from "framer-motion";
import API from "../api";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");  // ✅ Fixed missing state for role
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { email, password });
      
      // Store user info & token in localStorage
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);

      // Redirect based on role
      res.data.user.role === "admin" ? navigate("/admin/dashboard") : navigate("/user/dashboard");
    } catch (err) {
      alert(err.response?.data?.error || "Login Failed");
      console.error(err);
    }
  };

  return (
    <Box sx={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(45deg, #1976d2 0%, #4CAF50 100%)",
      p: 2
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{
          backdropFilter: "blur(16px)",
          background: "rgba(255, 255, 255, 0.9)",
          borderRadius: 4,
          p: 6,
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
          width: { xs: "100%", sm: 500 },
          border: "1px solid rgba(255, 255, 255, 0.3)"
        }}>
          <Typography variant="h3" sx={{ 
            mb: 4, fontWeight: 800,
            background: "linear-gradient(45deg, #1976d2, #4CAF50)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textAlign: "center"
          }}>
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
                sx: {
                  borderRadius: 3,
                  transition: "0.3s",
                  "&:hover fieldset": { borderColor: "primary.main" }
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
                  transition: "0.3s",
                  "&:hover fieldset": { borderColor: "primary.main" }
                }
              }}
            />

            <Button
              fullWidth
              variant="contained"
              type="submit"
              sx={{
                py: 2,
                borderRadius: 3,
                fontSize: "1rem",
                fontWeight: 700,
                background: "linear-gradient(45deg, #1976d2, #4CAF50)",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 16px rgba(25, 118, 210, 0.3)"
                },
                transition: "all 0.3s ease"
              }}
            >
              Sign In
            </Button>
          </form>

          <Typography variant="body2" align="center" sx={{ mt: 3, color: "text.secondary" }}>
            Don't have an account?{" "}
            <Button 
              component="a" 
              href="/signup" 
              sx={{ 
                textTransform: "none", 
                color: "primary.main",
                fontWeight: 600,
                "&:hover": { textDecoration: "underline" }
              }}
            >
              Create Account
            </Button>
          </Typography>
        </Box>
      </motion.div>
    </Box>
  );
};

export default Signin;
