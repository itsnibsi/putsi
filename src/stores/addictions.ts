import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { Addiction } from '../types';

interface State {
  addictions: Addiction[];
}

type Store = State;

export const useAddictionsStore = create<Store>()(
  persist(
    (_) => ({
      addictions: [],
    }),
    { 
      name: 'addictions-store', 
      storage: createJSONStorage(() => localStorage) 
    }
  )
)

export const addAddiction = (addiction: Addiction) =>
  useAddictionsStore.setState((state) => ({
    addictions: [...state.addictions, addiction],
  }));

export const deleteAddiction = (id: string) =>
  useAddictionsStore.setState((state) => ({
    addictions: state.addictions.filter((addiction) => addiction.id !== id),
  }));

export const editAddiction = (id: string, updatedAddiction: Partial<Addiction>) =>
  useAddictionsStore.setState((state) => ({
    addictions: state.addictions.map((addiction) =>
      addiction.id === id ? { ...addiction, ...updatedAddiction } : addiction
    ),
  }));
