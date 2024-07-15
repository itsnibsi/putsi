import React from 'react';
import moodTypes from '../data/moodTypes';
import { format } from 'date-fns/format';
import { deleteMood, setMood, useMoodsStore } from '../stores/moods';
import cn from '../lib/cn';

interface MoodSelectorProps {
  date: string;
  onSelect: (moodValue: number) => void;
}

const MoodSelector: React.FC<MoodSelectorProps> = ({ date, onSelect }) => {
  const { moods } = useMoodsStore();
  const selectedMood = moods[date];

  const handleMoodSelect = (moodValue: number) => {
    if (moods[date] === moodValue) {
      deleteMood(date);
    } else {
      setMood(date, moodValue);
      onSelect(moodValue);
    }
  };

  const formattedDate = new Date(date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

  return (
    <div className="flex flex-col p-4">
      <h3 className="text-2xl mb-4 text-center">Choose your mood for {formattedDate}:</h3>
      <div className="flex flex-wrap items-center justify-center">
        {moodTypes.map((mood) => (
          <button
            key={mood.value}
            onClick={() => handleMoodSelect(mood.value)}
            className={cn('m-1 p-4 w-1/5 rounded-lg', {
              'bg-blue-500 text-white dark:bg-blue-800 dark:text-white': selectedMood === mood.value,
              'bg-gray-200 dark:text-white dark:bg-gray-700': selectedMood !== mood.value,
            })}
            title={mood.name}
          >
            <div className="flex flex-col items-center">
              {mood.emoji}
              <div
                className={cn(
                  'text-center text-sm font-bold',
                  selectedMood === mood.value ? 'text-white' : 'text-gray-800',
                  'dark:text-gray-400 dark:text-white dark:hover:text-white',
                )}
              >
                {mood.name}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MoodSelector

