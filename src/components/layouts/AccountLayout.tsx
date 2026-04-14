import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar'
import SidebarAccount from '../SidebarAccount'

export default function AccountLayout() {
  return (
    <div className='min-h-screen bg-background/30 dark:bg-background-dark flex flex-col'>
        <header className="fixed top-0 left-0 right-0 z-50">
            <Navbar />
        </header>

        <div className="flex flex-1 pt-[64px]"> {/* pt-[64px] accounts for the fixed navbar height */}
            <SidebarAccount />
            <main className="ml-64 flex-1">
                <Outlet />
            </main>
        </div>
    </div>
  )
}
