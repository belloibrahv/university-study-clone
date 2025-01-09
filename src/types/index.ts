export interface Program {
  id: string;
  image: string;
  programName: string;
  programLevel: string;
  language: string;
  coop: boolean;
  remote: boolean;
  studyArea: string;
  university: string;
  province: string;
}

export interface FilterState {
  programLevel: string[];
  language: string[];
  areaOfStudy: string[];
  province: string[];
  searchQuery: string;
  results: Program[];
  studyArea: string[];
}
