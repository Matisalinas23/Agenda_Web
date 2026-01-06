import { Route, Routes } from 'react-router-dom'
import { Agenda } from './screens/agenda/agenda'

export default function AppRouter() {
  return (
    <Routes>
        <Route path='/' element={<Agenda />}/>
        <Route path='/about'>
        </Route>
        <Route path='/users'>
        </Route>
      </Routes>
  )
}
