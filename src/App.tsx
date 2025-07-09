import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { create } from 'zustand'
import Button from '@mui/material/Button';

interface StoreState {
  count: number
  inc: () => void
  dec: () => void
}

const useStore = create<StoreState>((set) => ({
  count: 0,
  inc: () => set((state) => ({ count: state.count + 1 })),
  dec: () => set((state) => ({ count: state.count - 1 })),
}));

function App() {

  const { count, inc, dec } = useStore()

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <Button onClick={inc}>
          +
        </Button>
        <span>{count}</span>
        <Button onClick={dec}>
          -
        </Button>
      </div>
    </>
  )
}

export default App
