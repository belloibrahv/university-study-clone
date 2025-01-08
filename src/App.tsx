import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { FilterProvider } from './context/FilterContext';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { ProgramPage } from './pages/ProgramPage';

// Create theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#D32F2F',
    },
    background: {
      default: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

export const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <FilterProvider>
        <BrowserRouter>
          <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Header />
            <main style={{ flex: 1 }}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/programs" element={<ProgramPage />} />
                <Route path="/schools" element={<div>Schools Page</div>} />
                <Route path="/scholarships" element={<div>Scholarships Page</div>} />
                <Route path="/resources" element={<div>Resources Page</div>} />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </FilterProvider>
    </ThemeProvider>
  );
};

export default App;
