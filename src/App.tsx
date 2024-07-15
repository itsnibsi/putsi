import { AddictionProvider } from './contexts/AddictionContext';
import AddictionList from './components/AddictionList';
import AddAddictionForm from './components/AddAddictionForm';
import MotivationDisplay from './components/MotivationDisplay';
import { MoodsProvider } from './contexts/MoodsContext';
import MoodTracker from './components/MoodTracker';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-2xl mx-auto space-y-4">
        <MotivationDisplay />
        <AddictionProvider>
          <AddAddictionForm />
          <AddictionList />
        </AddictionProvider>
        <MoodsProvider>
          <MoodTracker />
        </MoodsProvider>
      </div>
    </div>
  );
}

export default App;