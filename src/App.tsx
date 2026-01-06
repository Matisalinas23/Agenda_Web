import { Link } from 'react-router-dom'
import './App.css'
import AppRouter from './AppRouter'

function App() {

  return (
    <>
      <header>
        <nav>
          <ul className='bg-neutral-500 py-4 px-8 flex gap-12'>
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
        </nav>
      </header>

      <AppRouter />
    </>
    
  )
}

export default App
