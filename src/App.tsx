import { useEffect } from 'react'
import './App.css'
import AppRouter from './AppRouter'
import { useAuth } from './hooks/useAuth'
import useAuthStore from './store/useAuthStore'

function App() {
  const { authMe } = useAuth()
  const { token } = useAuthStore(state => state)

  useEffect(() => {
    if (token) {
      authMe()
    }
  }, [])

  return (
      <AppRouter />
  )
}

export default App
