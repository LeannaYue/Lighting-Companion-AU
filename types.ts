export type TabType = 'Dictionary' | 'Formulas' | 'Standards' | 'Library';

export interface Term {
  id: string;
  name: string;
  category: string;
  definition: string;
  analogy: string;
  formulaId?: string; // Links to a formula for flipping
}

export interface Variable {
  symbol: string;
  definition: string;
  unit: string;
  defaultValue?: number;
}

export interface Formula {
  id: string;
  name: string;
  latex: string;
  description: string;
  category: string;
  variables: Variable[];
  calculate: (inputs: Record<string, number>) => number;
}

export interface LuxLevel {
  task: string;
  lux: number;
  ugr?: number | string; // Unified Glare Rating limit
}

export interface Standard {
  id: string;
  code: string;
  title: string;
  luxLevels: LuxLevel[];
}

export interface Download {
  id: string;
  name: string;
  filename: string;
  size: string;
}