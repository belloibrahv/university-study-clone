import { FilterState } from "../types";

declare global {
  interface Window {
    filterInteractions: FilterState & { results: any[] };
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
      coop: '',
      remote: '',
    };
  }
};

export const updateFilterInteractions = (filters: FilterState & { results: any[] }) => {
  if (typeof window !== 'undefined') {
    initializeFilterInteractions();
    
    // Handle coop and remote fields
    const newInteractions = { ...filters };
    
    // Convert false to empty string
    newInteractions.coop = filters.coop ? true : '';
    newInteractions.remote = filters.remote ? true : '';

    window.filterInteractions = {
      ...window.filterInteractions,
      ...newInteractions
    };
  }
};