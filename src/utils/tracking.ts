import { FilterState } from "../types";

declare global {
  interface Window {
    filterInteractions: Partial<FilterState> & { results: any[] };
  }
}

// Initialize window.filterInteractions
const initializeFilterInteractions = () => {
  if (!window.filterInteractions) {
    window.filterInteractions = {
      programLevel: [],
      language: [],
      studyArea: [],
      province: [],
      searchQuery: '',
      results: [],
      university: [],
    };
  }
};

export const updateFilterInteractions = (filters: FilterState & { results: any[] }) => {
  if (typeof window !== 'undefined') {
    initializeFilterInteractions();
    
    // Create a copy of filterInteractions to modify
    const updatedInteractions = { ...window.filterInteractions };
    
    // Conditionally add coop field only if true
    if (filters.coop) {
      updatedInteractions.coop = filters.coop;
    } else {
      delete updatedInteractions.coop;
    }
    
    // Conditionally add remote field only if true
    if (filters.remote) {
      updatedInteractions.remote = filters.remote;
    } else {
      delete updatedInteractions.remote;
    }
    
    // Update other fields
    window.filterInteractions = {
      ...updatedInteractions,
      programLevel: filters.programLevel,
      language: filters.language,
      studyArea: filters.studyArea,
      province: filters.province,
      searchQuery: filters.searchQuery,
      results: filters.results,
      university: filters.university
    };
  }
};