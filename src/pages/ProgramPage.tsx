import React from 'react';
import styled from 'styled-components';
import { Container, Grid, Box, Typography } from '@mui/material';
import { SearchBar } from '../components/SearchBar';
import { FilterPanel } from '../components/FilterPanel';
import { AdditionalFilters } from '../components/AdditionalFilters';
import { useFilter } from '../context/FilterContext';

const PageHeader = styled(Box)`
  margin-bottom: 24px;
  text-align: center;

  h1 {
    font-weight: bold;
    color: #333;
  }

  p {
    color: #666;
  }
`;

const ResultsContainer = styled(Box)`
  padding: 24px;
  background: #fafafa;
  border: 1px solid #ddd;
  border-radius: 8px;
`;

export const ProgramPage: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <PageHeader>
            <Typography variant="h4" component="h1" gutterBottom>
              Search Programs
            </Typography>
            <Typography variant="body1">
              Use the filters below to find your perfect program
            </Typography>
          </PageHeader>
          <SearchBar />
          <AdditionalFilters />
        </Grid>
        <Grid item xs={12} md={3}>
          <FilterPanel />
        </Grid>
        <Grid item xs={12} md={9}>
          <ResultsContainer>
            <Typography variant="body1" color="text.secondary">
              Filter results will be displayed here.
            </Typography>
          </ResultsContainer>
        </Grid>
      </Grid>
    </Container>
  );
};
export default ProgramPage;
