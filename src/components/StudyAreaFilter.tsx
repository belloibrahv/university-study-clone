import React, { useMemo } from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem, Chip, OutlinedInput, TextField } from '@mui/material';
import { useFilter } from '../context/FilterContext';

interface StudyAreaOption {
  value: string;
  count: number;
}

const StudyAreaFilter = () => {
  const { state, dispatch, filteredPrograms } = useFilter();

  // Extract all unique study areas from all programs
  const studyAreaOptions = useMemo(() => {
    const studyAreaCounts: Record<string, number> = {};
    
    // Count occurrences of each study area across all filtered programs
    filteredPrograms.forEach(program => {
      program.studyArea.forEach(area => {
        const normalizedArea = area.trim();
        if (normalizedArea) {
          studyAreaCounts[normalizedArea] = (studyAreaCounts[normalizedArea] || 0) + 1;
        }
      });
    });
    
    // Convert to array of options with values and counts
    return Object.entries(studyAreaCounts)
      .map(([value, count]) => ({ value, count }))
      .sort((a, b) => {
        // Sort by count (descending) and then alphabetically
        if (b.count !== a.count) return b.count - a.count;
        return a.value.localeCompare(b.value);
      });
  }, [filteredPrograms]);

  // Handle study area selection changes
  const handleChange = (event: any) => {
    const selectedValues: string[] = typeof event.target.value === 'string'
      ? event.target.value.split(',')
      : event.target.value;
    
    dispatch({
      type: 'SET_STUDY_AREA',
      payload: selectedValues
    });
  };

  return (
    <FormControl sx={{ minWidth: 200 }}>
      <InputLabel>Area of Study</InputLabel>
      <Select
        multiple
        value={state.studyArea}
        onChange={handleChange}
        input={<OutlinedInput label="Area of Study" />}
        renderValue={(selected) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selected.map((value) => {
              // Find matching option to get count
              const option = studyAreaOptions.find(opt => opt.value === value);
              return (
                <Chip
                  key={value}
                  label={`${value} ${option ? `(${option.count})` : ''}`}
                />
              );
            })}
          </Box>
        )}
      >
        {studyAreaOptions.map((option) => (
          <MenuItem
            key={option.value}
            value={option.value}
            sx={{
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <span>{option.value}</span>
            <span style={{ color: '#666', marginLeft: '8px' }}>({option.count})</span>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default StudyAreaFilter;