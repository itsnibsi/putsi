export const calculateProgress = (quitDate: string, milestone: number) => {
  const now = new Date().getTime();
  const quit = new Date(quitDate).getTime();
  const diffTime = now - quit;
  const progress = (diffTime / (milestone * 24 * 60 * 60 * 1000)) * 100;
  return Math.min(progress, 100);
};

export const DateUnitMilliseconds: { [key: string]: number } = {
  second: 1000,
  minute: 60 * 1000,
  hour: 60 * 60 * 1000,
  day: 24 * 60 * 60 * 1000,
  week: 7 * 24 * 60 * 60 * 1000,
  month: 30 * 24 * 60 * 60 * 1000,
  year: 365 * 24 * 60 * 60 * 1000
}

export const timeElapsedFromDiff = (diffTime: number) => {
  const years = Math.floor(diffTime / (DateUnitMilliseconds.year));
  const months = Math.floor((diffTime % (DateUnitMilliseconds.year)) / (DateUnitMilliseconds.month));
  const days = Math.floor((diffTime % (DateUnitMilliseconds.month)) / (DateUnitMilliseconds.day));
  const hours = Math.floor((diffTime % (DateUnitMilliseconds.day)) / (DateUnitMilliseconds.hour));
  const minutes = Math.floor((diffTime % (DateUnitMilliseconds.hour)) / (DateUnitMilliseconds.minute));
  const seconds = Math.floor((diffTime % (DateUnitMilliseconds.minute)) / 1000);
  return { years, months, days, hours, minutes, seconds };
}

export function getDaysDifference(date1: Date, date2: Date): number {
  const diffMs = date2.getTime() - date1.getTime();
  return Math.round(diffMs / DateUnitMilliseconds.day);
}