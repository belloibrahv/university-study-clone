import React from 'react';
import { Box, FormControl, Select, MenuItem, TextField, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';
import { useFilter } from '../context/FilterContext';
import { updateFilterInteractions } from '../utils/tracking';

const FilterContainer = styled(Box)({
  display: 'flex',
  gap: '12px',
  marginBottom: '32px',
});

const StyledFormControl = styled(FormControl)({
  minWidth: 200,
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    backgroundColor: '#fff',
  }
});

const SearchField = styled(TextField)({
  flex: 1,
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    backgroundColor: '#fff',
  }
});

export const SearchFilters: React.FC = () => {
  const { state, dispatch } = useFilter();

  const handleFilterChange = (type: string, value: string) => {
    dispatch({ type: `SET_${type.toUpperCase()}`, payload: value });
    updateFilterInteractions({
      ...state,
      [type.toLowerCase()]: value
    } as any);
  };

  return (
    <FilterContainer>
      <StyledFormControl>
        <Select
          value={state.programLevel}
          onChange={(e) => handleFilterChange('PROGRAM_LEVEL', e.target.value)}
          displayEmpty
        >
          <MenuItem value="">Program Level</MenuItem>
          <MenuItem value="certificate">Certificate</MenuItem>
          <MenuItem value="diploma">Diploma</MenuItem>
          <MenuItem value="bachelor">Bachelor's Degree</MenuItem>
          <MenuItem value="master">Master's Degree</MenuItem>
          <MenuItem value="doctorate">Doctorate</MenuItem>
        </Select>
      </StyledFormControl>

      <StyledFormControl>
        <Select
          value={state.language}
          onChange={(e) => handleFilterChange('LANGUAGE', e.target.value)}
          displayEmpty
        >
          <MenuItem value="">Language</MenuItem>
          <MenuItem value="english">English</MenuItem>
          <MenuItem value="french">French</MenuItem>
          <MenuItem value="bilingual">Bilingual</MenuItem>
        </Select>
      </StyledFormControl>

      <StyledFormControl>
        <Select
          value={state.studyArea}
          onChange={(e) => handleFilterChange('STUDY_AREA', e.target.value)}
          displayEmpty
        >
          <MenuItem value="">Area of Study</MenuItem>
          <MenuItem value="business">Business</MenuItem>
          <MenuItem value="engineering">Engineering</MenuItem>
          <MenuItem value="arts">Arts</MenuItem>
          <MenuItem value="science">Science</MenuItem>
        </Select>
      </StyledFormControl>

      <SearchField
        placeholder="Search..."
        value={state.searchQuery}
        onChange={(e) => handleFilterChange('SEARCH_QUERY', e.target.value)}
        InputProps={{
          endAdornment: (
            <IconButton>
              <SearchIcon />
            </IconButton>
          ),
        }}
      />
    </FilterContainer>
  );
};
