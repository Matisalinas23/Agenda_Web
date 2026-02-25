import { type FormEvent } from "react";
import { ButtonRegister } from "../components/Buttons/ButtonAccept";
import useForm from "../hooks/useForm";
import { useAuth } from "../hooks/useAuth";
import type { IRegisterUser } from "../interfaces/user.interface";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate()
  const { formValues, handleChange } = useForm<IRegisterUser>({
    username: "",
    email: "",
    password: ""
  })
  const inputNames = [
    "username",
    "email",
    "password",
  ]

  const { registerUser } = useAuth()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const user = await registerUser(formValues)

    if (!user) {
      alert("No se pudo completar el registro\nPor favor, intentalo de nuevo mas tarde.")
      return
    }

    navigate("/register/verification")
  }

  return (
    <div className="h-full flex bg-background dark:bg-background-dark items-center justify-center">
      <form onSubmit={handleSubmit} className="px-12 py-12 w-120 bg-secondary dark:bg-secondary-dark rounded-3xl flex flex-col items-center justify-center gap-12">
          <h2 className="text-accent dark:text-accent-dark font-bold text-3xl">Registrarse</h2>
          <div className="w-full flex flex-col gap-4">
            {inputNames.map(name => (
              <input key={name}
                type={name === "password" ? "password" : "text"}
                name={name}
                placeholder={name === "username" ? "Nombre de usuario" : name === "email" ? "Correo electrónico" : "Contraseña"}
                className="text-accent dark:text-accent-dark font-normal border-b border-blue-900/50 text-lg px-1 py-1"
                onChange={handleChange}
                value={formValues[name as keyof IRegisterUser]}
              />
            ))}
          </div>
          <ButtonRegister type="submit" text="Crear Cuenta" />
        </form>
    </div>
  )
}
