import React from 'react';
import { Box, Card, CardContent, Typography, IconButton, Grid } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import { useFilter } from '../context/FilterContext';
import { Program } from '../types';

export const ProgramResults: React.FC = () => {
  const { state } = useFilter();

  const ResultCard: React.FC<{ program: Program }> = ({ program }) => (
    <Card
      sx={{
        mb: 2,
        '&:hover': {
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)'
        },
        borderRadius: '8px'
      }}
    >
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={2}>
            <Box
              component="img"
              src={`/api/placeholder/100/100`}
              alt={program.university}
              sx={{ width: '100%', height: 'auto', maxWidth: 100 }}
            />
          </Grid>
          <Grid item xs={12} sm={8}>
            <Typography variant="h6" sx={{ fontWeight: '600', fontSize: '1rem' }}>
              {program.name}
            </Typography>
            <Typography sx={{ fontSize: '0.875rem', color: '#666' }}>
              {program.university} • {program.province}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={2} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton>
              <CompareArrowsIcon fontSize="small" />
            </IconButton>
            <IconButton>
              <FavoriteBorderIcon fontSize="small" />
            </IconButton>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );

  return (
    <Box>
      <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: '500' }}>
        Showing {state.results.length} programs
      </Typography>
      {state.results.map((program) => (
        <ResultCard key={program.id} program={program} />
      ))}
    </Box>
  );
};

export default ProgramResults;
