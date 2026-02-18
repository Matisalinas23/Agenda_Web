import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar'

export default function MainLayout() {
  return (
    <div className='min-h-screen bg-background dark:bg-background-dark flex flex-col'>
        <header>
            <Navbar />
        </header>

        <main className='flex-1'>
            <Outlet />
        </main>
    </div>
  )
}
