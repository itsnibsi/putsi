import { setMood } from '../stores/moods';
import MoodCalendar from './MoodCalendar';
import MoodSelector from './MoodSelector';
import { useState } from 'react';

const MoodTracker: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);

  return (
    <div className='space-y-4'>
      <div className="p-6 mb-6 bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
        <h2 className="text-2xl font-bold">Mood Tracker</h2>
        <MoodSelector date={selectedDate} onSelect={(value) => setMood(selectedDate, value)} />
        <MoodCalendar todayDate={selectedDate} onSelectDate={(date) => setSelectedDate(date)} />
      </div>
    </div>
  );
}

export default MoodTracker