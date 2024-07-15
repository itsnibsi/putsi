export interface AddictionType {
  id: string;
  name: string;
  defaultWeeklyCost: number;
}

export interface Addiction {
  id: string;
  typeId: string;
  quitDate: string;
  weeklyCost: number;
}

export interface Milestone {
  id: string;
  addictionType: string;
  days: number;
  description: string;
}

export interface Motivation {
  id: string;
  description: string;
}

export interface MoodType {
  value: number;
  name: string;
  emoji: string;
}