import React from 'react';
import styled from 'styled-components';
import { Box, Typography, Checkbox, FormGroup, FormControlLabel } from '@mui/material';
import { useFilter } from '../context/FilterContext';

const FilterContainer = styled(Box)`
  padding: 16px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  h6 {
    font-size: 1.25rem;
    font-weight: bold;
    margin-bottom: 16px;
  }
`;

const FilterGroup = styled(Box)`
  margin-top: 8px;

  h6 {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 8px;
    color: #333;
  }

  .MuiFormControlLabel-label {
    font-size: 0.875rem;
    font-weight: 500;
  }
`;

export const FilterPanel: React.FC = () => {
  const { state, dispatch } = useFilter();
  const provinces = [
    { name: 'Alberta', count: 1263 },
    { name: 'British Columbia', count: 2071 },
    { name: 'Manitoba', count: 653 },
    { name: 'New Brunswick', count: 558 },
    { name: 'Newfoundland and Labrador', count: 293 },
    { name: 'Nova Scotia', count: 938 },
    { name: 'Ontario', count: 6361 },
    { name: 'Quebec', count: 4295 },
    { name: 'Saskatchewan', count: 874 }
  ];

  const handleProvinceChange = (provinceName: string) => {
    const updatedProvinces = state.province.includes(provinceName)
      ? state.province.filter((p) => p !== provinceName)
      : [...state.province, provinceName];
    dispatch({ type: 'SET_PROVINCE', payload: updatedProvinces });
  };

  return (
    <FilterContainer>
      <Typography variant="h6">More filters</Typography>
      <FilterGroup>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, fontSize: '1rem' }}>
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
      </FilterGroup>
    </FilterContainer>
  );
};

export default FilterPanel;
