import { Card, CardContent, IconButton, List, ListItem, ListItemButton, ListItemText, Stack, Typography } from "@mui/material"
import SyntaxHighlighter from 'react-syntax-highlighter'
import { atelierLakesideDark } from "react-syntax-highlighter/dist/esm/styles/hljs" // anOldHope, solarizedDark, tomorrowNightBlue

import { useQuestionStore } from "./store/questions"
import type { Question as QuestionType } from "./types"
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material"
import { Footer } from "./Footer"

const Question = ({ info }: { info: QuestionType }) => {

  const selectAnswer = useQuestionStore(state => state.selectedAnswer)
  const { answers, code, id, question, userSelectedAnswer, correctAnswer } = info

  const handleClick = (answerIndex: number) => () => selectAnswer(id, answerIndex)
  const getBackgroundColor = (index: number) => {
    // Highlight correct answer in green
    if (index === correctAnswer) return 'green'
    // Highlight user's incorrect selection in red
    if (index === userSelectedAnswer) return 'red'
    // Default background for unselected/neutral answers
    return 'transparent'
  }
  

  return (
    <Card variant="outlined" sx={{ bgcolor: '#222', textAlign: 'left'}}>
      <CardContent>
        <Typography variant='h5' align="center" >{ question }</Typography>
        <SyntaxHighlighter language="javascript" style={atelierLakesideDark} showLineNumbers >
          { code }
        </SyntaxHighlighter>
        <List sx={{ bgcolor: '#333'}} disablePadding >
          {
            answers.map((answer, index) => (
              <ListItem key={`${answer}-${index}`} disablePadding divider>
                <ListItemButton
                  disabled={userSelectedAnswer != null} 
                  onClick={handleClick(index)} 
                  sx={userSelectedAnswer != null ? { backgroundColor: getBackgroundColor(index) }: undefined}
                >
                  <ListItemText primary={ answer } sx={{ textAlign: 'center' }} />
                </ListItemButton>
              </ListItem>
            ))
          }
        </List>
      </CardContent>
    </Card>
  )
}

export const Game = () => {
  const questions = useQuestionStore(state => state.questions)
  const currentQuestion = useQuestionStore(state => state.currentQuestion)
  const goNextQuestion = useQuestionStore(state => state.goNextQuestion)
  const goPreviusQuestion = useQuestionStore(state => state.goPreviusQuestion)

  const questionInfo = questions[currentQuestion]

  return (
    <Stack gap={2}>
      <Stack direction="row" gap={2} alignItems="center" justifyContent="center">
        <IconButton onClick={goPreviusQuestion} disabled={currentQuestion === 0}> 
          <ArrowBackIos />
        </IconButton>
        <Typography>{currentQuestion + 1} / {questions.length}</Typography>
        <IconButton onClick={goNextQuestion} disabled={currentQuestion >= questions.length - 1}>
          <ArrowForwardIos />
        </IconButton>
      </Stack>
      <Question info={questionInfo} /> 
      <Footer />
    </Stack>
  )
}
