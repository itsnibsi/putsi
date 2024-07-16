import { setMood } from '../stores/moods';
import MoodCalendar from './MoodCalendar';
import MoodSelector from './MoodSelector';
import { useState } from 'react';

const MoodTracker: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [showCalendar, setShowCalendar] = useState(false);

  return (
    <div className='space-y-4'>
      <div className="p-6 mb-6 bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
        <MoodSelector date={selectedDate} onSelect={(value) => setMood(selectedDate, value)} />
        <div className="flex justify-center">
          <button
            onClick={() => setShowCalendar(!showCalendar)}
            className="flex items-center space-x-2 px-4 py-2 mb-4 bg-gray-100 text-gray-700 border border-gray-300 rounded-full hover:bg-gray-200 transition-colors duration-200"
          >
            <span>{showCalendar ? 'Hide' : 'Show'} Calendar</span>
            <span>{showCalendar ? '▲' : '▼'}</span>
          </button>
        </div>
        {showCalendar && (
          <MoodCalendar todayDate={selectedDate} onSelectDate={(date) => setSelectedDate(date)} />
        )}
      </div>
    </div>
  );
}

export default MoodTracker
