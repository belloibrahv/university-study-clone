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
      areaOfStudy: [],
      results: []
    };
  }
};

export const updateFilterInteractions = (filters: FilterState & { results: any[] }) => {
  if (typeof window !== 'undefined') {
    initializeFilterInteractions();
    window.filterInteractions = {
      ...window.filterInteractions,
      ...filters
    };
  }
};