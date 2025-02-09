import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Container,
    Box,
    Grid,
    Card,
    CardContent,
    CardActions,
    Avatar,
    Paper,
    List,
    ListItem,
    ListItemText,
    Divider,
  } from '@mui/material';
  import React from 'react';
  
  const UserDashboard = () => {
    // Mock job listings
    const jobs = [
      {
        id: 1,
        title: 'Frontend Developer',
        company: 'Tech Corp',
        location: 'Remote',
        description: 'We are looking for a skilled Frontend Developer to join our team.',
      },
      {
        id: 2,
        title: 'Backend Developer',
        company: 'Code Masters',
        location: 'New York, NY',
        description: 'Join our team as a Backend Developer and work on cutting-edge projects.',
      },
      {
        id: 3,
        title: 'UI/UX Designer',
        company: 'Design Studio',
        location: 'San Francisco, CA',
        description: 'We are hiring a creative UI/UX Designer to enhance our product experience.',
      },
    ];
  
    // Mock user profile data
    const user = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      avatarUrl: 'https://source.unsplash.com/100x100/?portrait',
    };
  
    return (
      <Box>
        {/* Navbar */}
        <AppBar position="static" sx={{ backgroundColor: 'primary.main' }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Job Portal
            </Typography>
            <Button color="inherit" href="/">
              Logout
            </Button>
          </Toolbar>
        </AppBar>
  
        {/* Dashboard Content */}
        <Container sx={{ py: 4 }}>
          <Grid container spacing={4}>
            {/* Profile Section */}
            <Grid item xs={12} md={4}>
              <Paper elevation={3} sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Avatar
                    alt={user.name}
                    src={user.avatarUrl}
                    sx={{ width: 100, height: 100, mb: 2 }}
                  />
                  <Typography variant="h6" component="h2" sx={{ mb: 1 }}>
                    {user.name}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {user.email}
                  </Typography>
                </Box>
                <Divider sx={{ my: 3 }} />
                <List>
                  <ListItem>
                    <ListItemText primary="Applied Jobs" secondary="3" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Saved Jobs" secondary="2" />
                  </ListItem>
                </List>
              </Paper>
            </Grid>
  
            {/* Job Listings Section */}
            <Grid item xs={12} md={8}>
              <Typography variant="h5" component="h1" sx={{ mb: 3 }}>
                Job Listings
              </Typography>
              <Grid container spacing={3}>
                {jobs.map((job) => (
                  <Grid item xs={12} key={job.id}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" component="h2">
                          {job.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                          {job.company} - {job.location}
                        </Typography>
                        <Typography variant="body1" sx={{ mt: 2 }}>
                          {job.description}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small" color="primary">
                          Apply Now
                        </Button>
                        <Button size="small" color="secondary">
                          Save Job
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
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
        </ Box>
      </Box>
    );
  };
  
  export default UserDashboard;