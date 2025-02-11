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
  | { type: 'CLEAR_PROVINCE' };

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
      newState = { ...state, studyArea: action.payload };
      break;
    case 'SET_PROVINCE':
      // Reset other filters when province changes
      newState = {
        ...defaultState,
        searchQuery: state.searchQuery,
        province: [action.payload],
        selectedProvince: action.payload
      };
      break;
    case 'CLEAR_PROVINCE':
      newState = {
        ...state,
        province: [],
        selectedProvince: null,
        university: [], // Clear university selection when province is cleared
        coop: false,   // Reset coop filter
        remote: false  // Reset remote filter
      };
      break;
    case 'SET_UNIVERSITY':
      newState = { ...state, university: [action.payload] };
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
      newState = { ...defaultState, searchQuery: state.searchQuery };
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

export const FilterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(filterReducer, getInitialState());

  const { filteredPrograms, filterCounts, availableFilters } = useMemo(() => {
    // First, filter by province
    const provinceFilteredPrograms = DUMMY_PROGRAMS.filter(program => {
      if (state.selectedProvince) {
        return program.province === state.selectedProvince;
      }
      return true;
    });

    // Then apply coop and remote filters before calculating available options
    let intermediatePrograms = provinceFilteredPrograms;
    if (state.coop) {
      intermediatePrograms = intermediatePrograms.filter(p => p.coop);
    }
    if (state.remote) {
      intermediatePrograms = intermediatePrograms.filter(p => p.remote);
    }

    // Calculate available filters based on intermediate filtered programs
    const availableFilters = {
      universities: [...new Set(intermediatePrograms.map(p => p.university))].sort(),
      programLevels: [...new Set(intermediatePrograms.map(p => p.programLevel))].sort(),
      languages: [...new Set(intermediatePrograms.map(p => p.language))].sort(),
      provinces: [...new Set(DUMMY_PROGRAMS.map(p => p.province))].sort(),
      hasCoopPrograms: intermediatePrograms.some(p => p.coop),
      hasRemotePrograms: intermediatePrograms.some(p => p.remote)
    };

    // Apply remaining filters
    const finalFilteredPrograms = intermediatePrograms.filter(program => {
      let matches = true;

      if (state.searchQuery) {
        const searchLower = state.searchQuery.toLowerCase();
        matches = matches && (
          program.programName.toLowerCase().includes(searchLower) ||
          program.university.toLowerCase().includes(searchLower)
        );
      }

      if (state.programLevel.length > 0) {
        matches = matches && state.programLevel.includes(program.programLevel);
      }
      if (state.language.length > 0) {
        matches = matches && state.language.includes(program.language);
      }
      if (state.university.length > 0) {
        matches = matches && state.university.includes(program.university);
      }

      return matches;
    });

    // Calculate counts based on intermediate filtered programs
    const filterCounts = {
      programLevel: {},
      language: {},
      studyArea: {},
      province: {},
      university: {}
    };

    intermediatePrograms.forEach(program => {
      filterCounts.programLevel[program.programLevel] = 
        (filterCounts.programLevel[program.programLevel] || 0) + 1;
      filterCounts.language[program.language] = 
        (filterCounts.language[program.language] || 0) + 1;
      filterCounts.university[program.university] = 
        (filterCounts.university[program.university] || 0) + 1;
      filterCounts.province[program.province] = 
        (filterCounts.province[program.province] || 0) + 1;
    });

    return {
      filteredPrograms: finalFilteredPrograms,
      filterCounts,
      availableFilters
    };
  }, [state]);

  useEffect(() => {
    updateFilterInteractions({
      ...state,
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