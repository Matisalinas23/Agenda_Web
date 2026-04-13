import { useEffect, useState } from "react"
import { useAuth } from "../hooks/useAuth"
import "./css/NavbarDeployable.css"
import { RegisterLoginUserIcon } from "./Icons/RegisterLoginUserIcon"
import { DarkModeIcon } from "./Icons/DarkModeIcon"
import { NotificationsIcon } from "./Icons/NotificationsIcon"
import { LogOutIcon } from "./Icons/LogOutIcon"
import { toggleTheme } from "../utils/theme"
import { NotificationsOffIcon } from "./Icons/NotificationsOffIcon"
import AccountIcon from "./Icons/AccountIcon"
import { ModalToggleNotifications } from "./modals/ToggleNotificationIcon"

export default function NavbarDeployable() {
    const { logoutUser } = useAuth()
    const [isOpenDepoyable, setIsOpenDepoyable] = useState<boolean>(false)
    const [isNotification, setIsNotifications] = useState<"true" | "false">("false")
    const [isModalNotifications, setIsModalNotifications] = useState<boolean>(false)

    useEffect(() => {
        const storedNotifications = localStorage.getItem("notifications") as "true" | "false"
        if (storedNotifications) {
            setIsNotifications(storedNotifications)
        }
    }, [])

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
                        <a href="/account" className="h-6 cursor-pointer flex items-center gap-4">
                            <AccountIcon />
                            Cuenta
                        </a>
                    </li>
                    <li className="min-w-38 px-2 flex justify-start rounded-xl hover:bg-blue-400">
                        <button className="h-6 cursor-pointer flex items-center gap-4" onClick={toggleTheme}>
                            <DarkModeIcon />
                            Tema
                        </button>
                    </li>
                    <li className="min-w-38 px-2 flex justify-start rounded-xl hover:bg-blue-400">
                        <button className="h-6 cursor-pointer flex items-center gap-4" onClick={() => { setIsModalNotifications(true) }}>
                            {isNotification === "true"
                                ? <>
                                    <NotificationsOffIcon />
                                    <p>Desactiavar</p>
                                </>
                                : <>
                                    <NotificationsIcon />
                                    <p>Activar</p>
                                </>
                            }
                        </button>
                    </li>
                    <li className="min-w-38 px-2 flex justify-start rounded-xl hover:bg-blue-400">
                        <button className="h-6 cursor-pointer flex items-center gap-4" onClick={logoutUser}>
                            <div className="h-6">
                                <LogOutIcon />
                            </div>
                            Cerrar Sesión
                        </button>
                    </li>
                </ul>
            </div>

            {isModalNotifications &&
                <div className="fixed inset-0 top-1/2 left-1/2 -translate-1/2 z-100 w-full h-full bg-black/50 flex justify-center items-center">
                    <ModalToggleNotifications
                        isNotifications={isNotification}
                        setIsModalNotifications={setIsModalNotifications}
                        setIsNotifications={setIsNotifications}
                    />
                </div>
            }
        </div>
    )
}
