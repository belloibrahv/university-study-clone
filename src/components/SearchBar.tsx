import React from 'react';
import { Paper, InputBase, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useFilter } from '../context/FilterContext';

export const SearchBar: React.FC = () => {
  const { state, dispatch } = useFilter();

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SET_SEARCH_QUERY', payload: event.target.value });
  };

  return (
    <Paper
      component="form"
      sx={{
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        maxWidth: 400,
        mb: 3
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search programs..."
        value={state.searchQuery}
        onChange={handleSearch}
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};
