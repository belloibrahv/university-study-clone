import React, { createContext, useContext, useReducer, useEffect, useMemo } from 'react';
import { FilterState, Program } from '../types';
import { DUMMY_PROGRAMS } from '../assets/data';
import { updateFilterInteractions } from '../utils/tracking';

const STORAGE_KEY = 'filterState';

const defaultState: FilterState = {
  programLevel: [],
  language: [],
  studyArea: [],
  province: [],
  university: [],
  coop: false,
  remote: false,
  searchQuery: '',
  results: [],
  selectedProvince: null,
};

// Helper function to calculate counts based on filtered programs
const calculateCounts = (programs: Program[]) => {
  const counts = {
    programLevel: {} as Record<string, number>,
    language: {} as Record<string, number>,
    studyArea: {} as Record<string, number>,
    province: {} as Record<string, number>,
    university: {} as Record<string, number>,
  };

  programs.forEach(program => {
    // Add count for program level
    counts.programLevel[program.programLevel] = 
      (counts.programLevel[program.programLevel] || 0) + 1;
    
    // Add count for language
    counts.language[program.language] = 
      (counts.language[program.language] || 0) + 1;
    
    // Add count for each study area
    program.studyArea.forEach(area => {
      counts.studyArea[area] = (counts.studyArea[area] || 0) + 1;
    });
    
    // Add count for province
    counts.province[program.province] = 
      (counts.province[program.province] || 0) + 1;
    
    // Add count for university
    counts.university[program.university] = 
      (counts.university[program.university] || 0) + 1;
  });

  return counts;
};

// Helper function to filter programs based on current state
const filterPrograms = (programs: Program[], state: FilterState) => {
  return programs.filter(program => {
    // Search query filter
    if (state.searchQuery) {
      const searchLower = state.searchQuery.toLowerCase();
      const matchesSearch = 
        program.programName.toLowerCase().includes(searchLower) || 
        program.university.toLowerCase().includes(searchLower);
      if (!matchesSearch) return false;
    }
    
    // Program level filter
    if (state.programLevel.length > 0 && 
        !state.programLevel.includes(program.programLevel)) {
      return false;
    }
    
    // Language filter
    if (state.language.length > 0 && 
        !state.language.includes(program.language)) {
      return false;
    }
    
    // Study area filter - at least one selected study area must match
    if (state.studyArea.length > 0) {
      const hasMatchingArea = state.studyArea.some(selectedArea =>
        program.studyArea.some(programArea =>
          programArea.trim().toLowerCase() === 
          selectedArea.trim().toLowerCase()
        )
      );
      if (!hasMatchingArea) return false;
    }
    
    // Province filter
    if (state.province.length > 0 && 
        !state.province.includes(program.province)) {
      return false;
    }
    
    // University filter
    if (state.university.length > 0 && 
        !state.university.includes(program.university)) {
      return false;
    }
    
    // Co-op filter
    if (state.coop && !program.coop) {
      return false;
    }
    
    // Remote learning filter
    if (state.remote && !program.remote) {
      return false;
    }
    
    return true;
  });
};

const getInitialState = (): FilterState => {
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) {
      return { ...defaultState, ...JSON.parse(stored) };
    }
  } catch (error) {
    console.error('Error reading from sessionStorage:', error);
  }
  return defaultState;
};

type FilterAction =
  | { type: 'SET_PROGRAM_LEVEL'; payload: string[] }
  | { type: 'SET_LANGUAGE'; payload: string[] }
  | { type: 'SET_STUDY_AREA'; payload: string[] }
  | { type: 'SET_PROVINCE'; payload: string }
  | { type: 'SET_UNIVERSITY'; payload: string }
  | { type: 'SET_COOP'; payload: boolean }
  | { type: 'SET_REMOTE_LEARNING'; payload: boolean }
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'RESET_FILTERS' }
  | { type: 'CLEAR_PROVINCE' }
  | { type: 'CLEAR_UNIVERSITY' };

const filterReducer = (state: FilterState, action: FilterAction): FilterState => {
  let newState: FilterState;
  
  switch (action.type) {
    case 'SET_PROGRAM_LEVEL':
      newState = { ...state, programLevel: action.payload };
      break;
    case 'SET_LANGUAGE':
      newState = { ...state, language: action.payload };
      break;
    case 'SET_STUDY_AREA':
      // Keep province and university selections when setting study area
      newState = { ...state, studyArea: action.payload };
      break;
    case 'SET_PROVINCE':
      // Only set province without affecting other filters
      newState = {
        ...state,
        province: [action.payload],
        selectedProvince: action.payload
      };
      break;
    case 'CLEAR_PROVINCE':
      newState = {
        ...state,
        province: [],
        selectedProvince: null
      };
      break;
    case 'SET_UNIVERSITY':
      newState = {
        ...state,
        university: [action.payload]
      };
      break;
    case 'CLEAR_UNIVERSITY':
      newState = {
        ...state,
        university: []
      };
      break;
    case 'SET_COOP':
      newState = { ...state, coop: action.payload };
      break;
    case 'SET_REMOTE_LEARNING':
      newState = { ...state, remote: action.payload };
      break;
    case 'SET_SEARCH_QUERY':
      newState = { ...state, searchQuery: action.payload };
      break;
    case 'RESET_FILTERS':
      // Fixed: Reset search query as well when resetting all filters
      newState = { ...defaultState };
      break;
    default:
      return state;
  }
  
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
  } catch (error) {
    console.error('Error saving to sessionStorage:', error);
  }
  
  return newState;
};

const FilterContext = createContext<{
  state: FilterState;
  dispatch: React.Dispatch<FilterAction>;
  filteredPrograms: Program[];
  availableFilters: {
    universities: string[];
    programLevels: string[];
    languages: string[];
    provinces: string[];
    studyAreas: string[]; // Added study areas
    hasCoopPrograms: boolean;
    hasRemotePrograms: boolean;
  };
  filterCounts: {
    programLevel: { [key: string]: number };
    language: { [key: string]: number };
    studyArea: { [key: string]: number };
    province: { [key: string]: number };
    university: { [key: string]: number };
  };
} | null>(null);

export const FilterProvider: React.FC<{ children: React.ReactNode }> = ({
  children 
}) => {
  const [state, dispatch] = useReducer(filterReducer, getInitialState());

  const { filteredPrograms, filterCounts, availableFilters } = useMemo(() => {
    // Helper function to get filtered programs excluding specific filters
    const getFilteredProgramsExcluding = (excludeFilters: (keyof FilterState)[]) => {
      const tempState = { ...state };
      excludeFilters.forEach(filter => {
        if (Array.isArray(tempState[filter])) {
          (tempState[filter] as any) = [];
        } else if (typeof tempState[filter] === 'boolean') {
          tempState[filter] = false;
        } else if (filter === 'searchQuery') {
          tempState[filter] = '';
        }
      });
      return filterPrograms(DUMMY_PROGRAMS, tempState);
    };

    // Get all filtered programs based on current state
    const allFilteredPrograms = filterPrograms(DUMMY_PROGRAMS, state);

    // Calculate available filters based on currently filtered programs
    const programLevels = [...new Set(
      allFilteredPrograms.map(p => p.programLevel)
    )].sort();

    const languages = [...new Set(
      allFilteredPrograms.map(p => p.language)
    )].sort();

    const studyAreas = [...new Set(
      allFilteredPrograms.flatMap(p => p.studyArea)
    )].sort();

    // Get available universities respecting province filter
    const universities = [...new Set(
      allFilteredPrograms
      .filter(program => {
        // If province is selected, only show universities in that province
        if (state.province.length > 0) {
          return state.province.includes(program.province);
        }
        return true;
      })
      .map(p => p.university)
    )].sort();

    // Get available provinces respecting university filter
    const provinces = [...new Set(
      allFilteredPrograms
      .filter(program => {
        // If university is selected, only show provinces with that university
        if (state.university.length > 0) {
          return state.university.includes(program.university);
        }
        return true;
      })
      .map(p => p.province)
    )].sort();

    // Build availableFilters object
    const availableFilters = {
      universities,
      provinces,
      programLevels,
      languages,
      studyAreas, // Added study areas
      hasCoopPrograms: allFilteredPrograms.some(p => p.coop),
      hasRemotePrograms: allFilteredPrograms.some(p => p.remote)
    };

    // Calculate counts based on the filtered programs
    const filterCounts = calculateCounts(allFilteredPrograms);

    return {
      filteredPrograms: allFilteredPrograms,
      filterCounts,
      availableFilters
    };
  }, [state]);

  useEffect(() => {
    // Create a filtered state object without selectedProvince for tracking
    const { selectedProvince, ...trackingState } = state;
    updateFilterInteractions({
      ...trackingState,
      results: filteredPrograms
    });
  }, [state, filteredPrograms]);

  return (
    <FilterContext.Provider value={{
      state,
      dispatch,
      filteredPrograms,
      filterCounts,
      availableFilters
    }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
};

export default FilterContext;