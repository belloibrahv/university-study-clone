import React, { useState } from 'react';
import { Box, Checkbox, FormControlLabel, Popover, InputBase, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { useFilter } from '../context/FilterContext';
import { DUMMY_PROGRAMS } from '../assets/data';
import { FilterState, Program } from '../types';

const getFilterOptionsWithCount = (key: keyof typeof DUMMY_PROGRAMS[0], activeFilters: Partial<FilterState>) => {
  const counts: Record<string, number> = {};
  
  DUMMY_PROGRAMS.forEach(program => {
    // Check if the program matches all current active filters
    const matchesFilters = Object.entries(activeFilters).every(([filterKey, filterValue]) => {
      // Skip if no filter value or empty array
      if (!filterValue || (Array.isArray(filterValue) && filterValue.length === 0)) return true;
      
      // For boolean filters (coop, remote)
      if (typeof filterValue === 'boolean') {
        return program[filterKey as keyof Program] === filterValue;
      }
      
      // For array filters (programLevel, language, studyArea)
      if (Array.isArray(filterValue)) {
        return filterValue.includes(program[filterKey as keyof Program]);
      }
      
      // For string filters (province, university, searchQuery)
      if (typeof filterValue === 'string') {
        if (filterKey === 'searchQuery') {
          return program.programName.toLowerCase().includes(filterValue.toLowerCase()) ||
                 program.university.toLowerCase().includes(filterValue.toLowerCase());
        }
        return program[filterKey as keyof Program] === filterValue;
      }
      
      return true;
    });

    if (matchesFilters) {
      const value = program[key];
      if (typeof value === 'string') {
        counts[value] = (counts[value] || 0) + 1;
      }
    }
  });

  return Object.entries(counts)
    .map(([value, count]) => ({
      value,
      label: value,
      count
    }))
    .sort((a, b) => a.label.localeCompare(b.label));
};

const FilterContainer = styled(Box)({
  display: 'flex',
  gap: '12px',
  marginBottom: '32px',
  alignItems: 'center',
  flexWrap: 'wrap',
  width: '100%'
});

const ApplyButton = styled(Button)(({ theme }) => ({
  width: '100%',
  marginTop: theme.spacing(2),
  backgroundColor: '#DC3545',
  color: 'white',
  '&:hover': {
    backgroundColor: '#C82333',
  },
}));

interface StyledFilterButtonProps {
  active: number;
}

const FilterButton = styled(Box)<StyledFilterButtonProps>(({ active }) => ({
  height: '44px',
  padding: '0 16px',
  borderRadius: '4px',
  border: '1px solid #E0E0E0',
  backgroundColor: active ? '#FFF5F5' : '#FFF',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  minWidth: '140px',
  position: 'relative',
  '&:hover': {
    borderColor: '#999',
  },
  '& .count': {
    position: 'absolute',
    top: '-8px',
    right: '-8px',
    background: '#DC3545',
    color: 'white',
    borderRadius: '50%',
    width: '24px',
    height: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
  }
}));

const SearchBox = styled(Box)({
  flex: 1,
  minWidth: '200px',
  height: '44px',
  border: '1px solid #E0E0E0',
  borderRadius: '4px',
  display: 'flex',
  alignItems: 'center',
  padding: '0 12px',
  backgroundColor: '#FFF',
  '&:hover': {
    borderColor: '#999',
  },
});

const ResetButton = styled(Box)({
  height: '44px',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  padding: '0 16px',
  backgroundColor: '#FFF5F5',
  color: '#DC3545',
  borderRadius: '4px',
  cursor: 'pointer',
  border: '1px solid transparent',
  '&:hover': {
    backgroundColor: '#FFE9E9',
  },
});

const FilterPopover = styled(Popover)({
  '& .MuiPaper-root': {
    width: '320px',
    marginTop: '4px',
    padding: '16px',
    minWidth: '300px',
    maxHeight: '400px',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
  },
});

const PopoverSearch = styled(Box)({
  marginBottom: '16px',
  border: '1px solid #E0E0E0',
  borderRadius: '4px',
  padding: '8px 12px',
  display: 'flex',
  alignItems: 'center',
  backgroundColor: '#F8F9FA',
});

const CheckboxGroup = styled(Box)({
  maxHeight: '280px',
  overflowY: 'auto',
  '& .MuiFormControlLabel-root': {
    margin: '4px 0',
    width: '100%',
  },
  '& .MuiFormControlLabel-label': {
    fontSize: '14px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  '& .MuiCheckbox-root': {
    padding: '6px',
  },
  '&::-webkit-scrollbar': {
    width: '6px',
  },
  '&::-webkit-scrollbar-track': {
    background: '#f1f1f1',
  },
  '&::-webkit-scrollbar-thumb': {
    background: '#888',
    borderRadius: '3px',
  },
});

export const SearchFilters = () => {
  const { state, dispatch } = useFilter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [filterSearch, setFilterSearch] = useState('');
  const [selectedOptions, setSelectedOptions] = useState<{
    programLevel: string[];
    language: string[];
    studyArea: string[];
  }>({
    programLevel: [],
    language: [],
    studyArea: [],
  });
  const [appliedFilters, setAppliedFilters] = useState<{
    programLevel: boolean;
    language: boolean;
    studyArea: boolean;
  }>({
    programLevel: false,
    language: false,
    studyArea: false,
  });

  const getFilterOptions = (filter: string) => {
    const activeFilters: Partial<FilterState> = {
      programLevel: state.programLevel,
      language: state.language,
      studyArea: state.studyArea,
      province: state.province?.[0],
      university: state.university?.[0],
      coop: state.coop,
      remote: state.remote,
      searchQuery: state.searchQuery
    };
  
    const otherFilters = { ...activeFilters };
    delete otherFilters[filter as keyof typeof otherFilters];
  
    const options = getFilterOptionsWithCount(filter as keyof typeof DUMMY_PROGRAMS[0], otherFilters);
    
    // Filter out options based on applied filters
    if (appliedFilters[filter as keyof typeof appliedFilters]) {
      return options.filter(option => 
        selectedOptions[filter as keyof typeof selectedOptions].includes(option.value)
      );
    }
    
    return options;
  };

  const handleFilterClick = (event: React.MouseEvent<HTMLElement>, filter: string) => {
    setAnchorEl(event.currentTarget);
    setActiveFilter(filter);
    setFilterSearch('');
    
    // Initialize selected options for this filter if not already set
    setSelectedOptions(prev => ({
      ...prev,
      [filter]: getSelectedValues(filter)
    }));
  };

  const handleClose = () => {
    // Forcefully remove focus from any element inside the popover
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  
    // Move focus back to the button that opened the popover
    if (anchorEl) {
      anchorEl.focus();
    } else {
      document.body.focus(); // Fallback if anchorEl is null
    }
  
    // Close the popover
    setAnchorEl(null);
    setActiveFilter(null);
  };
  
  

  const getSelectedValues = (filter: string): string[] => {
    switch (filter) {
      case 'programLevel':
        return state.programLevel;
      case 'language':
        return state.language;
      case 'studyArea':
        return state.studyArea;
      default:
        return [];
    }
  };
 
  //   if (!activeFilter) return;
    
  //   setTempSelectedValues(prev => 
  //     prev.includes(value)
  //       ? prev.filter(v => v !== value)
  //       : [...prev, value]
  //   );
  // };

  const handleApplyFilter = () => {
    if (!activeFilter) return;
    
    // Update the applied filters state
    setAppliedFilters(prev => ({
      ...prev,
      [activeFilter]: true
    }));
    
    // Dispatch the selected options to the global state
    switch (activeFilter) {
      case 'programLevel':
        dispatch({ type: 'SET_PROGRAM_LEVEL', payload: selectedOptions.programLevel });
        break;
      case 'language':
        dispatch({ type: 'SET_LANGUAGE', payload: selectedOptions.language });
        break;
      case 'studyArea':
        dispatch({ type: 'SET_STUDY_AREA', payload: selectedOptions.studyArea });
        break;
    }
    
    handleClose();
  };

  const handleOptionToggle = (value: string) => {
    if (!activeFilter) return;
    
    setSelectedOptions(prev => {
      const currentValues = prev[activeFilter as keyof typeof prev];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
        
      return {
        ...prev,
        [activeFilter]: newValues
      };
    });
  };

  const handleReset = () => {
    dispatch({ type: 'RESET_FILTERS' });
    setAppliedFilters({
      programLevel: false,
      language: false,
      studyArea: false,
    });
    setSelectedOptions({
      programLevel: [],
      language: [],
      studyArea: [],
    });
    handleClose();
  };

  const filteredOptions = activeFilter
    ? getFilterOptions(activeFilter).filter(option =>
        option.label.toLowerCase().includes(filterSearch.toLowerCase())
      )
    : [];

  const hasActiveFilters =
    state.programLevel.length > 0 ||
    state.language.length > 0 ||
    state.studyArea.length > 0 ||
    state.searchQuery.length > 0 ||
    state.province.length > 0 ||
    state.university.length > 0 ||
    state.coop ||
    state.remote;

  const filterButtons = [
    { key: 'programLevel', label: 'Program Level' },
    { key: 'language', label: 'Language' },
    { key: 'studyArea', label: 'Area of Study' }
  ];
  
  return (
    <FilterContainer>
     {filterButtons.map(({ key, label }) => {
        const selectedCount = getSelectedValues(key).length;
        return (
          <FilterButton
            key={key}
            onClick={(e) => handleFilterClick(e, key)}
            active={selectedCount > 0 ? 1 : 0}
          >
            {label}
            {selectedCount > 0 && <span className="count">{selectedCount}</span>}
            <ExpandMoreIcon />
          </FilterButton>
        );
      })}
      
      <SearchBox>
        <SearchIcon sx={{ color: '#666', mr: 1 }} />
        <InputBase
          fullWidth
          placeholder="Search..."
          value={state.searchQuery}
          onChange={(e) => dispatch({ type: 'SET_SEARCH_QUERY', payload: e.target.value })}
        />
      </SearchBox>

      {hasActiveFilters && (
        <ResetButton onClick={handleReset}>
          <RestartAltIcon />
          Reset All
        </ResetButton>
      )}

      <FilterPopover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        disableAutoFocus // Prevents autofocus on the popover when opening
        disableEnforceFocus // Prevents MUI from trapping focus inside
        disableRestoreFocus // Prevents MUI from restoring focus on close
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <PopoverSearch>
          <SearchIcon sx={{ color: '#666', mr: 1 }} />
          <InputBase
            fullWidth
            placeholder="Search options..."
            value={filterSearch}
            onChange={(e) => setFilterSearch(e.target.value)}
          />
        </PopoverSearch>
        
        <CheckboxGroup>
          {filteredOptions.map((option) => (
            <FormControlLabel
              key={option.value}
              control={
                <Checkbox
                  checked={selectedOptions[activeFilter as keyof typeof selectedOptions]?.includes(option.value)}
                  onChange={() => handleOptionToggle(option.value)}
                />
              }
              label={
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                  <span>{option.label}</span> &nbsp; <span>({option.count})</span>
                </Box>
              }
            />
          ))}
        </CheckboxGroup>

          <ApplyButton
            variant="contained"
            onClick={handleApplyFilter}
            sx={{ width: "fit-content", background: 'linear-gradient(180deg,#535353,#111 66.66%,#000)', color: '#fff' }}
          >
            Apply Now
          </ApplyButton>
      </FilterPopover>
    </FilterContainer>
  );
};
  