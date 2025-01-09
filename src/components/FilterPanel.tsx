import React from 'react';
import { Box, Typography, Checkbox, FormGroup, FormControlLabel } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useFilter } from '../context/FilterContext';

const FilterContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  background: '#fff',
  border: '1px solid #ddd',
  borderRadius: theme.shape.borderRadius,
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
  }
}));

export const FilterPanel: React.FC = () => {
  const { state, dispatch } = useFilter();
  const provinces = [
    { name: 'Alberta', count: 1263 },
    { name: 'British Columbia', count: 2071 },
    { name: 'Ontario', count: 6361 },
    // ... other provinces
  ];

  return (
    <FilterContainer>
      <Typography variant="h6" sx={{ mb: 2 }}>Province/Territory</Typography>
      <FormGroup>
        {provinces.map((province) => (
          <FormControlLabel
            key={province.name}
            control={
              <Checkbox
                checked={state.province.includes(province.name)}
                onChange={() => {
                  const updatedProvinces = state.province.includes(province.name)
                    ? state.province.filter(p => p !== province.name)
                    : [...state.province, province.name];
                  dispatch({ type: 'SET_PROVINCE', payload: updatedProvinces });
                }}
              />
            }
            label={`${province.name} (${province.count})`}
          />
        ))}
      </FormGroup>
    </FilterContainer>
  );
};
