import { useState } from "react"
import { useAuth } from "../hooks/useAuth"
import "./css/NavbarDeployable.css"
import { RegisterLoginUserIcon } from "./Icons/RegisterLoginUserIcon"
import { DarkModeIcon } from "./Icons/DarkModeIcon"
import { NotificationsIcon } from "./Icons/NotificationsIcon"
import { LogOutIcon } from "./Icons/LogOutIcon"

export default function NavbarDeployable() {
    const { logoutUser } = useAuth()
    const [isOpenDepoyable, setIsOpenDepoyable] = useState<boolean>(false)
    return (
        <div className="relative w-[22%] flex items-center justify-center">
            <button
                className=" h-9 w-9 cursor-pointer"
                onClick={() => setIsOpenDepoyable(!isOpenDepoyable)}
            >
                <RegisterLoginUserIcon />
            </button>
            <div className={`navbarSideSection ${isOpenDepoyable ? "open" : ""}`}>
                <ul className="navbarDeployable">
                    <li className="w-full px-20 text-center cursor-pointer rounded-lg hover:bg-blue-400 flex justify-start">
                        <button className="h-5 flex items-center gap-4">
                            <DarkModeIcon />
                            Tema
                        </button>
                    </li>
                    <li className="w-full px-20 text-center cursor-pointer rounded-lg hover:bg-blue-400 flex justify-start">
                        <button>
                            <NotificationsIcon />
                            Notificaciones
                        </button>
                    </li>
                    <li className="w-full px-20 text-center cursor-pointer rounded-lg hover:bg-blue-400 flex justify-start">
                        <button className="w-full" onClick={logoutUser}>
                            <LogOutIcon />
                            Cerrar Sesión
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    )
}
