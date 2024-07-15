export interface Addiction {
  // Unique ID of the addiction
  id: string;
  // The pre-defined type of the addiction (defined elsewhere)
  typeId: string;
  // The date and time when the user quit the addiction
  quitDate: string;
  // The amount of euros saved per week
  weeklyCost: number;
}

export interface Milestone {
  id: string;
  addictionType: string;
  timeframe: number; // The number of days to reach this milestone
  description: string;
}

export interface Motivation {
  id: string;
  description: string;
}