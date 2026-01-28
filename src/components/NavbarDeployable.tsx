import { useState } from "react"
import { useAuth } from "../hooks/useAuth"
import "./css/NavbarDeployable.css"

export default function NavbarDeployable() {
    const { logoutUser } = useAuth()
    const [isOpenDepoyable, setIsOpenDepoyable] = useState<boolean>(false)
    return (
        <div className={`navbarSideSection ${isOpenDepoyable ? "open" : ""}`}>
                <button
                        className="h-14 cursor-pointer"
                        onClick={() => setIsOpenDepoyable(!isOpenDepoyable)}
                    >
                        <div className="bg-neutral-800 w-10 h-10 rounded-full"></div>
                </button>

                <div className="navbarDeployable">
                    <button onClick={logoutUser}>Cerrar Sesión</button>
                    <button onClick={logoutUser}>Cerrar Sesión</button>
                    <button onClick={logoutUser}>Cerrar Sesión</button>
                    <button onClick={logoutUser}>Cerrar Sesión</button>
                </div>
            </div>
    )
}
