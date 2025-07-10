import { Container, Stack, Typography } from '@mui/material'
import './App.css'
import { JavaScriptLogo } from './assets/JavaScriptLogo'
import { Start } from './Start'
import { useQuestionStore } from './store/questions'
import { Game } from './Game'

function App() {

  const questions = useQuestionStore(state => state.questions)

  return (
    <main>
      <Container maxWidth="sm" sx={{ mb: 2 }}>
        <Stack direction="row" gap={2} alignItems="center" justifyContent="center">
          <JavaScriptLogo />
          <Typography variant='h2' component="h1">
            JavaScript Quiz
          </Typography>
        </Stack>
      </Container>
      {questions.length === 0 && <Start />}
      {questions.length > 0 && <Game />}
    </main>
  )
}

export default App
