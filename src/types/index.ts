export interface Addiction {
  id: string;
  name: string;
  quitDate: string;
  weeklyCost: number;
}

export interface Milestone {
  id: string;
  addictionType: string;
  timeframe: number;
  description: string;
}

export interface Motivation {
  id: string;
  description: string;
}