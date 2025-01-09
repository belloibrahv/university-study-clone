import React, { createContext, useContext, useReducer } from 'react';
import { FilterState, Program } from '../types';
import { DUMMY_PROGRAMS } from '../assets/data';


const initialState: FilterState = {
  programLevel: [],
  language: [],
  studyArea: [],
  province: [],
  searchQuery: '',
  areaOfStudy: [], 
  results: [],
};

type FilterAction =
  | { type: 'SET_PROGRAM_LEVEL'; payload: string[] }
  | { type: 'SET_LANGUAGE'; payload: string[] }
  | { type: 'SET_STUDY_AREA'; payload: string[] }
  | { type: 'SET_PROVINCE'; payload: string[] }
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'SET_COOP'; payload: boolean }
  | { type: 'SET_REMOTE'; payload: boolean }
  | { type: 'RESET_FILTERS' };

const filterReducer = (state: FilterState, action: FilterAction): FilterState => {
  switch (action.type) {
    case 'SET_PROGRAM_LEVEL':
      return { ...state, programLevel: action.payload };
    case 'SET_LANGUAGE':
      return { ...state, language: action.payload };
    case 'SET_STUDY_AREA':
      return { ...state, studyArea: action.payload };
    case 'SET_PROVINCE':
      return { ...state, province: action.payload };
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };
    case 'RESET_FILTERS':
      return initialState;
    default:
      return state;
  }
};

const FilterContext = createContext<{
  state: FilterState;
  dispatch: React.Dispatch<FilterAction>;
  filteredPrograms: Program[];
} | null>(null);

export const FilterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(filterReducer, initialState);

  const filteredPrograms = DUMMY_PROGRAMS.filter(program => {
    const matchesSearch = program.programName.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
      program.university.toLowerCase().includes(state.searchQuery.toLowerCase());

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
  });

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
