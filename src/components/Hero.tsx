import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

export const Hero: React.FC = () => {
  return (
    <Box sx={{ 
      bgcolor: '#FFF5E6',
      pt: 8,
      pb: 6,
      borderRadius: '0 0 20px 20px'
    }}>
      <Container maxWidth="lg">
        <Box sx={{ maxWidth: '600px' }}>
          <Typography
            component="h1"
            variant="h2"
            sx={{ 
              mb: 4,
              fontWeight: 'bold',
              color: '#333'
            }}
          >
            Make informed decisions about your{' '}
            <Typography
              component="span"
              variant="h2"
              sx={{ 
                color: '#D32F2F',
                fontWeight: 'bold'
              }}
            >
              post-secondary education.
            </Typography>
          </Typography>
          <Typography variant="h6" color="text.secondary" paragraph>
            Explore comprehensive information on schools, programs, scholarships, and more!
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            component={Link}
            to="/programs"
            sx={{ mt: 4 }}
          >
            Find Your Program
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Hero;
