import { useEffect } from 'react'
import './App.css'
import AppRouter from './AppRouter'
import useAuthStore from './store/useAuthStore'
import useNoteStore from './store/useNoteStore'

function App() {
  const { setNotes } = useNoteStore(state => state)
  const { isToken } = useAuthStore(state => state)

  useEffect(() => {
    if (!isToken) {
      setNotes([])
    }
  }, [isToken])

  return (
      <AppRouter />
  )
}

export default App
