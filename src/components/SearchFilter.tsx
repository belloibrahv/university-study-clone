import React, { useState } from 'react';
import { Box, Checkbox, FormControlLabel, Popover, InputBase, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { useFilter } from '../context/FilterContext';
import { DUMMY_PROGRAMS } from '../assets/data';
import { FilterState, Program } from '../types';
import { ArrowDropDown as ArrowDropDownIcon } from '@mui/icons-material';

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
  alignItems: 'center',
  width: '100%',
  padding: '20px 0 20px 44px',
  borderBottom: '1px solid #d6dadc',
  marginBottom: '40px',
  '& > *': {
    marginRight: '12px'
  }
});

const FilterButton = styled(Box)<{ active: number }>(({ active }) => ({
  height: '40px',
  padding: '24px 16px',
  borderRadius: '8px',
  border: '1px solid #ddd',
  backgroundColor: '#fff',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  fontSize: '16px',
  color: '#1A202C',
  fontWeight: 700,
  minWidth: '140px',
  '&:hover': {
    borderColor: '#CBD5E0',
    outline: '1px solid #ed6f33',
  },
  '&.active': {
    backgroundColor: 'linear-gradient(180deg,#ed6f33 0,#ca2c3d)'
  },
  '&.focus': {
    backgroundColor: 'linear-gradient(180deg,#ed6f33 0,#ca2c3d)'
  },
  '& .MuiSvgIcon-root': {
    fontSize: '20px',
    marginLeft: 'auto'
  }
}));

const SearchBox = styled(Box)({
  flex: 1,
  padding: '24px 16px',
  fontSize: '16px',
  color: '#1A202C',
  fontWeight: 700,
  maxWidth: '400px',
  height: '40px',
  border: '1px solid #ddd',
  borderRadius: '8px',
  display: 'flex',
  alignItems: 'center',
  backgroundColor: '#fff',
  position: 'relative',
  '&:hover': {
    borderColor: '#CBD5E0',
    outline: '1px solid #ed6f33',
  },
  '& .MuiInputBase-root': {
    width: '100%',
  },
  '& .MuiSvgIcon-root': {
    position: 'absolute',
    right: '16px',
    color: '#718096',
    fontSize: '20px'
  }
});

const FilterPopover = styled(Popover)({
  '& .MuiPaper-root': {
    width: '320px',
    marginTop: '8px',
    padding: '16px',
    boxShadow: '0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06)',
    borderRadius: '8px'
  }
});

const CheckboxGroup = styled(Box)({
  borderBottom: '1px solid #CBD5E0',
  paddingBottom: '16px',
  maxHeight: '280px',
  overflowY: 'auto',
  marginTop: '16px',
  '& .MuiFormControlLabel-root': {
    margin: '4px 0',
    width: '100%',
  }
});

const ApplyButton = styled(Button)({
  fontSize: '17px',
  fontWeight: '700',
  marginTop: '16px',
  padding: '8px 16px',
  background: 'linear-gradient(rgb(83, 83, 83), rgb(17, 17, 17) 66.66%, rgb(0, 0, 0))',
  border: '1px solid #ccc',
  boxShadow: 'rgba(0, 0, 0, 0.1) 0px 22px 24px -12px',
  color: 'rgb(255, 255, 255)',
  borderRadius: '8px',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: '#1A202C',
  }
});

const PopoverSearch = styled(Box)({
  margin: '0 0 8px',
  position: 'relative',
  '& .MuiInputBase-root': {
    width: '100%',
    padding: '8px 12px',
    paddingRight: '40px',
    border: '1px solid #e0e0e0',
    borderRadius: '4px',
    fontSize: '14px',
    '&:focus-within': {
      borderColor: '#666',
    }
  },
  '& .MuiSvgIcon-root': {
    position: 'absolute',
    right: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#666',
    fontSize: '20px'
  }
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
    
    let options = getFilterOptionsWithCount(filter as keyof typeof DUMMY_PROGRAMS[0], otherFilters);
    
    // Filter options based on search input
    if (filterSearch) {
      options = options.filter(option => 
        option.label.toLowerCase().includes(filterSearch.toLowerCase())
      );
    }

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
      {filterButtons.map(({ key, label }) => (
        <FilterButton
          key={key}
          onClick={(e) => handleFilterClick(e, key)}
          active={getSelectedValues(key).length > 0 ? 1 : 0}
        >
          {label}
          <ArrowDropDownIcon />
        </FilterButton>
      ))}

      <SearchBox>
        <InputBase
          placeholder="Search..."
          value={state.searchQuery}
          onChange={(e) => dispatch({ type: 'SET_SEARCH_QUERY', payload: e.target.value })}
        />
        <SearchIcon />
      </SearchBox>

      {hasActiveFilters && (
        <Box
          onClick={handleReset}
          sx={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            padding: '14px 16px',
            borderRadius: '8px',
            backgroundColor: 'rgb(254, 242, 236)',
            color: '#df0724',
            fontSize: '15px',
            fontWeight: 700,
            gap: '4px',
            '&:hover': {
              border: '1px solid #df0724',
            },
          }}
        >
          <RestartAltIcon sx={{ fontSize: '21px', fontWeight: 700 }} />
          Reset All
        </Box>
      )}

      <FilterPopover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <PopoverSearch>
          <InputBase
            placeholder={`Search ${activeFilter?.toLowerCase() || ''}...`}
            value={filterSearch}
            onChange={(e) => setFilterSearch(e.target.value)}
          />
          <SearchIcon />
        </PopoverSearch>

        <CheckboxGroup>
          {getFilterOptions(activeFilter || '').map((option) => (
            <FormControlLabel
              key={option.value}
              control={
                <Checkbox
                  checked={selectedOptions[activeFilter as keyof typeof selectedOptions]?.includes(option.value)}
                  onChange={() => handleOptionToggle(option.value)}
                />
              }
              label={`${option.label} (${option.count})`}
            />
          ))}
        </CheckboxGroup>

        <ApplyButton onClick={handleApplyFilter}>
          Apply now
        </ApplyButton>
      </FilterPopover>
    </FilterContainer>
  );
};
  