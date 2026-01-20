import { Link } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import { useAuth } from "../hooks/useAuth";

export default function Navbar() {
    const { isToken } = useAuthStore(state => state)
    const { logoutUser } = useAuth()

    return (
        <nav className="text-white bg-neutral-500 flex">
            <ul className= 'w-full py-4 px-8 flex gap-12' >
                <li>
                    <Link to="/" > Home </Link>
                </li>
            </ul>

            <div className="w-80 bg-[#656565] flex items-center justify-center" >{isToken
                ? <button className="bg-neutral-800 rounded-xl py-1 px-4 cursor-pointer" onClick={logoutUser}>Log Out</button>
                : <Link to={"/login"} className="bg-neutral-800 py-1 px-4 rounded-xl cursor-pointer">Iniciar Sesión</Link>
            }</div>
        </nav>
    )
}
