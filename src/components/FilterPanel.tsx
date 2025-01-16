// import React from 'react';
import { Box, Typography, Radio, FormGroup, FormControlLabel, Switch, Divider } from '@mui/material';
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

const FilterContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(0.3),
  background: 'transparent',
  '& .MuiTypography-root': {
    fontFamily: "'Inter', sans-serif",
  },
  '& .MuiTypography-h4': {
    fontSize: '2rem',
    fontWeight: 700,
    color: '#2D2D2D',
    marginBottom: theme.spacing(4)
  },
  '& .MuiTypography-h6': {
    fontSize: '1.2rem',
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
      backgroundColor: '#757575',
      opacity: 0.3,
    },
    '& .MuiSwitch-thumb': {
      backgroundColor: '#fff',
      boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.2)',
    },
    '&.Mui-checked': {
      '& .MuiSwitch-track': {
        backgroundColor: '#1976d2 !important',
        opacity: 0.5,
      },
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
  padding: '16px 0',
  '& .switch-section': {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  '& .switch-label': {
    color: '#757575',
    fontSize: '1rem',
    fontWeight: 500,
  }
});

const FeatureTitle = styled(Typography)({
  fontSize: '1.125rem',
  fontWeight: 500,
  color: '#2D2D2D',
});


export const FilterPanel = () => {
  const { state, dispatch } = useFilter();

  const provinces = getUniqueValuesWithCount('province');
  const universities = getUniqueValuesWithCount('university');

  const handleProvinceChange = (provinceName: string) => {
    dispatch({ type: 'SET_PROVINCE', payload: provinceName });
  };

  const handleUniversityChange = (universityName: string) => {
    dispatch({ type: 'SET_UNIVERSITY', payload: universityName });
  };

  return (
    <FilterContainer>
      <Typography variant="h4">More filters</Typography>
      <Divider sx={{ mt: -2 }}/>
      
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
      
      <Divider sx={{ mt: 3 }}/>

      <SwitchContainer>
        <FeatureTitle>Co-op availability</FeatureTitle>
        <div className="switch-section">
          <span className="switch-label">{state.coop ? 'Yes' : 'No'}</span>
          <Switch
            checked={state.coop || false}
            onChange={(e) => dispatch({ type: 'SET_COOP', payload: e.target.checked })}
            color="primary"
          />
        </div>
      </SwitchContainer>

      <Divider />

      <SwitchContainer>
        <FeatureTitle>Remote learning</FeatureTitle>
        <div className="switch-section">
          <span className="switch-label">{state.remote ? 'Yes' : 'No'}</span>
          <Switch
            checked={state.remote || false}
            onChange={(e) => dispatch({ type: 'SET_REMOTE_LEARNING', payload: e.target.checked })}
            color="primary"
          />
        </div>
      </SwitchContainer>
      
      <Divider />
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