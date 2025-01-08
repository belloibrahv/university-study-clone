import React from 'react';
import styled from 'styled-components';
import { Box, Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const HeroSection = styled(Box)`
  background: linear-gradient(90deg, #fff5e6 0%, #ffecd2 100%);
  padding: 64px 0;
  border-radius: 0 0 20px 20px;
`;

const HeroContent = styled(Box)`
  max-width: 600px;
  text-align: left;
`;

const HighlightText = styled(Typography)`
  font-size: 3rem;
  font-weight: bold;
  color: #d32f2f;
  display: inline;
`;

const HeroButton = styled(Button)`
  margin-top: 24px;
  padding: 12px 24px;
  font-weight: bold;
  border-radius: 8px;
  text-transform: none;
`;

export const Hero: React.FC = () => {
  return (
    <HeroSection>
      <Container maxWidth="lg">
        <HeroContent>
          <Typography
            component="h1"
            variant="h2"
            sx={{
              mb: 4,
              fontWeight: 'bold',
              color: '#333',
              fontSize: '2.75rem',
              lineHeight: '1.2',
            }}
          >
            Make informed decisions about your{' '}
            <HighlightText component="span">post-secondary education.</HighlightText>
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{
              mb: 3,
              fontSize: '1.125rem',
              color: '#555',
            }}
          >
            Explore comprehensive information on schools, programs, scholarships, and more!
          </Typography>
          <HeroButton
            variant="contained"
            color="primary"
            size="large"
            component={Link}
            to="/programs"
          >
            Find Your Program
          </HeroButton>
        </HeroContent>
      </Container>
    </HeroSection>
  );
};

export default Hero;
