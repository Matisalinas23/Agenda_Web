import { Route, Routes } from 'react-router-dom'
import { Agenda } from './screens/agenda/agenda'
import Login from './screens/login'
import MainLayout from './components/layouts/MainLayout'
import AccountLayout from './components/layouts/AccountLayout'
import Register from './screens/register'
import { PrivateRoute } from './components/layouts/PrivateRoutes'
import AccountVerification from './screens/accountVerification'
import Account from './screens/account'
import ResetPassword from './screens/resetPassword'
import RecoverAccount from './screens/recoverAccount'
import DeleteAccount from './screens/deleteAccount'

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        {/* Generall App Layout */}
        <Route element={<MainLayout />}>
          <Route path='/' element={<Agenda />}/>
          <Route path='/reset-password' element={<ResetPassword />}/>
          <Route path='/delete-account' element={<DeleteAccount />}/>
        </Route>

        {/* Account Specific Layout */}
        <Route element={<AccountLayout />}>
          <Route path='/account' element={<Account />}/>
        </Route>
      </Route>

      <Route path='/login' element={<Login />}/>
      <Route path='/register' element={<Register />}/>
      <Route path='/reactivate-account' element={<RecoverAccount />}/>
      <Route path='/register/verification' element={<AccountVerification />}/>
    </Routes>
  )
}
