import { Route, Routes } from 'react-router-dom'
import { Agenda } from './screens/agenda/agenda'
import Login from './screens/login'
import MainLayout from './components/layouts/MainLayout'
import Register from './screens/register'
import PruebaColores from './screens/pruebaColores'

export default function AppRouter() {
  return (
    <Routes>
        <Route element={<MainLayout />}>
          <Route path='/' element={<Agenda />}/>
        </Route>

        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/prueba-colores' element={<PruebaColores />}/>
    </Routes>
  )
}
