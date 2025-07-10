import { Card, Typography } from "@mui/material"
import SyntaxHighlighter from 'react-syntax-highlighter'
import { atelierLakesideDark } from "react-syntax-highlighter/dist/esm/styles/hljs" // anOldHope, solarizedDark, tomorrowNightBlue

import { useQuestionStore } from "./store/questions"
import type { Question as QuestionType } from "./types"

const Question = ({ info }: { info: QuestionType }) => {
  return (
    <Card variant="outlined" sx={{ textAlign: 'left', p: 2 }}>
      <Typography variant='h5' align="center" >{ info.question }</Typography>
      <SyntaxHighlighter language="javascript" style={atelierLakesideDark} showLineNumbers >
        { info.code }
      </SyntaxHighlighter>
    </Card>
  )
}

export const Game = () => {
  const questions = useQuestionStore(state => state.questions)
  const currentQuestion = useQuestionStore(state => state.currentQuestion)

  const questionInfo = questions[currentQuestion]

  return (
    <Question info={questionInfo} /> 
  )
}
