import React, { useState, useEffect } from 'react';
import { format, subDays } from 'date-fns';
import { useMoodsContext } from '../contexts/MoodsContext';
import moodTypes from '../data/moodTypes';

interface MoodCalendarProps {
  onSelectDate: (date: string) => void;
  todayDate: string;
}

const MoodCalendar: React.FC<MoodCalendarProps> = ({ todayDate, onSelectDate }) => {
  const { moods } = useMoodsContext();
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
      <div className="grid grid-cols-6 gap-4">
        {dates.map((dateString) => {
          const moodValue = moods[dateString];
          const mood = moodTypes.find((mood) => mood.value === moodValue);

          const isSelected = selectedDate === dateString;
          const className = isSelected ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800';
          const style = isSelected ? { fontWeight: 'bold' } : {};

          return (
            <div
              key={dateString}
              className={`${className} p-4 rounded-md`}
              onClick={() => handleSelectDate(dateString)}
              style={style}
            >
              <div className="text-sm">{format(new Date(dateString), 'MMM do')}</div>
              <div className="text-xl">{mood ? mood.emoji : '❓'}</div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default MoodCalendar;

