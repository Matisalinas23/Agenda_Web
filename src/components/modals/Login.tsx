import { type Dispatch, type FormEvent, type SetStateAction } from "react"
import { loginHttp } from "../../data/http/auth"
import useForm from "../../hooks/useForm"

type LoginProps = {
    closeModal: () => void,
    setIsToken: Dispatch<SetStateAction<boolean>>
}

export default function Login({ closeModal, setIsToken }: LoginProps) {
    const { formValues, handleChange } = useForm({
        email: "",
        password: ""
    })

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const isLogin = await loginHttp(formValues)

        if (!isLogin) {
            alert("hubo un pproblema al iniciar sesión, por favor intentelo denuevo mas tarde")
            return
        }

        setIsToken(true)
        closeModal()
    }

    return (
        <div className="absolute top-1/2 left-1/2 -translate-1/2 h-100 w-80 bg-neutral-500 px-10 py-20
            flex flex-col justify-center items-center gap-8"
        >
            <div className="h-20 w-18 rounded-full border-2 border-neutral-800"></div>

            <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
                <input className="bg-neutral-800 px-2 py-1" name="email"
                    value={formValues.email} onChange={handleChange} type="text" placeholder="email"
                />
                <input className="bg-neutral-800 px-2 py-1" name="password"
                    value={formValues.password} onChange={handleChange} type="password"
                    hidden={false} placeholder="Contraseña"
                />

                <div className="w-full flex justify-between">
                    <button className="bg-neutral-800 w-24 py-2 rounded-xl cursor-pointer" onClick={closeModal}>Cerrar</button>
                    <button type="submit" className="bg-blue-500 w-24 py-2 rounded-xl cursor-pointer">Aceptar</button>
                </div>
            </form>
        </div>
    )
}

