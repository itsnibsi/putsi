import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Note } from '../types';

interface State {
  notes: Note[];
  addNote: (note: Note) => void;
  deleteNote: (id: string) => void;
  updateNote: (id: string, noteUpdates: Partial<Note>) => void;
}

type Store = State;

export const useNotesStore = create<Store>()(
  persist(
    (set) => ({
      notes: [],
      addNote: (note: Note) => set((state) => ({ notes: [...state.notes, note] })),
      deleteNote: (id: string) => set((state) => ({ notes: state.notes.filter(note => note.id !== id) })),
      updateNote: (id: string, noteUpdates: Partial<Note>) => set((state) => ({ notes: state.notes.map(note => note.id === id ? { ...note, ...noteUpdates } : note) })),
    }),
    {
      name: 'notes',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)