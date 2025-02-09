import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Grid,
  Paper,
  Card,
  CardContent,
  CardActions,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';

const AdminDashboard = () => {
  // Mock data for users and job postings
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Alice Johnson', email: 'alice@example.com' },
  ];

  const jobPostings = [
    { id: 1, title: 'Frontend Developer', company: 'Tech Corp' },
    { id: 2, title: 'Backend Developer', company: 'Code Masters' },
    { id: 3, title: 'UI/UX Designer', company: 'Design Studio' },
  ];

  return (
    <Box>
      {/* Navbar */}
      <AppBar position="static" sx={{ backgroundColor: 'primary.main' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Admin Dashboard
          </Typography>
          <Button color="inherit" href="/logout">
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* Dashboard Content */}
      <Container sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 4 }}>
          Welcome, Admin
        </Typography>

        <Grid container spacing={4}>
          {/* User Management Section */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
                User Management
              </Typography>
              <List>
                {users.map((user) => (
                  <ListItem key={user.id}>
                    <ListItemText primary={user.name} secondary={user.email} />
                  </ListItem>
                ))}
              </List>
              <CardActions>
                <Button size="small" color="primary">
                  Add User
                </Button>
              </CardActions>
            </Paper>
          </Grid>

          {/* Job Postings Section */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
                Job Postings
              </Typography>
              {jobPostings.map((job) => (
                <Card key={job.id} sx={{ mb: 2 }}>
                  <CardContent>
                    <Typography variant="h6" component="h3">
                      {job.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {job.company}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary">
                      Edit
                    </Button>
                    <Button size="small" color="secondary">
                      Delete
                    </Button>
                  </CardActions>
                </Card>
              ))}
              <CardActions>
                <Button size="small" color="primary">
                  Add Job Posting
                </Button>
              </CardActions>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Footer */}
      <Box
        sx={{
          backgroundColor: 'primary.main',
          color: 'white',
          py: 4,
          mt: 8,
          textAlign: 'center',
        }}
      >
        <Typography variant="body1">
          &copy; {new Date().getFullYear()} Job Portal. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default AdminDashboard;