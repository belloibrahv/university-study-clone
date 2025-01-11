import React from 'react';
import { Box, Typography, Checkbox, FormGroup, FormControlLabel } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useFilter } from '../context/FilterContext';
import { DUMMY_PROGRAMS } from '../assets/data';

interface CountItem {
  name: string;
  count: number;
}

// Get unique values and counts from DUMMY_PROGRAMS
const getUniqueValuesWithCount = (key: keyof typeof DUMMY_PROGRAMS[0]): CountItem[] => {
  const countMap = DUMMY_PROGRAMS.reduce((acc, program) => {
    const value = program[key];
    if (typeof value === 'string') {
      acc[value] = (acc[value] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);
  
  return Object.entries(countMap)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => a.name.localeCompare(b.name));
};

const FilterContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  background: '#fff',
  '& .MuiTypography-root': {
    fontFamily: "'Inter', sans-serif",
  },
  '& .MuiTypography-h4': {
    fontSize: '2.5rem',
    fontWeight: 700,
    color: '#2D2D2D',
    marginBottom: theme.spacing(4)
  },
  '& .MuiTypography-h6': {
    fontSize: '1.5rem',
    fontWeight: 600,
    color: '#2D2D2D',
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(3)
  },
  '& .MuiFormControlLabel-root': {
    marginLeft: -8,
    marginRight: 0,
    width: '100%'
  },
  '& .MuiFormControlLabel-label': {
    fontSize: '1rem',
    fontWeight: 400,
    color: '#2D2D2D',
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    paddingRight: theme.spacing(1)
  },
  '& .MuiCheckbox-root': {
    color: '#757575',
    '&.Mui-checked': {
      color: '#1976d2'
    }
  }
}));

const FilterLabel = styled('span')({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%'
});

export const FilterPanel = () => {
  const { state = { province: [], university: [], coop: false }, dispatch } = useFilter();

  // Generate dynamic data from DUMMY_PROGRAMS
  const provinces = getUniqueValuesWithCount('province');
  const universities = getUniqueValuesWithCount('university');

  const handleProvinceChange = (provinceName: string) => {
    const currentProvinces = state.province || [];
    const updatedProvinces = currentProvinces.includes(provinceName)
      ? currentProvinces.filter(p => p !== provinceName)
      : [...currentProvinces, provinceName];
    dispatch({ type: 'SET_PROVINCE', payload: updatedProvinces });
  };

  const handleUniversityChange = (universityName: string) => {
    const currentUniversities = state.university || [];
    const updatedUniversities = currentUniversities.includes(universityName)
      ? currentUniversities.filter(u => u !== universityName)
      : [...currentUniversities, universityName];
    dispatch({ type: 'SET_UNIVERSITY', payload: updatedUniversities });
  };

  return (
    <FilterContainer>
      <Typography variant="h4">More filters</Typography>
      
      <Typography variant="h6">Province/Territory</Typography>
      <FormGroup>
        {provinces.map(({ name, count }) => (
          <FormControlLabel
            key={name}
            control={
              <Checkbox
                checked={(state.province || []).includes(name)}
                onChange={() => handleProvinceChange(name)}
              />
            }
            label={
              <FilterLabel>
                <span>{name}</span>
                <span>({count})</span>
              </FilterLabel>
            }
          />
        ))}
      </FormGroup>

      <Typography variant="h6">University</Typography>
      <FormGroup>
        {universities.map(({ name, count }) => (
          <FormControlLabel
            key={name}
            control={
              <Checkbox
                checked={(state.university || []).includes(name)}
                onChange={() => handleUniversityChange(name)}
              />
            }
            label={
              <FilterLabel>
                <span>{name}</span>
                <span>({count})</span>
              </FilterLabel>
            }
          />
        ))}
      </FormGroup>

      <Typography variant="h6">Co-op availability</Typography>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={state.coop || false}
              onChange={(e) => dispatch({ type: 'SET_COOP', payload: e.target.checked })}
            />
          }
          label="Co-op available"
        />
      </FormGroup>
    </FilterContainer>
  );
};

export default FilterPanel;
