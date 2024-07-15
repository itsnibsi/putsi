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
    <div className="p-6 mb-6">
      <blockquote className="italic text-2xl text-center text-blue-600 font-bold">
        "{currentQuote.description}"
      </blockquote>
    </div>
  );
};

export default MotivationDisplay;