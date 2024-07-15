import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface State  {
  moods: { [key: string]: number };
}

type Store = State;

export const useMoodsStore = create<Store>()(
  persist(
    (_) => ({
      moods: {},
    }),
    {
      name: 'moods-store',
      storage: createJSONStorage(() => localStorage),
    }
  )
)

export const deleteMood = (date: string) =>
  useMoodsStore.setState((state) => {
    const { [date]: _deleted, ...updatedMoods } = state.moods;
    return { moods: updatedMoods };
  })

export const setMood = (date: string, moodValue: number) =>
  useMoodsStore.setState((state) => ({
    moods: { ...state.moods, [date]: moodValue },
  }))