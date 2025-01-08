import React from 'react';
import { AppBar, Toolbar, Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
  return (
    <AppBar position="static" color="default" elevation={0} sx={{ borderBottom: '1px solid #eaeaea' }}>
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          <Typography variant="h6" component={Link} to="/" sx={{ textDecoration: 'none', color: 'inherit' }}>
            UniversityStudy.ca
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button component={Link} to="/programs">Programs</Button>
          <Button component={Link} to="/schools">Schools</Button>
          <Button component={Link} to="/scholarships">Scholarships</Button>
          <Button component={Link} to="/resources">Resources</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
