import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { FilterState } from '../types';

const initialState: FilterState = {
  programLevel: [],
  language: [],
  areaOfStudy: [],
  province: [],
  searchQuery: ''
};

type FilterAction = 
  | { type: 'SET_PROGRAM_LEVEL'; payload: string[] }
  | { type: 'SET_LANGUAGE'; payload: string[] }
  | { type: 'SET_AREA_OF_STUDY'; payload: string[] }
  | { type: 'SET_PROVINCE'; payload: string[] }
  | { type: 'SET_SEARCH_QUERY'; payload: string };

const filterReducer = (state: FilterState, action: FilterAction): FilterState => {
  const newState = { ...state };
  
  switch (action.type) {
    case 'SET_PROGRAM_LEVEL':
      newState.programLevel = action.payload;
      break;
    case 'SET_LANGUAGE':
      newState.language = action.payload;
      break;
    case 'SET_AREA_OF_STUDY':
      newState.areaOfStudy = action.payload;
      break;
    case 'SET_PROVINCE':
      newState.province = action.payload;
      break;
    case 'SET_SEARCH_QUERY':
      newState.searchQuery = action.payload;
      break;
  }

  // Update window.filterInteractions
  if (typeof window !== 'undefined') {
    (window as any).filterInteractions = {
      filters: {
        programLevel: newState.programLevel,
        language: newState.language,
        areaOfStudy: newState.areaOfStudy,
        province: newState.province,
        searchQuery: newState.searchQuery
      }
    };
  }

  return newState;
};

const FilterContext = createContext<{
  state: FilterState;
  dispatch: React.Dispatch<FilterAction>;
} | undefined>(undefined);

export const FilterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(filterReducer, initialState);

  // Initialize window.filterInteractions on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).filterInteractions = {
        filters: {
          programLevel: [],
          language: [],
          areaOfStudy: [],
          province: [],
          searchQuery: ''
        }
      };
    }
  }, []);

  return (
    <FilterContext.Provider value={{ state, dispatch }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
};

export default FilterContext;
