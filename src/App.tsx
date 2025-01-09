import React from 'react';
import { CssBaseline, ThemeProvider, Container, Grid, Box, Typography } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import { Header } from './components/Header';
import { SearchFilters } from './components/SearchFilter';
import { FilterPanel } from './components/FilterPanel';
import { DUMMY_PROGRAMS } from './assets/data';
import { ProgramResults } from './components/ProgramResults';
import { FilterProvider } from './context/FilterContext';

const theme = createTheme({
  palette: {
    primary: { main: '#0066cc' },
    background: { default: '#f8f8f8' },
  },
  typography: {
    h1: { 
      fontSize: '48px',
      fontWeight: 700,
      marginBottom: '32px',
    },
  },
});

const PageHeader = styled(Box)({
  background: 'linear-gradient(135deg, #fff5e6 0%, #ffe4d3 100%)',
  padding: '48px 0',
  marginBottom: '32px',
});

const App: React.FC = () => {
  return (
    <FilterProvider>
      <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <PageHeader>
        <Container maxWidth="lg">
          <Typography variant="h1">Search Programs</Typography>
          <SearchFilters />
        </Container>
      </PageHeader>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            <FilterPanel />
          </Grid>
          <Grid item xs={12} md={9}>
            <ProgramResults programs={DUMMY_PROGRAMS} />
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
    </FilterProvider>
    
  );
};

export default App;
