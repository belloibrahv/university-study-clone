import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { FilterState, Program } from '../types';
import { DUMMY_PROGRAMS } from '../assets/data';
import { updateFilterInteractions } from '../utils/tracking';

const STORAGE_KEY = 'filterState';

// Define default state with all properties initialized
const defaultState: FilterState = {
  programLevel: [],
  language: [],
  studyArea: [],
  province: [],
  university: [],
  coop: false,
  searchQuery: '',
  areaOfStudy: [],
  results: [],
};

const getInitialState = (): FilterState => {
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) {
      // Merge stored state with default state to ensure all properties exist
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
  | { type: 'SET_PROVINCE'; payload: string[] }
  | { type: 'SET_UNIVERSITY'; payload: string[] }
  | { type: 'SET_COOP'; payload: boolean }
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
    case 'SET_UNIVERSITY':
      newState = { ...state, university: action.payload };
      break;
    case 'SET_COOP':
      newState = { ...state, coop: action.payload };
      break;
    case 'SET_SEARCH_QUERY':
      newState = { ...state, searchQuery: action.payload };
      break;
    case 'SET_AREA_OF_STUDY':
      newState = { ...state, areaOfStudy: action.payload };
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

  const filteredPrograms = DUMMY_PROGRAMS.filter(program => {
    // Safe access to state properties with fallbacks
    const searchQuery = state.searchQuery || '';
    const programLevel = state.programLevel || [];
    const language = state.language || [];
    const studyArea = state.studyArea || [];
    const province = state.province || [];
    const university = state.university || [];
    const coop = state.coop ?? false;

    const matchesSearch = !searchQuery || 
      program.programName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      program.university.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesProgramLevel = programLevel.length === 0 ||
      programLevel.includes(program.programLevel);

    const matchesLanguage = language.length === 0 ||
      language.includes(program.language);

    const matchesStudyArea = studyArea.length === 0 ||
      studyArea.includes(program.studyArea);

    const matchesProvince = province.length === 0 ||
      province.includes(program.province);

    const matchesUniversity = university.length === 0 ||
      university.includes(program.university);

    const matchesCoop = !coop || program.coop === true;

    return matchesSearch && matchesProgramLevel && matchesLanguage &&
           matchesStudyArea && matchesProvince && matchesUniversity && matchesCoop;
  }).sort((a, b) => a.programName.localeCompare(b.programName));

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