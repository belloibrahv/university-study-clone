import React from 'react';
import { Box, Card, CardContent, Typography, IconButton, Grid, Chip } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { useFilter } from '../context/FilterContext';
import { Program } from '../types';

export const ProgramResults: React.FC = () => {
  const { state } = useFilter();

  const ResultCard: React.FC<{ program: Program }> = ({ program }) => (
    <Card sx={{ mb: 2, '&:hover': { boxShadow: 6 } }}>
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
            <Typography variant="h6" component="div">
              {program.name}
            </Typography>
            <Typography color="text.secondary" gutterBottom>
              {program.university} • {program.province}
            </Typography>
            <Box sx={{ mt: 1 }}>
              <Chip label={program.level} size="small" sx={{ mr: 1 }} />
              <Chip label={program.language} size="small" sx={{ mr: 1 }} />
              <Chip label={program.areaOfStudy} size="small" />
            </Box>
          </Grid>
          <Grid item xs={12} sm={2} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Showing {state.results.length} programs
      </Typography>
      {state.results.map((program) => (
        <ResultCard key={program.id} program={program} />
      ))}
    </Box>
  );
};


export default ProgramResults;
