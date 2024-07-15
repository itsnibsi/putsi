import React, { createContext, useContext } from 'react';
import { Addiction } from '../types';
import usePersistentState from '../hooks/usePersistentState';

interface AddictionContextType {
  addictions: Addiction[];
  addAddiction: (addiction: Addiction) => void;
  deleteAddiction: (id: string) => void;
  editAddiction: (id: string, updatedAddiction: Partial<Addiction>) => void;
}

const AddictionContext = createContext<AddictionContextType | undefined>(undefined);

export const useAddictionContext = () => {
  const context = useContext(AddictionContext);
  if (!context) {
    throw new Error('useAddictionContext must be used within an AddictionProvider');
  }
  return context;
};

export const AddictionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [addictions, setAddictions] = usePersistentState<Addiction[]>('addictions', []);

  const addAddiction = (addiction: Addiction) => {
    setAddictions([...addictions, addiction]);
  };

  const deleteAddiction = (id: string) => {
    setAddictions(addictions.filter(addiction => addiction.id !== id));
  };

  const editAddiction = (id: string, updatedAddiction: Partial<Addiction>) => {
    setAddictions(addictions.map(addiction =>
      addiction.id === id ? { ...addiction, ...updatedAddiction } : addiction
    ));
  };

  return (
    <AddictionContext.Provider value={{ addictions, addAddiction, deleteAddiction, editAddiction }}>
      {children}
    </AddictionContext.Provider>
  );
};