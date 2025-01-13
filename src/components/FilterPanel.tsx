// import React from 'react';
import { Box, Typography, Radio, FormGroup, FormControlLabel, Switch } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useFilter } from '../context/FilterContext';
import { DUMMY_PROGRAMS } from '../assets/data';

interface CountItem {
  name: string;
  count: number;
}

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

const getCoopCount = (): number => {
  return DUMMY_PROGRAMS.filter(program => program.coop).length;
};

const getRemoteLearningCount = (): number => {
  return DUMMY_PROGRAMS.filter(program => program.remote).length;
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
  '& .MuiRadio-root': {
    color: '#757575',
    '&.Mui-checked': {
      color: '#1976d2'
    }
  },
  '& .MuiSwitch-root': {
    '& .MuiSwitch-track': {
      backgroundColor: '#4CAF50'
    },
    '& .MuiSwitch-thumb': {
      backgroundColor: '#fff'
    }
  }
}));

const FilterLabel = styled('span')({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%'
});

const SwitchContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  padding: '8px 0',
  '& .MuiTypography-root': {
    marginRight: '16px'
  }
});

export const FilterPanel = () => {
  const { state, dispatch } = useFilter();

  const provinces = getUniqueValuesWithCount('province');
  const universities = getUniqueValuesWithCount('university');
  const coopCount = getCoopCount();
  const remoteLearningCount = getRemoteLearningCount();

  const handleProvinceChange = (provinceName: string) => {
    dispatch({ type: 'SET_PROVINCE', payload: provinceName });
  };

  const handleUniversityChange = (universityName: string) => {
    dispatch({ type: 'SET_UNIVERSITY', payload: universityName });
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
              <Radio
                checked={state.province?.[0] === name}
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

      <Typography variant="h6">Co-op availability</Typography>
      <SwitchContainer>
        <Typography>Co-op available ({coopCount})</Typography>
        <Switch
          checked={state.coop || false}
          onChange={(e) => dispatch({ type: 'SET_COOP', payload: e.target.checked })}
          color="primary"
        />
      </SwitchContainer>

      <Typography variant="h6">Remote learning</Typography>
      <SwitchContainer>
        <Typography>Remote learning available ({remoteLearningCount})</Typography>
        <Switch
          checked={state.remote || false}
          onChange={(e) => dispatch({ type: 'SET_REMOTE_LEARNING', payload: e.target.checked })}
          color="primary"
        />
      </SwitchContainer>

      <Typography variant="h6">University</Typography>
      <FormGroup>
        {universities.map(({ name, count }) => (
          <FormControlLabel
            key={name}
            control={
              <Radio
                checked={state.university?.[0] === name}
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
    </FilterContainer>
  );
};

export default FilterPanel;