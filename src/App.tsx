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
import Ads from './components/Ads';
import { Footer } from './components/Footer';
import { PartnerSlider } from './components/PartnerSlider';
import NSPImg from './assets/images/nsp.png';
import JackmanImg from './assets/images/jackman.png';
import CanadaImg from './assets/images/canadauni.svg';
import PostmanImg from './assets/images/postmedia.png';
import UniversityImg from './assets/images/university.svg';
import FoundationImg from './assets/images/foundation.svg';
import "./App.css"

const theme = createTheme({
  palette: {
    primary: { main: '#0066cc' },
    background: { default: '#fff' },
  },
  typography: {
    h1: { 
      fontSize: '48px',
      fontWeight: 700,
      marginBottom: '32px',
    },
    fontFamily: "'CircularStd', sans-serif",
  },
});

const PageHeader = styled(Box)({
  background: 'linear-gradient(135deg, rgb(255, 242, 197) 0%, rgb(247, 193, 162) 100%)',
  padding: '28px 0 10px',
  marginBottom: '12px',
});

const App: React.FC = () => {
  const partners = [
    { id: 1, name: 'RBC Foundation', logo: FoundationImg },
    { id: 2, name: 'Postmedia', logo: PostmanImg },
    { id: 3, name: 'Jackman Foundation', logo: JackmanImg },
    { id: 4, name: 'NSI', logo: NSPImg },
    { id: 5, name: 'UNI', logo: UniversityImg },
    { id: 6, name: 'UNI', logo: CanadaImg },
    { id: 7, name: 'RBC Foundation', logo: FoundationImg },
    { id: 8, name: 'NSI', logo: NSPImg },
    { id: 9, name: 'Postmedia', logo: PostmanImg },
  ];

  return (
    <FilterProvider>
      <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <PageHeader>
        <Typography variant="h1" sx={{ paddingLeft: '44px', fontWeight: 700, letterSpacing: '-2px' }}>Search Programs</Typography>
      </PageHeader>
      <SearchFilters />
      <Box maxWidth="lg" sx={{ bgcolor: '#fff,', margin: '0 54px' }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            <FilterPanel />
          </Grid>
          <Grid item xs={12} md={9}>
            <ProgramResults programs={DUMMY_PROGRAMS} />
          </Grid>
        </Grid>
      </Box>
      <Ads text="Advertisment" position='340px' addBorder/>
      <PartnerSlider partners={partners} />
      <Footer />
    </ThemeProvider>
    </FilterProvider>
    
  );
};

export default App;
