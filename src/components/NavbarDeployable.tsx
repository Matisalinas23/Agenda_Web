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
                    <div className="w-full text-center cursor-pointer">Tema</div> {/* Icono de tema claro oscuro */}
                    <div className="w-full text-center cursor-pointer">Notificaciones</div> {/* Icono activer/desactivar notis implementar con servicios de google, android y windows mas tarde */}
                    <button className="cursor-pointer" onClick={logoutUser}>Cerrar Sesión</button> {/* Icono de cerrar sesion */}
                </div>
            </div>
    )
}
