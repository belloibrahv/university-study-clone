import { Box, Typography, Radio, FormGroup, FormControlLabel, Switch, Divider, IconButton, SwitchProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import { useFilter } from '../context/FilterContext';
import { DUMMY_PROGRAMS } from '../assets/data';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useState } from 'react';


const SSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: '#1c7d60',
        opacity: 1,
        border: 0,
        ...theme.applyStyles('dark', {
          backgroundColor: '#2ECA45',
        }),
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color: theme.palette.grey[100],
      ...theme.applyStyles('dark', {
        color: theme.palette.grey[600],
      }),
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: 0.7,
      ...theme.applyStyles('dark', {
        opacity: 0.3,
      }),
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: '#E9E9EA',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
    ...theme.applyStyles('dark', {
      backgroundColor: '#39393D',
    }),
  },
}));

const FilterContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(0.3),
  background: 'transparent',
  '& .MuiTypography-root': {
    fontFamily: "'CircularStd', sans-serif",
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
  }
}));

const FilterSection = styled(Box)(({ theme }) => ({
  marginBottom: '24px',
  '& .MuiFormControlLabel-root': {
    marginRight: 0,
    width: '100%',
  },
  '& .MuiFormControlLabel-label': {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(0.5, 1),
  },
  '& .MuiRadio-root.Mui-checked': {
    color: '#ed6f33',
    '& + .MuiFormControlLabel-label': {
      color: '#ed6f33',
    }
  },
  '& .MuiRadio-root': {
    '&.Mui-checked': {
      '& .MuiSvgIcon-root': {
        // border: '2px solid #ed6f33',
        // borderRadius: '50%',
        // padding: '2px'
      }
    }
  }
}));

const SelectedProvince = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(2),
  borderRadius: theme.spacing(1),
  marginBottom: theme.spacing(2),
}));

const SwitchContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  padding: theme.spacing(2, 0),
  '& .switch-section': {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  '& .switch-label': {
    color: '#757575',
    fontSize: '1rem',
    fontWeight: 500,
  },
  '& .count': {
    color: '#757575',
    fontSize: '0.875rem',
    marginLeft: theme.spacing(1),
  }
}));

const FilterLabel = styled('span')({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%'
});

const ShowMoreButton = styled(Box)({
  color: '#ed6f33',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  fontSize: '14px',
  fontWeight: 500,
  marginTop: '8px',
  // '&:hover': {
  //   textDecoration: 'underline',
  // },
});

export const FilterPanel = () => {
  const [showAllUniversities, setShowAllUniversities] = useState(false);
  const { state, dispatch, filterCounts, availableFilters } = useFilter();
  
  const handleProvinceChange = (provinceName: string) => {
    dispatch({ type: 'SET_PROVINCE', payload: provinceName });
  };

  const handleUniversityChange = (universityName: string) => {
    dispatch({ type: 'SET_UNIVERSITY', payload: universityName });
  };

  const getAvailableProvinces = () => {
    const activeFilters = {
      programLevel: state.programLevel,
      language: state.language,
      studyArea: state.studyArea,
      university: state.university,
      coop: state.coop,
      remote: state.remote,
      searchQuery: state.searchQuery
    };

    return DUMMY_PROGRAMS
      .filter(program => {
        // Check if program matches all active filters
        return Object.entries(activeFilters).every(([key, value]) => {
          if (!value || (Array.isArray(value) && value.length === 0)) return true;
          if (typeof value === 'boolean') return program[key] === value;
          if (Array.isArray(value)) return value.includes(program[key]);
          if (key === 'searchQuery') {
            return program.programName.toLowerCase().includes(value.toLowerCase()) ||
                   program.university.toLowerCase().includes(value.toLowerCase());
          }
          return true;
        });
      })
      .map(program => program.province)
      .filter((province, index, self) => self.indexOf(province) === index)
      .sort();
  };

  const getAvailableUniversities = () => {
    const activeFilters = {
      programLevel: state.programLevel,
      language: state.language,
      studyArea: state.studyArea,
      province: state.province,
      coop: state.coop,
      remote: state.remote,
      searchQuery: state.searchQuery
    };

    return DUMMY_PROGRAMS
      .filter(program => {
        // Check if program matches all active filters
        return Object.entries(activeFilters).every(([key, value]) => {
          if (!value || (Array.isArray(value) && value.length === 0)) return true;
          if (typeof value === 'boolean') return program[key] === value;
          if (Array.isArray(value)) return value.includes(program[key]);
          if (key === 'searchQuery') {
            return program.programName.toLowerCase().includes(value.toLowerCase()) ||
                   program.university.toLowerCase().includes(value.toLowerCase());
          }
          return true;
        });
      })
      .map(program => program.university)
      .filter((university, index, self) => self.indexOf(university) === index)
      .sort();
  };

  const visibleUniversities = showAllUniversities 
  ? getAvailableUniversities()
  : getAvailableUniversities().slice(0, 13);

  return (
    <FilterContainer>
    <Typography variant="h5" sx={{ fontWeight: 700, mb: '10px' }}>More filters</Typography>
    <Divider />
    
    <FilterSection>
      <Typography variant="h6" sx={{ fontWeight: 700 }}>Province/Territory</Typography>
      {state.selectedProvince ? (
        <SelectedProvince>
          <FormControlLabel
            control={
              <Radio
                checked={true}
                onChange={() => handleProvinceChange(state.selectedProvince!)}
              />
            }
            label={
              <FilterLabel>
                {state.selectedProvince}
                <span>({filterCounts.province[state.selectedProvince] || 0})</span>
              </FilterLabel>
            }
          />
          <IconButton
            onClick={() => dispatch({ type: 'CLEAR_PROVINCE' })}
            sx={{ ml: 1 }}
          >
            <CloseIcon />
          </IconButton>
        </SelectedProvince>
      ) : (
        <FormGroup>
          {getAvailableProvinces().map((province) => (
            <FormControlLabel
              key={province}
              control={
                <Radio
                  checked={state.province.includes(province)}
                  onChange={() => handleProvinceChange(province)}
                />
              }
              label={
                <FilterLabel>
                  {province}
                  <span>({filterCounts.province[province] || 0})</span>
                </FilterLabel>
              }
            />
          ))}
        </FormGroup>
      )}
    </FilterSection>

      <Divider />
      <SwitchContainer>
        <Box>
          <Typography variant="h6" sx={{ mb: 0, fontWeight: 700 }}>Co-op availability</Typography>
        </Box>
        <div className="switch-section">
          <span className="switch-label">{state.coop ? 'Yes' : 'No'}</span>
          <SSwitch
            checked={state.coop}
            onChange={(e) => dispatch({ type: 'SET_COOP', payload: e.target.checked })}
            color="success"
          />
        </div>
      </SwitchContainer>

      <Divider />
      <SwitchContainer>
        <Box>
          <Typography variant="h6" sx={{ mb: 0, fontWeight: 700 }}>Remote learning</Typography>
        </Box>
        <div className="switch-section">
          <span className="switch-label">{state.remote ? 'Yes' : 'No'}</span>
          <SSwitch
            checked={state.remote}
            onChange={(e) => dispatch({ type: 'SET_REMOTE_LEARNING', payload: e.target.checked })}
            color="success"
          />
        </div>
      </SwitchContainer>

      <Divider />
      <FilterSection>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>University</Typography>
        {state.university?.length > 0 ? (
          <SelectedProvince>
            <FormControlLabel
              control={
                <Radio
                  checked={true}
                  onChange={() => handleUniversityChange(state.university[0])}
                  sx={{
                    '&.Mui-checked': {
                      color: '#ed6f33',
                    }
                  }}
                />
              }
              label={
                <FilterLabel>
                  {state.university[0]}
                  <span>({filterCounts.university[state.university[0]] || 0})</span>
                </FilterLabel>
              }
            />
            <IconButton onClick={() => dispatch({ type: 'CLEAR_UNIVERSITY' })} sx={{ ml: 1 }}>
              <CloseIcon />
            </IconButton>
          </SelectedProvince>
        ) : (
          <>
            <FormGroup>
              {visibleUniversities.map((university) => (
                <FormControlLabel
                  key={university}
                  control={
                    <Radio
                      checked={state.university.includes(university)}
                      onChange={() => handleUniversityChange(university)}
                      sx={{
                        '&.Mui-checked': {
                          color: '#ed6f33',
                          '& .MuiSvgIcon-root': {
                            border: '2px solid #ed6f33',
                            padding: '2px',
                          }
                        }
                      }}
                    />
                  }
                  label={
                    <FilterLabel>
                      {university}
                      <span>({filterCounts.university[university] || 0})</span>
                    </FilterLabel>
                  }
                />
              ))}
            </FormGroup>
            {getAvailableUniversities().length > 13 && (
              <ShowMoreButton onClick={() => setShowAllUniversities(!showAllUniversities)}>
                {showAllUniversities ? (
                  <>
                    Show less <KeyboardArrowUpIcon />
                  </>
                ) : (
                  <>
                    Show more <KeyboardArrowDownIcon />
                  </>
                )}
              </ShowMoreButton>
            )}
          </>
        )}
      </FilterSection>
    </FilterContainer>
  );
};

export default FilterPanel;
