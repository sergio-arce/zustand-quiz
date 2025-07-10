import { create } from "zustand";
import type { Question } from "../types";

interface State {
  questions: Question[]
  currentQuestion: number
  fetchQuestion: (limit: number) => Promise<void>
}

export const useQuestionStore = create<State>((set) => ({
  questions: [],
  currentQuestion: 0,
  fetchQuestion: async (limit: number) => {
    const response = await fetch('http://localhost:5173/data.json')
    const json = await response.json()
    const questions = json.sort(() => Math.random() - 0.5).slice(0, limit)
    set({ questions })
  }
}))