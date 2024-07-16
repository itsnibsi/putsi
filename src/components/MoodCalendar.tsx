import React, { useState, useEffect } from 'react';
import { format, subDays } from 'date-fns';
import moodTypes from '../data/moodTypes';
import { useMoodsStore } from '../stores/moods';
import cn from '../lib/cn';

interface MoodCalendarProps {
  onSelectDate: (date: string) => void;
  todayDate: string;
}

const MoodCalendar: React.FC<MoodCalendarProps> = ({ todayDate, onSelectDate }) => {
  const { moods } = useMoodsStore();
  const [dates, setDates] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>(todayDate);

  useEffect(() => {
    const startDate = subDays(new Date(), 28);
    const endDate = new Date();
    const newDates: string[] = [];
    let currentDate = startDate;
    while (currentDate <= endDate) {
      newDates.push(format(currentDate, 'yyyy-MM-dd'));
      currentDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);
    }
    setDates(newDates);
  }, []);

  const handleSelectDate = (date: string) => {
    setSelectedDate(date);
    onSelectDate(date);
  }

  return (
    <>
      <div className="grid grid-cols-7 gap-4">
        {dates.map((dateString) => {
          const moodValue = moods[dateString];
          const mood = moodTypes.find((mood) => mood.value === moodValue);
          const isSelected = selectedDate === dateString;

          return (
            <div
              key={dateString}
              className={cn(
                `p-2 rounded-md text-center cursor-pointer transition-colors duration-200`,
                'bg-gradient-to-br border border-gray-200 dark:border-gray-800',
                {
                  'from-blue-400 to-blue-600 text-white dark:from-blue-600 dark:to-blue-800 border-blue-600': isSelected,
                  'bg-white dark:bg-gray-700': !isSelected,
                }
              )}
              onClick={() => handleSelectDate(dateString)}
            >
              <div className="text-sm pb-1">{format(new Date(dateString), 'MMM do')}</div>
              <div className={cn('text-2xl', { 'dark:text-blue-200': isSelected })}>{mood ? mood.emoji : '❓'}</div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default MoodCalendar;

