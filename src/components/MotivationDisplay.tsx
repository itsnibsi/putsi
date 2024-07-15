import React, { useState, useEffect } from 'react';
import { motivationalQuotes } from '../data/motivationalQuotes';

const MotivationDisplay: React.FC = () => {
  const [currentQuote, setCurrentQuote] = useState(motivationalQuotes[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
      setCurrentQuote(motivationalQuotes[randomIndex]);
    }, 10000); // Change quote every 10 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4">Daily Motivation</h2>
      <blockquote className="italic text-lg">
        "{currentQuote.description}"
      </blockquote>
    </div>
  );
};

export default MotivationDisplay;