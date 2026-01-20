import { type FormEvent } from "react"
import useForm from "../hooks/useForm" 
import { useAuth } from "../hooks/useAuth"
import { Link, useNavigate } from "react-router-dom"

export default function Login() {
    const { formValues, handleChange } = useForm({
        email: "",
        password: ""
    })

    const { loginUser } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        const isLogin = await loginUser(formValues)
        
        if (!isLogin) {
            alert("hubo un pproblema al iniciar sesión, por favor intentelo denuevo mas tarde")
            return
        }

        navigate("/")
    }

    return (
        <div className="h-full flex border flex-col items-center justify-center gap-4">
            <div className="text-white h-100 w-80 bg-neutral-500 px-10 py-20
                flex flex-col justify-center items-center gap-8"
            >
                <div className="h-20 w-18 rounded-full border-2 border-neutral-800"></div>

                <form className=" text-white w-full flex flex-col gap-4" onSubmit={handleSubmit}>
                    <input className="bg-neutral-800 px-2 py-1" name="email"
                        value={formValues.email} onChange={handleChange} type="text" placeholder="email"
                    />
                    <input className="bg-neutral-800 px-2 py-1" name="password"
                        value={formValues.password} onChange={handleChange} type="password"
                        hidden={false} placeholder="Contraseña"
                    />

                    <div className="w-full flex justify-between">
                        <button type="submit" className="bg-blue-500 w-24 py-2 rounded-xl cursor-pointer">Iniciar Sesion</button>
                    </div>
                </form>
            </div>

            <Link to={"/register"} className="hover:text-blue-700 active:text-blue-400">Crear una cuenta</Link>
        </div>
    )
}
