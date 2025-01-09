import { Program } from "../types";

export const updateFilterInteractions = (filters: Program) => {
  (window as any).filterInteractions = filters;
};
