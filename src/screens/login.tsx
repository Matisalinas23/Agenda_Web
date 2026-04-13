import { type FormEvent } from "react"
import useForm from "../hooks/useForm" 
import { useAuth } from "../hooks/useAuth"
import { Link } from "react-router-dom"
import { ButtonRegister as ButtonLogin } from "../components/Buttons/ButtonAccept"
import { RegisterLoginUserIcon } from "../components/Icons/RegisterLoginUserIcon"
import { GoogleIcon } from "../components/Icons/GoogleIcon"

export default function Login() {
    const { formValues, handleChange } = useForm({
        email: "",
        password: ""
    })

    const { loginUser, loginWithGoogle } = useAuth()

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        await loginUser(formValues)
    }

    return (
        <div className="h-full flex bg-background dark:bg-background-dark flex-col items-center justify-center gap-8">
            <form className=" text-white w-fit bg-secondary dark:bg-secondary-dark rounded-3xl p-12 flex flex-col gap-12 items-center" onSubmit={handleSubmit}>
                <div className="h-16 w-16">
                    <RegisterLoginUserIcon />
                </div>

                <div className="flex flex-col gap-4">
                    <input
                        className="text-accent dark:text-accent-dark font-normal border-b border-blue-900/50 dark:border-blue-900/80 text-lg px-1 py-1"
                        name="email" type="text" placeholder="Correo"
                        value={formValues.email} onChange={handleChange} 
                    />
                    <input className="text-accent dark:text-accent-dark font-normal border-b border-blue-900/50 dark:border-blue-900/80 text-lg px-1 py-1 mb-4"
                        name="password" type="password" placeholder="Contraseña" hidden={false}
                        value={formValues.password} onChange={handleChange}
                    />
                </div>

                <div className="flex flex-col gap-4 w-full">
                    <ButtonLogin type="submit" text="Iniciar sesión" />
                    
                    <button 
                        type="button" 
                        onClick={loginWithGoogle}
                        className="cursor-pointer flex items-center justify-center gap-3 bg-white text-gray-700 font-semibold py-2 px-4 rounded-xl border border-gray-300 cursor-pointerhover:bg-gray-50 transition-colors w-full"
                    >
                        <div className="h-6">
                            <GoogleIcon />
                        </div>
                        Inicia con Google
                    </button>
                </div>
            </form>

            <div className="flex gap-2 dark:text-white">
                <p>¿Aún no tienes una cuenta?</p>
                <Link to={"/register"} className="text-blue-700 dark:text-blue-500 hover:text-primary">
                    Crear una cuenta
                </Link>
            </div>
        </div>
    )
}
