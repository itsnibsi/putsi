import { createContext, useContext } from 'react';
import usePersistentState from '../hooks/usePersistentState';

interface MoodsContextType {
  moods: { [key: string]: number };
  deleteMood: (date: string) => void;
  setMood: (date: string, moodValue: number) => void;
}

const MoodsContext = createContext<MoodsContextType | undefined>(undefined);

export const useMoodsContext = () => {
  const context = useContext(MoodsContext);
  if (!context) {
    throw new Error('useMoodsContext must be used within an MoodsProvider');
  }
  return context;
}

export const MoodsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [moods, setMoods] = usePersistentState<{ [key: string]: number }>('moods', {});

  const deleteMood = (date: string) => {
    const updatedMoods = { ...moods };
    delete updatedMoods[date];
    setMoods(updatedMoods);
  };

  const setMood = (date: string, moodValue: number) => {
    setMoods({ ...moods, [date]: moodValue });
  };

  return (
    <MoodsContext.Provider value={{ moods, deleteMood, setMood }}>
      {children}
    </MoodsContext.Provider>
  );
}