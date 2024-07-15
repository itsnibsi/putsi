import React from 'react';
import { AddictionProvider } from './contexts/AddictionContext';
import AddictionList from './components/AddictionList';
import AddAddictionForm from './components/AddAddictionForm';
import MotivationDisplay from './components/MotivationDisplay';
import MilestoneTracker from './components/MilestoneTracker';

function App() {
  return (
    <AddictionProvider>
      <div className="min-h-screen bg-gray-100 p-8">
        <h1 className="text-4xl font-bold text-blue-600 mb-8 text-center">
          Addiction Diary
        </h1>
        <div className="max-w-2xl mx-auto">
          <MotivationDisplay />
          <AddAddictionForm />
          <AddictionList />
          <MilestoneTracker />
        </div>
      </div>
    </AddictionProvider>
  );
}

export default App;