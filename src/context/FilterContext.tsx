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

  const { filteredPrograms, filterCounts } = useMemo(() => {
    // Apply filters step by step to calculate accurate counts
    const basePrograms = DUMMY_PROGRAMS.filter(program => {
      // Base filter for search query
      let matches = !state.searchQuery || 
        program.programName.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
        program.university.toLowerCase().includes(state.searchQuery.toLowerCase());

      // Apply province filter if selected
      if (state.province.length > 0) {
        matches = matches && state.province.includes(program.province);
      }

      // Apply university filter if selected
      if (state.university.length > 0) {
        matches = matches && state.university.includes(program.university);
      }

      return matches;
    });

    // Calculate initial counts for each filter dimension
    const initialCounts: {
      programLevel: { [key: string]: number };
      language: { [key: string]: number };
      studyArea: { [key: string]: number };
      province: { [key: string]: number };
      university: { [key: string]: number };
    } = {
      programLevel: {},
      language: {},
      studyArea: {},
      province: {},
      university: {}
    };

    basePrograms.forEach(program => {
      // Count program levels
      if (state.programLevel.length === 0 || state.programLevel.includes(program.programLevel)) {
        initialCounts.programLevel[program.programLevel] = 
          (initialCounts.programLevel[program.programLevel] || 0) + 1;
      }

      // Count languages
      if (state.language.length === 0 || state.language.includes(program.language)) {
        initialCounts.language[program.language] = 
          (initialCounts.language[program.language] || 0) + 1;
      }

      // Count study areas
      if (state.studyArea.length === 0 || state.studyArea.includes(program.studyArea)) {
        initialCounts.studyArea[program.studyArea] = 
          (initialCounts.studyArea[program.studyArea] || 0) + 1;
      }

      // Count provinces
      initialCounts.province[program.province] = 
        (initialCounts.province[program.province] || 0) + 1;

      // Count universities
      initialCounts.university[program.university] = 
        (initialCounts.university[program.university] || 0) + 1;
    });

    // Final filtering with all constraints
    const finalFilteredPrograms = basePrograms.filter(program => {
      // Apply remaining filters
      let matches = true;

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

      // Coop and remote filters
      matches = matches && 
        (state.coop === false || program.coop === state.coop) &&
        (state.remote === false || program.remote === state.remote);

      return matches;
    });

    return { 
      filteredPrograms: finalFilteredPrograms, 
      filterCounts: initialCounts 
    };
  }, [state]);

  useEffect(() => {
    // Update filterInteractions with the current state and filtered results
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
      filterCounts 
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