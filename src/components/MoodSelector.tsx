import React from 'react';
import moodTypes from '../data/moodTypes';
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
      <h2 className="text-2xl mb-4 text-center">Choose your mood for {formattedDate}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
        {moodTypes.map((mood) => (
          <button
            key={mood.value}
            onClick={() => handleMoodSelect(mood.value)}
            className={cn(
              'p-3 rounded-lg transition-colors duration-200',
              'flex flex-col items-center justify-center',
              'bg-gradient-to-br border border-gray-200 dark:border-gray-700',
              {
                'from-blue-400 to-blue-600 text-white dark:from-blue-600 dark:to-blue-800': selectedMood === mood.value,
                'from-white to-gray-100 dark:from-gray-700 dark:to-gray-800': selectedMood !== mood.value,
              }
            )}
            aria-label={`Select mood: ${mood.name}`}
            aria-pressed={selectedMood === mood.value}
          >
            <span className="text-2xl" aria-hidden="true">{mood.emoji}</span>
            <span className={cn(
              'text-md font-medium mt-1',
              selectedMood === mood.value ? 'text-white' : 'text-gray-800 dark:text-gray-200'
            )}>
              {mood.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MoodSelector

