import { useState } from "react";
import { Link } from "react-router-dom";
import Login from "./modals/Login";

export default function Navbar() {
    const [isLoginModal, setIsLoginModal] = useState<boolean>(false) // Modal login state
    const [isToken, setIsToken] = useState<boolean>(() => !!localStorage.getItem("token"))

    const handleLogout = () => {
        localStorage.removeItem("token")
        setIsToken(false)
    }

    return (
        <nav className="text-white bg-neutral-500 flex">
            <ul className= 'w-full py-4 px-8 flex gap-12' >
                <li>
                    <Link to="/" > Home </Link>
                </li>
            </ul>

            <div className="w-80 bg-[#656565] flex items-center justify-center" >{isToken
                ? <button className="bg-neutral-800 rounded-xl py-1 px-4 cursor-pointer" onClick={handleLogout}>Log Out</button>
                : <button className="bg-neutral-800 py-1 px-4 rounded-xl cursor-pointer" onClick={() => setIsLoginModal(true)}>Iniciar Sesión</button>
            }</div>

            {isLoginModal && <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
                <Login closeModal={() => {setIsLoginModal(false)}} setIsToken={setIsToken}/>
            </div>}
        </nav>
    )
}
