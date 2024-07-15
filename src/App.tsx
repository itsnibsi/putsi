import { AddictionProvider } from './contexts/AddictionContext';
import AddictionList from './components/AddictionList';
import AddAddictionForm from './components/AddAddictionForm';
import MotivationDisplay from './components/MotivationDisplay';

function App() {
  return (
    <AddictionProvider>
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="max-w-2xl mx-auto space-y-4">
          <MotivationDisplay />
          <AddAddictionForm />
          <AddictionList />
        </div>
      </div>
    </AddictionProvider>
  );
}

export default App;