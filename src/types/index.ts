export interface FilterState {
  programLevel: string[];
  language: string[];
  studyArea: string[];
  province: string[];
  university: string[];  // Added university array
  coop: boolean;         // Added coop boolean
  searchQuery: string;
  areaOfStudy: string[];
  results: Program[];
}

export interface Program {
  id: string;
  programName: string;
  university: string;
  province: string;
  programLevel: string;
  language: string;
  studyArea: string;
  image: string;
  coop: boolean;  // Added coop property
}