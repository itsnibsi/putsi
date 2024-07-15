import React, { createContext, useContext, useState, useEffect } from 'react';
import { Addiction } from '../types';
import usePersistentState from '../hooks/usePersistentState';

interface AddictionContextType {
  addictions: Addiction[];
  addAddiction: (addiction: Addiction) => void;
  removeAddiction: (id: string) => void;
  updateAddiction: (id: string, updatedAddiction: Partial<Addiction>) => void;
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

  const removeAddiction = (id: string) => {
    setAddictions(addictions.filter(addiction => addiction.id !== id));
  };

  const updateAddiction = (id: string, updatedAddiction: Partial<Addiction>) => {
    setAddictions(addictions.map(addiction =>
      addiction.id === id ? { ...addiction, ...updatedAddiction } : addiction
    ));
  };

  return (
    <AddictionContext.Provider value={{ addictions, addAddiction, removeAddiction, updateAddiction }}>
      {children}
    </AddictionContext.Provider>
  );
};