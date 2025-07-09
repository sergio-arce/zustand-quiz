import { Container, Stack, Typography } from '@mui/material'
import './App.css'
import { JavaScriptLogo } from './assets/JavaScriptLogo'
import { Start } from './Start'
import { useQuestionStore } from './store/questions'

function App() {

  const questions = useQuestionStore(state => state.questions)

  console.log({questions})


  return (
    <main>
      <Container maxWidth="sm">
        <Stack direction="row" gap={2} alignItems="center" justifyContent="center">
          <JavaScriptLogo />
          <Typography variant='h2' component="h1">
            Zustand Quiz
          </Typography>
        </Stack>
      </Container>

      <Start />
     
    </main>
  )
}

export default App
