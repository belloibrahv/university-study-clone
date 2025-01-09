import React from 'react';
import { Box, Card, CardContent, Typography, IconButton, Grid } from '@mui/material';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { styled } from '@mui/material/styles';
import { Program } from '../types';

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

export const ProgramResults: React.FC<{ programs: Program[] }> = ({ programs }) => (
  <Box>
    <Typography variant="h5" sx={{ mb: 3 }}>
      Showing {programs.length} programs
    </Typography>
    {programs.map((program) => (
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
  </Box>
);
