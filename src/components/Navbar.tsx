import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
    const [isLogin, setIsLogin] = useState<boolean>(false)

    useEffect(() => { console.log(isLogin) }, [isLogin])

    return (
        <nav className="bg-neutral-500 flex">
            <ul className= 'w-full py-4 px-8 flex gap-12' >
                <li>
                    <Link to="/" > Home </Link>
                </li>
            </ul>

            <div className="w-80 bg-[#656565] flex items-center justify-center" >{isLogin
                ? <div><p>Sesion Iniciada</p></div>
                : <button className="bg-neutral-800 text-white py-1 px-4 rounded-xl" onClick={() => setIsLogin(true)}>Iniciar Sesión</button>
            }</div>

            {isLogin && <div className="fixed top-1/2 left-1/2 -translate-1/2 h-100 w-80 bg-neutral-500">Login</div>}
        </nav>
    )
}
