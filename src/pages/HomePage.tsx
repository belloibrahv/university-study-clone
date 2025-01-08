import React from 'react';
import { 
  Container, 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Grid,
  Button,
  TextField,
  MenuItem,
  Stack
} from '@mui/material';
import { Link } from 'react-router-dom';
import SchoolIcon from '@mui/icons-material/School';
import SearchIcon from '@mui/icons-material/Search';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { useFilter } from '../context/FilterContext';

export const HomePage: React.FC = () => {
  const { dispatch } = useFilter();

  const handleProgramLevelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SET_PROGRAM_LEVEL', payload: [event.target.value] });
  };

  const handleAreaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SET_AREA_OF_STUDY', payload: [event.target.value] });
  };

  return (
    <Box sx={{ bgcolor: '#FFF5E6', minHeight: '100vh' }}>
      {/* Hero Section */}
      <Box
        sx={{
          pt: 12,
          pb: 6,
          background: 'linear-gradient(45deg, #FFF5E6 30%, #FFE0B2 90%)',
          borderRadius: '0 0 20% 20%',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography
                variant="h2"
                component="h1"
                sx={{
                  fontWeight: 'bold',
                  mb: 4,
                  color: '#333'
                }}
              >
                Make informed decisions about your{' '}
                <Box component="span" sx={{ color: '#D32F2F' }}>
                  post-secondary education.
                </Box>
              </Typography>
              <Typography variant="h6" color="text.secondary" paragraph>
                Explore comprehensive information on schools, programs, scholarships, and more!
              </Typography>

              {/* Quick Search Form */}
              <Card sx={{ mt: 4, p: 2, bgcolor: 'rgba(255, 255, 255, 0.9)' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Find Your Program
                  </Typography>
                  <Stack spacing={2}>
                    <TextField
                      select
                      fullWidth
                      label="Program Level"
                      onChange={handleProgramLevelChange}
                      variant="outlined"
                    >
                      <MenuItem value="Certificate">Certificate</MenuItem>
                      <MenuItem value="Diploma">Diploma</MenuItem>
                      <MenuItem value="Bachelor">Bachelor's Degree</MenuItem>
                      <MenuItem value="Master">Master's Degree</MenuItem>
                      <MenuItem value="Doctorate">Doctorate</MenuItem>
                    </TextField>

                    <TextField
                      select
                      fullWidth
                      label="Area of Study"
                      onChange={handleAreaChange}
                      variant="outlined"
                    >
                      <MenuItem value="Business">Business</MenuItem>
                      <MenuItem value="Engineering">Engineering</MenuItem>
                      <MenuItem value="Arts">Arts</MenuItem>
                      <MenuItem value="Science">Science</MenuItem>
                      <MenuItem value="Medicine">Medicine</MenuItem>
                    </TextField>

                    <Button
                      component={Link}
                      to="/programs"
                      variant="contained"
                      size="large"
                      startIcon={<SearchIcon />}
                      sx={{ mt: 2 }}
                    >
                      Search Programs
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box sx={{ position: 'relative', height: '100%', minHeight: 400 }}>
                {/* Stats Cards */}
                <Card
                  sx={{
                    position: 'absolute',
                    top: '10%',
                    right: '10%',
                    width: 200,
                    transform: 'rotate(5deg)'
                  }}
                >
                  <CardContent>
                    <Typography variant="h5" gutterBottom>
                      97 universities
                    </Typography>
                    <SchoolIcon color="primary" />
                  </CardContent>
                </Card>

                <Card
                  sx={{
                    position: 'absolute',
                    bottom: '20%',
                    left: '10%',
                    width: 250,
                    transform: 'rotate(-3deg)'
                  }}
                >
                  <CardContent>
                    <Typography variant="h5" gutterBottom>
                      17000+ programs
                    </Typography>
                    <TrendingUpIcon color="primary" />
                  </CardContent>
                </Card>

                <Card
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    right: '20%',
                    width: 280,
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Trusted by 1M+ students every year
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4}>
          {[
            {
              title: 'Comprehensive Program Database',
              description: 'Access detailed information about thousands of programs across Canada.'
            },
            {
              title: 'Advanced Search Tools',
              description: 'Find the perfect program with our powerful filtering and search capabilities.'
            },
            {
              title: 'University Comparisons',
              description: 'Compare different institutions and make informed decisions about your future.'
            }
          ].map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Call to Action */}
      <Box sx={{ bgcolor: '#D32F2F', color: 'white', py: 6, textAlign: 'center' }}>
        <Container maxWidth="sm">
          <Typography variant="h4" component="h2" gutterBottom>
            Ready to start your journey?
          </Typography>
          <Typography variant="h6" paragraph>
            Explore programs that match your interests and career goals.
          </Typography>
          <Button
            component={Link}
            to="/programs"
            variant="contained"
            size="large"
            sx={{ 
              bgcolor: 'white', 
              color: '#D32F2F',
              '&:hover': {
                bgcolor: 'grey.100'
              }
            }}
          >
            Browse All Programs
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;
