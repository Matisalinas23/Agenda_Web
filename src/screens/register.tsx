import type { FormEvent } from "react"
import { ButtonRegister } from "../components/Buttons/ButtonAccept"
import useForm from "../hooks/useForm"
import { useAuth } from "../hooks/useAuth"
import type { IRegisterUser } from "../interfaces/user.interface"
import { useNavigate } from "react-router-dom"

export default function Register() {
  const { formValues, handleChange } = useForm<IRegisterUser>({
    username: "",
    email: "",
    password: ""
  })

  const { registerUser } = useAuth()
  const navigate = useNavigate()

  const inpuStyle = "text-accent font-normal border-b border-blue-900/50 text-lg px-1 py-1"

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const isRegistered = await registerUser(formValues)

    if (!isRegistered) {
      alert("No se pudocompletar el registro\nPor favor, intentalo de nuevo mas tarde.")
      return
    }

    navigate("/login")
    alert(`Cuenta creada\n\nusuario: ${formValues.username}`)
  }

  return (
    <div className="h-full flex items-center justify-center">
      <form onSubmit={handleSubmit} className="px-12 py-12 w-120 bg-secondary rounded-3xl flex flex-col items-center justify-center gap-12">
          <h2 className="text-accent font-bold text-3xl">Registrarse</h2>

          <div className="w-full flex flex-col gap-4">
            <input type="text" className={inpuStyle} name="username"
              onChange={handleChange} value={formValues.username} placeholder="Nombre de usuario"
            />
            <input type="text" className={inpuStyle} name="email"
              onChange={handleChange} value={formValues.email} placeholder="Correo electrónico"
            />
            <input type="password" className={inpuStyle} name="password"
              onChange={handleChange} value={formValues.password} placeholder="Contraseña"
            />
          </div>

          <ButtonRegister type="submit" text="Crear Cuenta"/>
        </form>
    </div>
  )
}
