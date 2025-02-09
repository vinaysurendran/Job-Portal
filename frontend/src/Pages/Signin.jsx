import { Box, Button, TextField, Typography, Paper, Container } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { email, password }); // ✅ FIXED: Removed role

      // Store user info & token in localStorage
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role); // Use user.role from backend

      // Redirect based on role
      res.data.user.role === "admin" ? navigate("/admin/dashboard") : navigate("/user/dashboard");
    } catch (err) {
      alert(err.response?.data?.error || "Login Failed");
      console.log(err);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 8, borderRadius: 2 }}>
        <Typography variant="h4" align="center" sx={{ mb: 4, fontWeight: "bold", color: "primary.main" }}>
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
            InputProps={{ style: { borderRadius: 12 } }}
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
            InputProps={{ style: { borderRadius: 12 } }}
          />
          <Button
            fullWidth
            variant="contained"
            type="submit"
            sx={{
              py: 1.5,
              borderRadius: 12,
              textTransform: "none",
              fontSize: "1rem",
              fontWeight: "bold",
              backgroundColor: "primary.main",
              "&:hover": { backgroundColor: "primary.dark" },
            }}
          >
            Login
          </Button>
        </form>
        <Typography variant="body2" align="center" sx={{ mt: 3, color: "text.secondary" }}>
          Don't have an account?{" "}
          <a href="/signup" style={{ color: "#1976d2", textDecoration: "none" }}>
            Sign up
          </a>
        </Typography>
      </Paper>
    </Container>
  );
};

export default Signin;
