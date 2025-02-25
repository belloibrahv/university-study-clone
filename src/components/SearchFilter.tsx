import React, { useState, useEffect } from 'react';
import { Box, Checkbox, FormControlLabel, Popover, InputBase, Button, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { useFilter } from '../context/FilterContext';
import { DUMMY_PROGRAMS } from '../assets/data';
import { FilterState, Program } from '../types';
import { ArrowDropDown as ArrowDropDownIcon } from '@mui/icons-material';
import ClickAwayListener from '@mui/material/ClickAwayListener';

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
  height: '45px',
  padding: '8px 16px',
  borderRadius: '5px',
  border: '1px solid #ddd',
  background: active ? 'linear-gradient(180deg,#ed6f33 0,#ca2c3d)' : '#fff',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  fontSize: '16px',
  fontWeight: 700,
  color: active ? '#fff' : '#1A202C',
  minWidth: '140px',
  position: 'relative',
  '&:hover': {
    borderColor: '#CBD5E0',
    outline: '1px solid #ed6f33',
  },
  '& .counter': {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    background: active ? '#ffffff' : 'transparent',
    color: active ? '#ed6f33' : 'inherit',
    height: '24px',
    width: '24px',
    lineHeight: '1.4em',
    borderRadius: '50%',
    marginLeft: '4px',
    fontSize: '14px',
  }
}));

const SearchBox = styled(Box)({
  flex: 1,
  padding: '8px 16px',
  fontSize: '16px',
  color: '#1A202C',
  fontWeight: 700,
  maxWidth: '400px',
  height: '45px',
  border: '1px solid #ddd',
  borderRadius: '5px',
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

// Constants for filter options
const FILTER_TYPES = {
  PROGRAM_LEVEL: 'programLevel',
  LANGUAGE: 'language',
  STUDY_AREA: 'studyArea'
} as const;

// Helper function to parse and normalize study area values
const parseStudyArea = (text: string): string[] => {
  if (Array.isArray(text)) return text;
  
  // Split on commas while keeping specific phrases together
  const areas = [];
  let currentSegment = '';
  let inQuotes = false;
  
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    
    if (char === '"' || char === "'") {
      inQuotes = !inQuotes;
      currentSegment += char;
    } else if (char === ',' && !inQuotes) {
      // End of segment
      const trimmed = currentSegment.trim();
      if (trimmed) areas.push(trimmed);
      currentSegment = '';
    } else {
      currentSegment += char;
    }
  }
  
  // Add the last segment
  if (currentSegment.trim()) {
    areas.push(currentSegment.trim());
  }
  
  // Clean up each area
  return areas.map(area => {
    // Remove leading/trailing spaces and quotation marks
    return area.replace(/^["'\s]+|["'\s]+$/g, '');
  }).filter(area => area.length > 0);
};

// Format a single study area for display
const formatStudyArea = (text: string): string => {
  // Clean up the text - trim whitespace, remove extra spaces
  const cleaned = text.trim().replace(/\s+/g, ' ');
  
  // If it's short enough, return as is
  if (cleaned.length <= 50) return cleaned;
  
  // Truncate with ellipsis for longer texts
  return cleaned.substring(0, 47) + '...';
};

// Helper function to get filter options with counts, handling study area arrays
const getFilterOptionsWithCount = (
  key: keyof typeof DUMMY_PROGRAMS[0],
  activeFilters: Partial<FilterState>,
  searchQuery = ''
) => {
  const counts: Record<string, number> = {};
  
  DUMMY_PROGRAMS.forEach(program => {
    // Check if program matches all active filters
    const matchesFilters = Object.entries(activeFilters).every(([filterKey, filterValue]) => {
      if (!filterValue || (Array.isArray(filterValue) && filterValue.length === 0)) return true;
      
      if (typeof filterValue === 'boolean') {
        return program[filterKey as keyof Program] === filterValue;
      }
      
      if (Array.isArray(filterValue)) {
        if (filterKey === 'studyArea') {
          // Special handling for study area
          const programAreas = parseStudyArea(program.studyArea);
          return filterValue.some(value => 
            programAreas.some(area => 
              area.toLowerCase().includes(value.toLowerCase())
            )
          );
        } else {
          return filterValue.includes(program[filterKey as keyof Program]);
        }
      }
      
      if (filterKey === 'searchQuery') {
        return program.programName.toLowerCase().includes(filterValue.toLowerCase()) ||
               program.university.toLowerCase().includes(filterValue.toLowerCase());
      }
      
      return true;
    });
    
    if (matchesFilters) {
      if (key === FILTER_TYPES.STUDY_AREA) {
        // Process study area as array
        const studyAreas = parseStudyArea(program.studyArea);
        studyAreas.forEach(area => {
          counts[area] = (counts[area] || 0) + 1;
        });
      } else {
        const value = program[key];
        if (typeof value === 'string') {
          counts[value] = (counts[value] || 0) + 1;
        }
      }
    }
  });
  
  return Object.entries(counts)
    .map(([value, count]) => ({
      value,
      label: key === FILTER_TYPES.STUDY_AREA ? formatStudyArea(value) : value,
      count
    }))
    .filter(option => 
      !searchQuery || 
      option.value.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      // Sort by count for study areas, alphabetically for others
      if (key === FILTER_TYPES.STUDY_AREA) {
        return b.count - a.count;
      }
      return a.label.localeCompare(b.label);
    });
};

export const SearchFilters: React.FC = () => {
  const { state, dispatch } = useFilter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [filterSearch, setFilterSearch] = useState('');
  const [tempSelections, setTempSelections] = useState<{
    programLevel: string[];
    language: string[];
    studyArea: string[];
  }>({
    programLevel: [],
    language: [],
    studyArea: [],
  });

  // Debounced filter search for performance
  useEffect(() => {
    const timer = setTimeout(() => {
      if (activeFilter === FILTER_TYPES.STUDY_AREA && filterSearch) {
        // Update temporary selections based on search
        const matchingOptions = getFilterOptions(FILTER_TYPES.STUDY_AREA)
          .filter(option => 
            option.value.toLowerCase().includes(filterSearch.toLowerCase())
          )
          .map(option => option.value);
          
        // Keep already selected options
        const currentSelections = tempSelections.studyArea;
        setTempSelections(prev => ({
          ...prev,
          studyArea: [...new Set([...currentSelections, ...matchingOptions])]
        }));
      }
    }, 300);
    
    return () => clearTimeout(timer);
  }, [filterSearch]);

  const handleFilterClick = (event: React.MouseEvent<HTMLElement>, filter: string) => {
    setAnchorEl(event.currentTarget);
    setActiveFilter(filter);
    setFilterSearch('');

    setTempSelections(prev => ({
      ...prev,
      [filter]: getSelectedValues(filter)
    }));
  };

  const handleApplyFilters = () => {
    if (!activeFilter) return;
    
    switch (activeFilter) {
      case FILTER_TYPES.PROGRAM_LEVEL:
        dispatch({ type: 'SET_PROGRAM_LEVEL', payload: tempSelections.programLevel });
        break;
      case FILTER_TYPES.LANGUAGE:
        dispatch({ type: 'SET_LANGUAGE', payload: tempSelections.language });
        break;
      case FILTER_TYPES.STUDY_AREA:
        dispatch({ type: 'SET_STUDY_AREA', payload: tempSelections.studyArea });
        break;
    }
    
    handleClose();
  };

  const handleClickAway = () => {
    if (anchorEl) {
      handleApplyFilters();
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
    setActiveFilter(null);
    setFilterSearch('');
  };

  const handleOptionToggle = (value: string) => {
    if (!activeFilter) return;
    
    setTempSelections(prev => {
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

  const getSelectedValues = (filter: string): string[] => {
    if (anchorEl) {
      return tempSelections[filter as keyof typeof tempSelections] || [];
    }
    
    switch (filter) {
      case FILTER_TYPES.PROGRAM_LEVEL:
        return state.programLevel;
      case FILTER_TYPES.LANGUAGE:
        return state.language;
      case FILTER_TYPES.STUDY_AREA:
        return state.studyArea;
      default:
        return [];
    }
  };

  const getFilterOptions = (filter: string) => {
    // Create a copy of active filters, excluding the current filter
    const activeFilters: Partial<FilterState> = {
      programLevel: state.programLevel,
      language: state.language,
      studyArea: state.studyArea,
      province: state.province.length > 0 ? state.province[0] : undefined,
      university: state.university.length > 0 ? state.university[0] : undefined,
      coop: state.coop,
      remote: state.remote,
      searchQuery: state.searchQuery
    };
    
    // Remove the current filter to avoid circular filtering
    delete activeFilters[filter as keyof typeof activeFilters];
    
    // Get options with counts
    return getFilterOptionsWithCount(
      filter as keyof typeof DUMMY_PROGRAMS[0], 
      activeFilters, 
      filterSearch
    );
  };

  const handleReset = () => {
    dispatch({ type: 'RESET_FILTERS' });
    handleClose();
  };

  const hasActiveFilters =
    state.programLevel.length > 0 ||
    state.language.length > 0 ||
    state.studyArea.length > 0 ||
    state.searchQuery.length > 0 ||
    state.province.length > 0 ||
    state.university.length > 0 ||
    state.coop ||
    state.remote;

  // Enhanced filter feedback - visual feedback indication
  const getFilterLabel = (filter: string, count: number): JSX.Element => {
    return (
      <>
        {filter}
        {count > 0 && (
          <span className="counter">{count}</span>
        )}
        <ArrowDropDownIcon />
      </>
    );
  };

  
  return (
    <FilterContainer>
      <ClickAwayListener onClickAway={handleClickAway}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <FilterButton
            onClick={(e) => handleFilterClick(e, FILTER_TYPES.PROGRAM_LEVEL)}
            active={state.programLevel.length > 0 ? 1 : 0}
            aria-label="Program Level Filter"
            aria-haspopup="true"
            aria-expanded={Boolean(anchorEl) && activeFilter === FILTER_TYPES.PROGRAM_LEVEL}
          >
            {getFilterLabel('Program Level', state.programLevel.length)}
          </FilterButton>
          
          <FilterButton
            onClick={(e) => handleFilterClick(e, FILTER_TYPES.LANGUAGE)}
            active={state.language.length > 0 ? 1 : 0}
            aria-label="Language Filter"
            aria-haspopup="true"
            aria-expanded={Boolean(anchorEl) && activeFilter === FILTER_TYPES.LANGUAGE}
          >
            {getFilterLabel('Language', state.language.length)}
          </FilterButton>
          
          <FilterButton
            onClick={(e) => handleFilterClick(e, FILTER_TYPES.STUDY_AREA)}
            active={state.studyArea.length > 0 ? 1 : 0}
            aria-label="Area of Study Filter"
            aria-haspopup="true"
            aria-expanded={Boolean(anchorEl) && activeFilter === FILTER_TYPES.STUDY_AREA}
          >
            {getFilterLabel('Area of Study', state.studyArea.length)}
          </FilterButton>
          
          <FilterPopover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={handleApplyFilters}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            // Important: Add these props to fix the aria-hidden issue
            keepMounted
            disablePortal={false}
            disableEnforceFocus={false}
            disableAutoFocus={false}
            disableRestoreFocus={false}
            // Add an ID to connect the popover with the button for accessibility
            id={activeFilter ? `${activeFilter}-popover` : undefined}
            aria-labelledby={activeFilter ? `${activeFilter}-button` : undefined}
          >
            {activeFilter === FILTER_TYPES.STUDY_AREA && (
              <PopoverSearch>
                <InputBase
                  placeholder="Search area of study..."
                  value={filterSearch}
                  onChange={(e) => setFilterSearch(e.target.value)}
                  aria-label="Search area of study"
                />
                <SearchIcon />
              </PopoverSearch>
            )}
            
            <CheckboxGroup>
              {getFilterOptions(activeFilter || '').map((option) => (
                <FormControlLabel
                  key={option.value}
                  control={
                    <Checkbox
                      checked={getSelectedValues(activeFilter || '').includes(option.value)}
                      onChange={() => handleOptionToggle(option.value)}
                    />
                  }
                  label={`${option.label} (${option.count})`}
                />
              ))}
            </CheckboxGroup>
            
            <ApplyButton 
              onClick={handleApplyFilters}
              variant="contained"
            >
              Apply now
            </ApplyButton>
          </FilterPopover>
        </Box>
      </ClickAwayListener>
      
      {/* Rest of your component remains unchanged */}
      <SearchBox>
        <InputBase
          placeholder="Search..."
          value={state.searchQuery}
          onChange={(e) => dispatch({ type: 'SET_SEARCH_QUERY', payload: e.target.value })}
          aria-label="Search programs"
        />
        <SearchIcon />
      </SearchBox>
      
      {hasActiveFilters && (
        <>
          <Divider orientation="vertical" variant="middle" flexItem sx={{ height: '45px' }} />
          <Box
            onClick={handleReset}
            sx={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              padding: '8px 16px',
              height: '45px',
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
            aria-label="Reset all filters"
          >
            <RestartAltIcon sx={{ fontSize: '21px', fontWeight: 700 }} />
            Reset All
          </Box>
        </>
      )}
    </FilterContainer> 
  );
};

export default SearchFilters;