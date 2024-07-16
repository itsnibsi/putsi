import AddictionList from './components/AddictionList';
import MotivationDisplay from './components/MotivationDisplay';
import MoodTracker from './components/MoodTracker';
import AddictionForm from './components/AddictionForm';
import { useSettingsStore } from './stores/settings';
import DarkModeToggle from './components/DarkModeToggle';
import NoteList from './components/NoteList';

function App() {
  const { isDarkMode } = useSettingsStore();

  if (isDarkMode) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  return (
    <div className='min-h-screen bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white relative'>
      <div className="max-w-3xl mx-auto space-y-4 p-8">
        {/* <MotivationDisplay /> */}
        <AddictionList />
        <MoodTracker />
        <NoteList />
        <div className='fixed top-4 right-4'>
          <DarkModeToggle />
        </div>
      </div>
    </div>
  );
}

export default App;