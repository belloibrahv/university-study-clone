import React from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem, Chip, OutlinedInput } from '@mui/material';
import { useFilter } from '../context/FilterContext';

const PROGRAM_LEVELS = ['Certificate', 'Diploma', 'Bachelor', 'Master', 'Doctorate'];
const LANGUAGES = ['English', 'French', 'Bilingual'];
const AREAS_OF_STUDY = [
  'Business', 'Engineering', 'Arts', 'Science', 'Medicine', 
  'Education', 'Law', 'Technology', 'Social Sciences'
];

export const AdditionalFilters: React.FC = () => {
  const { state, dispatch } = useFilter();

  return (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 3 }}>
      <FormControl sx={{ minWidth: 200 }}>
        <InputLabel>Program Level</InputLabel>
        <Select
          multiple
          value={state.programLevel}
          onChange={(e) => dispatch({ 
            type: 'SET_PROGRAM_LEVEL', 
            payload: typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value 
          })}
          input={<OutlinedInput label="Program Level" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
        >
          {PROGRAM_LEVELS.map((level) => (
            <MenuItem key={level} value={level}>
              {level}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ minWidth: 200 }}>
        <InputLabel>Language</InputLabel>
        <Select
          multiple
          value={state.language}
          onChange={(e) => dispatch({
            type: 'SET_LANGUAGE',
            payload: typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value
          })}
          input={<OutlinedInput label="Language" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
        >
          {LANGUAGES.map((language) => (
            <MenuItem key={language} value={language}>
              {language}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ minWidth: 200 }}>
        <InputLabel>Area of Study</InputLabel>
        <Select
          multiple
          value={state.studyArea}
          onChange={(e) => dispatch({
            type: 'SET_AREA_OF_STUDY',
            payload: typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value
          })}
          input={<OutlinedInput label="Area of Study" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
        >
          {AREAS_OF_STUDY.map((area) => (
            <MenuItem key={area} value={area}>
              {area}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
