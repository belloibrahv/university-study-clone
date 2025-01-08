import React from 'react';
import { Container, Grid, Box, Typography } from '@mui/material';
import { SearchBar } from '../components/SearchBar';
import { FilterPanel } from '../components/FilterPanel';
import { AdditionalFilters } from '../components/AdditionalFilters';
import { useFilter } from '../context/FilterContext';

export const ProgramPage: React.FC = () => {
  const {} = useFilter();

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              Search Programs
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Use the filters below to find your perfect program
            </Typography>
          </Box>
          <SearchBar />
          <AdditionalFilters />
        </Grid>
        <Grid item xs={12} md={3}>
          <FilterPanel />
        </Grid>
        <Grid item xs={12} md={9}>
          <Box sx={{ p: 3 }}>
            <Typography variant="body1" color="text.secondary">
              Filter results will be tracked in window.filterInteractions
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProgramPage;
