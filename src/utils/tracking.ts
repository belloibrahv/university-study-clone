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
      coop: false,
      remote: false,
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