import MoodCalendar from './MoodCalendar';
import { useMoodsContext } from '../contexts/MoodsContext';
import MoodSelector from './MoodSelector';
import { useState } from 'react';

const MoodTracker: React.FC = () => {
  const { setMood } = useMoodsContext();
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);

  return (
    <div className='space-y-4'>
      <h2 className="text-2xl font-bold">Mood Tracker</h2>
      <div className="p-6 mb-6 bg-white shadow-md rounded-lg">
        <MoodSelector date={selectedDate} onSelect={(value) => setMood(selectedDate, value)} />
        <MoodCalendar todayDate={selectedDate} onSelectDate={(date) => setSelectedDate(date)} />
      </div>
    </div>
  );
}

export default MoodTracker