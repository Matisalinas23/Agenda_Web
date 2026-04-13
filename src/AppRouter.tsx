import { Route, Routes } from 'react-router-dom'
import { Agenda } from './screens/agenda/agenda'
import Login from './screens/login'
import MainLayout from './components/layouts/MainLayout'
import Register from './screens/register'
import { PrivateRoute } from './components/layouts/PrivateRoutes'
import AccountVerification from './screens/accountVerification'
import Account from './screens/account'


export default function AppRouter() {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route element={<MainLayout />}>
          <Route path='/' element={<Agenda />}/>
          <Route path='/account' element={<Account />}/>
        </Route>
      </Route>

      <Route path='/login' element={<Login />}/>
      <Route path='/register' element={<Register />}/>
      <Route path='/register/verification' element={<AccountVerification />}/>
    </Routes>
  )
}
