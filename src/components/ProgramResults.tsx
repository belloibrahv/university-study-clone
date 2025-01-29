import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, IconButton, Grid, Button } from '@mui/material';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { styled } from '@mui/material/styles';
import { useFilter } from '../context/FilterContext';

const ResultCard = styled(Card)({
  marginBottom: '16px',
  border: '1px solid #eaeaea',
  boxShadow: 'none',
  borderRadius: '12px',
  '&:hover': {
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  }
});

const UniversityLogo = styled('img')({
  width: '100%',
  maxWidth: '120px',
  height: 'auto',
  objectFit: 'contain',
});

const LoadMoreButton = styled(Button)({
  display: 'block',
  margin: '20px auto',
  padding: '8px 24px',
  borderRadius: '8px',
  backgroundColor: '#fff',
  border: '1px solid #ddd',
  color: '#ca2c3d',
  cursor: 'pointer',
  fontWeight: 'bold',
  textTransform: 'initial',
  '&:hover': {
    backgroundColor: '#f5f5f5',
  }
});

export const ProgramResults: React.FC = () => {
  const { filteredPrograms } = useFilter();
  const [displayCount, setDisplayCount] = useState(10);
  
  const displayedPrograms = filteredPrograms.slice(0, displayCount);
  const hasMore = displayCount < filteredPrograms.length;

  const handleLoadMore = () => {
    setDisplayCount(prevCount => Math.min(prevCount + 10, filteredPrograms.length));
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
        Search results for programs
      </Typography>
      <Typography variant="h6" sx={{ mb: 3 }}>
        Showing {filteredPrograms.length} programs
      </Typography>
      
      {displayedPrograms.map((program) => (
        <ResultCard key={program.id}>
          <CardContent>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} sm={2}>
                <UniversityLogo src={program.image} alt={program.university} />
              </Grid>
              <Grid item xs={12} sm={8}>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  {program.programName}
                </Typography>
                <Typography color="text.secondary">
                  {program.university} • {program.province}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {program.programLevel} • {program.language}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={2} sx={{ textAlign: 'right' }}>
                <IconButton size="small">
                  <CompareArrowsIcon />
                </IconButton>
                <IconButton size="small">
                  <FavoriteBorderIcon />
                </IconButton>
              </Grid>
            </Grid>
          </CardContent>
        </ResultCard>
      ))}

      {hasMore && (
        <LoadMoreButton onClick={handleLoadMore}>
          Load more
        </LoadMoreButton>
      )}
    </Box>
  );
};
