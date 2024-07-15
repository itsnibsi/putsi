export interface AddictionType {
  id: string;
  name: string;
  defaultWeeklyCost: number;
}

export const addictionTypes: AddictionType[] = [
  { id: 'smoking', name: 'Smoking', defaultWeeklyCost: 70 },
  { id: 'alcohol', name: 'Alcohol', defaultWeeklyCost: 50 },
  { id: 'caffeine', name: 'Caffeine', defaultWeeklyCost: 25 },
  { id: 'gambling', name: 'Gambling', defaultWeeklyCost: 100 },
  { id: 'junk-food', name: 'Junk Food', defaultWeeklyCost: 40 },
];