import React, { createContext, useContext, useReducer, useEffect } from 'react';
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
  | { type: 'SET_AREA_OF_STUDY'; payload: string[] }
  | { type: 'RESET_FILTERS' };

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
      newState = { ...state, province: [action.payload] };
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
    case 'SET_AREA_OF_STUDY':
      newState = { ...state, studyArea: action.payload };
      break;
    case 'RESET_FILTERS':
      newState = defaultState;
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
} | null>(null);

export const FilterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(filterReducer, getInitialState());
  const [isInitialRender, setIsInitialRender] = React.useState(true);

  const filteredPrograms = DUMMY_PROGRAMS.filter(program => {
    // Handle initial render case
    if (isInitialRender) {
      return !program.coop && !program.remote;
    }

    // Apply filters sequentially to ensure accurate counts
    let matches = true;

    // Search query filter
    if (state.searchQuery) {
      matches = matches && (
        program.programName.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
        program.university.toLowerCase().includes(state.searchQuery.toLowerCase())
      );
    }

    // Program level filter
    if (state.programLevel.length > 0) {
      matches = matches && state.programLevel.includes(program.programLevel);
    }

    // Language filter
    if (state.language.length > 0) {
      matches = matches && state.language.includes(program.language);
    }

    // Study area filter
    if (state.studyArea.length > 0) {
      matches = matches && state.studyArea.includes(program.studyArea);
    }

    // Province filter
    if (state.province.length > 0) {
      matches = matches && state.province.includes(program.province);
    }

    // University filter
    if (state.university.length > 0) {
      matches = matches && state.university.includes(program.university);
    }

    // Co-op and remote filter logic
    if (state.coop || state.remote) {
      matches = matches && (
        (state.coop && program.coop) ||
        (state.remote && program.remote)
      );
    }

    return matches;
  });

  useEffect(() => {
    // Update filterInteractions
    updateFilterInteractions({
      ...state,
      results: filteredPrograms
    });

    // After first render or any filter change, set isInitialRender to false
    if (isInitialRender) {
      setIsInitialRender(false);
    }
  }, [state, filteredPrograms, isInitialRender]);

  return (
    <FilterContext.Provider value={{ state, dispatch, filteredPrograms }}>
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
