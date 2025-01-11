import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { FilterState, Program } from '../types';
import { DUMMY_PROGRAMS } from '../assets/data';
import { updateFilterInteractions } from '../utils/tracking';

const STORAGE_KEY = 'filterState';

const getInitialState = (): FilterState => {
  const stored = sessionStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  return {
    programLevel: [],
    language: [],
    studyArea: [],
    province: [],
    searchQuery: '',
    areaOfStudy: [],
    results: [],
  };
};

type FilterAction =
  | { type: 'SET_PROGRAM_LEVEL'; payload: string[] }
  | { type: 'SET_LANGUAGE'; payload: string[] }
  | { type: 'SET_STUDY_AREA'; payload: string[] }
  | { type: 'SET_PROVINCE'; payload: string[] }
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
      newState = { ...state, province: action.payload };
      break;
    case 'SET_SEARCH_QUERY':
      newState = { ...state, searchQuery: action.payload };
      break;
    case 'SET_AREA_OF_STUDY':
      newState = { ...state, areaOfStudy: action.payload };
      break;
    case 'RESET_FILTERS':
      newState = getInitialState();
      break;
    default:
      return state;
  }

  // Store in sessionStorage
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
  return newState;
};

const FilterContext = createContext<{
  state: FilterState;
  dispatch: React.Dispatch<FilterAction>;
  filteredPrograms: Program[];
} | null>(null);

export const FilterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(filterReducer, getInitialState());

  const filteredPrograms = DUMMY_PROGRAMS.filter(program => {
    const matchesSearch = state.searchQuery
      ? program.programName.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
        program.university.toLowerCase().includes(state.searchQuery.toLowerCase())
      : true;

    const matchesProgramLevel = state.programLevel.length === 0 ||
      state.programLevel.includes(program.programLevel);

    const matchesLanguage = state.language.length === 0 ||
      state.language.includes(program.language);

    const matchesStudyArea = state.studyArea.length === 0 ||
      state.studyArea.includes(program.studyArea);

    const matchesProvince = state.province.length === 0 ||
      state.province.includes(program.province);

    return matchesSearch && matchesProgramLevel && matchesLanguage &&
           matchesStudyArea && matchesProvince;
  }).sort((a, b) => a.programName.localeCompare(b.programName));

  // Update window.filterInteractions whenever state changes
  useEffect(() => {
    updateFilterInteractions({
      ...state,
      results: filteredPrograms
    });
  }, [state, filteredPrograms]);

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