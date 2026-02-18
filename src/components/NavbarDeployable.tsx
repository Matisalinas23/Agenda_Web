import { useState } from "react"
import { useAuth } from "../hooks/useAuth"
import "./css/NavbarDeployable.css"
import { RegisterLoginUserIcon } from "./Icons/RegisterLoginUserIcon"
import { DarkModeIcon } from "./Icons/DarkModeIcon"
import { NotificationsIcon } from "./Icons/NotificationsIcon"
import { LogOutIcon } from "./Icons/LogOutIcon"
import { toggleTheme } from "../utils/theme"

export default function NavbarDeployable() {
    const { logoutUser } = useAuth()
    const [isOpenDepoyable, setIsOpenDepoyable] = useState<boolean>(false)
    return (
        <div className="relative w-[16%] flex items-center justify-center">
            <button
                className=" h-9 w-9 cursor-pointer"
                onClick={() => setIsOpenDepoyable(!isOpenDepoyable)}
            >
                <RegisterLoginUserIcon />
            </button>
            <div className={`navbarSideSection ${isOpenDepoyable ? "open" : ""}`}>
                <ul className="navbarDeployable">
                    <li className="min-w-38 px-2 flex justify-start rounded-xl hover:bg-blue-400">
                        <button
                            className="h-6 cursor-pointer flex items-center gap-4"
                            onClick={toggleTheme}
                        >
                            <DarkModeIcon />
                            Tema
                        </button>
                    </li>
                    <li className="min-w-38 px-2 flex justify-start rounded-xl hover:bg-blue-400">
                        <button className="h-6 cursor-pointer flex items-center gap-4">
                            <NotificationsIcon />
                            Notificaciones
                        </button>
                    </li>
                    <li className="min-w-38 px-2 flex justify-start rounded-xl hover:bg-blue-400">
                        <button className="h-6 cursor-pointe flex items-center gap-4" onClick={logoutUser}>
                            <LogOutIcon />
                            Cerrar Sesión
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    )
}
