import React from 'react';
import { Box, Typography, Checkbox, FormGroup, FormControlLabel } from '@mui/material';
import { useFilter } from '../context/FilterContext';

export const FilterPanel: React.FC = () => {
  const { state, dispatch } = useFilter();

  const provinces = [
    { name: 'Alberta', count: 1263 },
    { name: 'British Columbia', count: 2071 },
    { name: 'Manitoba', count: 653 },
    { name: 'New Brunswick', count: 558 },
    { name: 'Newfoundland and Labrador', count: 293 },
    { name: 'Nova Scotia', count: 938 },
    { name: 'Ontario', count: 6361 }
  ];

  const handleProvinceChange = (provinceName: string) => {
    const newProvinces = state.province.includes(provinceName)
      ? state.province.filter(p => p !== provinceName)
      : [...state.province, provinceName];
    
    dispatch({ type: 'SET_PROVINCE', payload: newProvinces });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        More filters
      </Typography>
      
      <Box sx={{ mt: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          Province/Territory
        </Typography>
        <FormGroup>
          {provinces.map((province) => (
            <FormControlLabel
              key={province.name}
              control={
                <Checkbox
                  checked={state.province.includes(province.name)}
                  onChange={() => handleProvinceChange(province.name)}
                />
              }
              label={`${province.name} (${province.count})`}
            />
          ))}
        </FormGroup>
      </Box>
    </Box>
  );
};

export default FilterPanel;
