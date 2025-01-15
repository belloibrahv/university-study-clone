export interface FilterState {
  coop: boolean;
  programLevel: string[];
  language: string[];
  studyArea: string[];
  province: string[];
  university: string[]; 
  searchQuery: string;
  results: Program[];
  remote: boolean;
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
  coop: boolean;
  remote: boolean;
}