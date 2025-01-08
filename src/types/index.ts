export interface Program {
  id: string;
  name: string;
  university: string;
  province: string;
  level: string;
  language: string;
  areaOfStudy: string;
  results: Program[];
}

export interface FilterState {
  programLevel: string[];
  language: string[];
  areaOfStudy: string[];
  province: string[];
  searchQuery: string;
}
