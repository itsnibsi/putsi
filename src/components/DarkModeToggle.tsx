import React from 'react';
import { useSettingsStore } from '../stores/settings';

const DarkModeToggle: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useSettingsStore();

  return (
    <button
      onClick={toggleDarkMode}
      className="p-4 text-2xl rounded-full bg-gray-700 dark:bg-gray-200"
    >
      {isDarkMode ? '🌞' : '🌙'}
    </button>
  );
};

export default DarkModeToggle;