import React, { useMemo } from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem, Chip, OutlinedInput } from '@mui/material';
import { useFilter } from '../context/FilterContext';

const StudyAreaFilter = () => {
  const { state, dispatch, filteredPrograms } = useFilter();

  // Create a map to track study areas and their counts
  const studyAreaStats = useMemo(() => {
    const stats = new Map();
    
    // First pass: collect all study areas and their counts
    filteredPrograms.forEach(program => {
      const normalizedArea = program.studyArea.trim().toLowerCase();
      const existingCount = stats.get(normalizedArea) || { 
        displayName: program.studyArea,
        count: 0,
        variants: new Set()
      };
      
      existingCount.count++;
      existingCount.variants.add(program.studyArea);
      stats.set(normalizedArea, existingCount);
    });

    // Convert to array and sort by count (descending) then name
    return Array.from(stats.entries())
      .map(([key, value]) => ({
        key,
        displayName: value.variants.size > 1 
          ? Array.from(value.variants)[0] // Use first variant as display name
          : value.displayName,
        count: value.count,
        variants: Array.from(value.variants)
      }))
      .sort((a, b) => {
        if (b.count !== a.count) return b.count - a.count;
        return a.displayName.localeCompare(b.displayName);
      });
  }, [filteredPrograms]);

  const handleChange = (event: any) => {
    try {
      const value = event.target.value;
      dispatch({
        type: 'SET_STUDY_AREA',
        payload: typeof value === 'string' ? value.split(',') : value
      });
    } catch (error) {
      console.error("Error in handleChange:", error);
    }
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
            {selected.map((value) => (
              <Chip 
                key={value} 
                label={`${value} (${studyAreaStats.find(area => 
                  area.variants.includes(value))?.count || 0})`} 
              />
            ))}
          </Box>
        )}
      >
        {studyAreaStats.map((area) => (
          <MenuItem 
            key={area.key} 
            value={area.displayName}
            sx={{
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <span>{area.displayName}</span>
            <span style={{ color: '#666', marginLeft: '8px' }}>({area.count})</span>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default StudyAreaFilter;
