import { useEffect } from 'react'
import './App.css'
import AppRouter from './AppRouter'
import { useAuth } from './hooks/useAuth'
import useAuthStore from './store/useAuthStore'
import { useNotificationTrigger } from './hooks/useNotificationTrigger'

function App() {
  const { authMe } = useAuth()
  const { token } = useAuthStore(state => state)
  
  useNotificationTrigger()

  useEffect(() => {
    if (token) {
      authMe()
    }
  }, [token])

  return (
      <AppRouter />
  )
}

export default App
