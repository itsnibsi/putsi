import React from 'react';
import { useMoodsContext } from '../contexts/MoodsContext';
import moodTypes from '../data/moodTypes';
import { format } from 'date-fns/format';

interface MoodSelectorProps {
  date: string;
  onSelect: (moodValue: number) => void;
}

const MoodSelector: React.FC<MoodSelectorProps> = ({ date, onSelect }) => {
  const { moods, deleteMood, setMood } = useMoodsContext();
  const selectedMood = moods[date];

  const handleMoodSelect = (moodValue: number) => {
    if (moods[date] === moodValue) {
      // If the selected mood is the same as the selected mood, delete it
      deleteMood(date);
    } else {
      // Otherwise, update it
      setMood(date, moodValue);
      onSelect(moodValue);
    }
  };

  return (
    <div className="flex flex-col p-4">
      <h3 className="text-2xl mb-4">Choose mood for {format(new Date(date), 'MMMM do')}</h3>
      <div className="flex flex-wrap justify-center">
        {moodTypes.map((mood) => (
          <button
            key={mood.value}
            onClick={() => handleMoodSelect(mood.value)}
            className={`m-1 p-2 rounded-lg ${selectedMood === mood.value ? 'bg-blue-500' : 'bg-gray-300 text-white'
              }`}
            style={{ fontSize: '1.5em' }}
            title={mood.name}
          >
            {mood.emoji}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MoodSelector

