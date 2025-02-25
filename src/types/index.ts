export interface Program {
  id: string;
  image: any; // Update with proper type if available
  programName: string;
  programLevel: string;
  language: string;
  coop: boolean;
  remote: boolean;
  studyArea: string[]; // Changed from string to string[]
  university: string;
  province: string;
}

export interface FilterState {
  programLevel: string[];
  language: string[];
  studyArea: string[]; // This will store individual study areas for filtering
  province: string[];
  university: string[];
  coop: boolean;
  remote: boolean;
  searchQuery: string;
  results: Program[];
  selectedProvince: string | null;
}