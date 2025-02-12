import { Box, Typography, Radio, FormGroup, FormControlLabel, Switch, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useFilter } from '../context/FilterContext';

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
  }
}));

const SelectedProvince = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(2),
  // backgroundColor: '#f5f5f5',
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


export const FilterPanel = () => {
  const { 
    state, 
    dispatch, 
    filterCounts, 
    availableFilters,
  } = useFilter();

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
      
      <FilterSection>
        <Typography variant="h6">Province/Territory</Typography>
        {state.selectedProvince ? (
          <SelectedProvince>
            <FormControlLabel
              key={state.selectedProvince}
              control={
                <Radio
                  checked={true}
                  onChange={() => handleProvinceChange(state.selectedProvince!)}
                />
              }
              label={
                <FilterLabel>
                  <span>{state.selectedProvince}</span>
                  <span>({filterCounts.province[state.selectedProvince] || 0})</span>
                </FilterLabel>
              }
            />
          </SelectedProvince>
        ) : (
          <FormGroup>
            {availableFilters.provinces.map((province) => (
              <FormControlLabel
                key={province}
                control={
                  <Radio
                    checked={state.province?.[0] === province}
                    onChange={() => handleProvinceChange(province)}
                  />
                }
                label={
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <span>{province}</span>
                    <span>({filterCounts.province[province] || 0})</span>
                  </Box>
                }
              />
            ))}
          </FormGroup>
        )}
      </FilterSection>

      <Divider />

      {availableFilters.hasCoopPrograms && (
        <>
          <Divider />
          <SwitchContainer>
            <Box>
              <Typography variant="h6" sx={{ mb: 0 }}>Co-op availability</Typography>
            </Box>
            <div className="switch-section">
              <span className="switch-label">{state.coop ? 'Yes' : 'No'}</span>
              <Switch
                checked={state.coop}
                onChange={(e) => dispatch({ type: 'SET_COOP', payload: e.target.checked })}
                color="primary"
              />
            </div>
          </SwitchContainer>
        </>
      )}

      {availableFilters.hasRemotePrograms && (
        <>
          <Divider />
          <SwitchContainer>
            <Box>
              <Typography variant="h6" sx={{ mb: 0 }}>Remote learning</Typography>
            </Box>
            <div className="switch-section">
              <span className="switch-label">{state.remote ? 'Yes' : 'No'}</span>
              <Switch
                checked={state.remote}
                onChange={(e) => dispatch({ type: 'SET_REMOTE_LEARNING', payload: e.target.checked })}
                color="primary"
              />
            </div>
          </SwitchContainer>
        </>
      )}

      <Divider />
      <FilterSection>
        <Typography variant="h6">University</Typography>
        {state.university?.length > 0 ? (
          <SelectedProvince>
            <FormControlLabel
              key={state.university[0]}
              control={
                <Radio
                  checked={true}
                  onChange={() => handleUniversityChange(state.university[0])}
                />
              }
              label={
                <FilterLabel>
                  <span>{state.university[0]}</span>
                  <span>({filterCounts.university[state.university[0]] || 0})</span>
                </FilterLabel>
              }
            />
          </SelectedProvince>
        ) : (
          <FormGroup>
            {availableFilters.universities.map((university) => (
              <FormControlLabel
                key={university}
                control={
                  <Radio
                    checked={state.university?.[0] === university}
                    onChange={() => handleUniversityChange(university)}
                  />
                }
                label={
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <span>{university}</span>
                    <span>({filterCounts.university[university] || 0})</span>
                  </Box>
                }
              />
            ))}
          </FormGroup>
        )}
      </FilterSection>
      
    </FilterContainer>
  );
};

export default FilterPanel;