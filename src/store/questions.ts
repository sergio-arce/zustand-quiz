import { create } from "zustand";
import type { Question } from "../types";
import confetti from "canvas-confetti";


interface State {
  questions: Question[]
  currentQuestion: number
  fetchQuestion: (limit: number) => Promise<void>
  selectedAnswer: (questionId: number, answerIndex: number) => void
  goNextQuestion: () => void
  goPreviusQuestion: () => void
}

export const useQuestionStore = create<State>((set, get) => ({
  questions: [],
  currentQuestion: 0,

  fetchQuestion: async (limit: number) => {
    const response = await fetch('http://localhost:5173/data.json')
    const json = await response.json()
    // Shuffle questions and select the specified limit
    const questions = json.sort(() => Math.random() - 0.5).slice(0, limit)
    set({ questions })
  },

  selectedAnswer: (questionId: number, answerIndex: number) => {
    // Get current questions from the global state
    const { questions } = get()
    // Deep clone the questions array to avoid direct mutation
    const newQuestions = structuredClone(questions)
    // Find the index of the selected question
    const questionIndex = newQuestions.findIndex(q => q.id === questionId)
    if (questionIndex === -1) return
    // Get the question details
    const questionInfo = newQuestions[questionIndex]
    // Check if the selected answer is correct
    const isCorrectUserAnswer = questionInfo.correctAnswer === answerIndex

    if (isCorrectUserAnswer) confetti()

    // Update the question with user's answer and correctness
    newQuestions[questionIndex] = {
      ...questionInfo,
      isCorrectUserAnswer,
      userSelectedAnswer: answerIndex
    }
    // Update state with the modified questions array
    set({ questions: newQuestions })
  },

  goNextQuestion: () => {
    const { currentQuestion, questions } = get()
    const nextQuestion = currentQuestion + 1

    if (nextQuestion < questions.length) {
      set({ currentQuestion: nextQuestion })
    }
  },
  goPreviusQuestion: () => {
    const { currentQuestion } = get()
    const previusQuestion = currentQuestion - 1

    if (previusQuestion >= 0) {
      set({ currentQuestion: previusQuestion })
    }
  }

}))