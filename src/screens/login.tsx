import { type FormEvent } from "react"
import useForm from "../hooks/useForm" 
import { useAuth } from "../hooks/useAuth"
import { Link, useNavigate } from "react-router-dom"
import { ButtonRegister as ButtonLogin } from "../components/Buttons/ButtonAccept"
import { RegisterLoginUserIcon } from "../components/Icons/RegisterLoginUserIcon"

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
        <div className="h-full flex border flex-col items-center justify-center gap-8">
            <form className=" text-white w-fit bg-secondary rounded-3xl p-12 flex flex-col gap-12 items-center" onSubmit={handleSubmit}>
                    <div className="h-16 w-16">
                        <RegisterLoginUserIcon />
                    </div>
                    
                    <div className="flex flex-col gap-4">
                        <input className="text-accent font-normal border-b border-blue-900/50 text-lg px-1 py-1" name="email"
                            value={formValues.email} onChange={handleChange} type="text" placeholder="Correo"
                        />
                        <input className="text-accent font-normal border-b border-blue-900/50 text-lg px-1 py-1 mb-4" name="password"
                            value={formValues.password} onChange={handleChange} type="password"
                            hidden={false} placeholder="Contraseña"
                        />
                    </div>

                    <ButtonLogin type="submit" text="Iniciar sesión" />
                </form>

            <div className="flex gap-2">
                <p>¿Aún no tienes una cuenta?</p>
                <Link to={"/register"} className="text-blue-700 hover:text-blue-500 active:text-blue-400">Crear una cuenta</Link>
            </div>
        </div>
    )
}
