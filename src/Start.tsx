import { Button } from "@mui/material"
import { useQuestionStore } from "./store/questions"

export const Start = () => {

  const fetchQuestions = useQuestionStore(state => state.fetchQuestion)

  const handleClick = () => {
    fetchQuestions(3)
  }

  return (
    <Button variant="contained" onClick={handleClick}>
      Start quiz
    </Button>
  )
}