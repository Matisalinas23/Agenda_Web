import { useRef, useState, type ClipboardEvent, type FormEvent, type KeyboardEvent } from "react";
import { ButtonAcceptMedium, ButtonRegister } from "../components/Buttons/ButtonAccept";
import useForm from "../hooks/useForm";
import { useAuth } from "../hooks/useAuth";
import type { IRegisterUser } from "../interfaces/user.interface";
import api from "../data/http/axios";

const AccountVerificator = ({ verificationToken }: { verificationToken: string }) => {
  const CODE_LENGTH = 6;
  const [code, setCode] = useState<string[]>(Array(CODE_LENGTH).fill(""));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([])

  const handleChange = (value: string, index: number) => {
    if (!/^\d$/.test(value)) throw new Error("Verification token is invalid");

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < CODE_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key !== "Backspace") return

    e.preventDefault();
    const newCode = [...code];

    if (code[index]) {
      newCode[index] = "";
      setCode(newCode);
    } else if (index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  }

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").slice(0, CODE_LENGTH);

    if (!/^\d+$/.test(pasted)) return

    const newCode = pasted.split("");
    setCode(newCode)

    newCode.forEach((char, i) => {
      if(inputsRef.current[i]) {
        inputsRef.current[i]!.value = char
      }
    });
  }

  const handleConfirmToken = async () => {
    const res = await api.post(`/auth/verify-email?token=${verificationToken}`)

    if (res.status !== 200) throw new Error("Verification token is invalid")

    alert(res.data.message)
  }

  return (
    <div className="py-16 px-24 rounded-3xl bg-secondary flex flex-col justify-center items-center gap-8">
      <h2 className="text-2xl text-primary dark:text-primary-dark font-medium">Introduce el código de verificación</h2>
      <div className="w-full my-8 flex justify-center gap-2">
        {code.map((value, index) => (
          <input
            key={index}
            ref={(el) => {inputsRef.current[index] = el}}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={value}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={handlePaste}
            className="bg-white w-12 h-12 text-2xl text-center rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
          />
        ))}
      </div>

      <ButtonAcceptMedium type="button" text="Confirmar" onClick={handleConfirmToken} />

      <div className="flex gap-4">
        <p>¿ No recibiste ningún codigo ?</p>
        <button className="text-primary dark:text-primary-dark cursor-pointer hover:text-blue-400" onClick={() => {}}>
          REENVIAR CÓDIGO
        </button>
      </div>
    </div>
  )
}

export default function Register() {
  const [isVerificarionProcess, setIsVerificationProcess] = useState<boolean>(false)
  const [verificationToken, setVerificationToken] = useState<string>("");
  const { formValues, handleChange } = useForm<IRegisterUser>({
    username: "",
    email: "",
    password: ""
  })

  const { registerUser } = useAuth()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { user, verificationToken } = await registerUser(formValues)

    if (!user || !verificationToken) {
      alert("No se pudocompletar el registro\nPor favor, intentalo de nuevo mas tarde.")
      return
    }

    setIsVerificationProcess(true)
    setVerificationToken(verificationToken)
  }

  return (
    <div className="h-full flex bg-background dark:bg-background-dark items-center justify-center">
      {isVerificarionProcess ?
        <AccountVerificator verificationToken={verificationToken} />

        :

        <form onSubmit={handleSubmit} className="px-12 py-12 w-120 bg-secondary dark:bg-secondary-dark rounded-3xl flex flex-col items-center justify-center gap-12">
          <h2 className="text-accent dark:text-accent-dark font-bold text-3xl">Registrarse</h2>

          <div className="w-full flex flex-col gap-4">
            <input type="text" className="text-accent dark:text-accent-dark font-normal border-b border-blue-900/50 text-lg px-1 py-1" name="username"
              onChange={handleChange} value={formValues.username} placeholder="Nombre de usuario"
            />
            <input type="text" className="text-accent dark:text-accent-dark font-normal border-b border-blue-900/50 text-lg px-1 py-1" name="email"
              onChange={handleChange} value={formValues.email} placeholder="Correo electrónico"
            />
            <input type="password" className="text-accent dark:text-accent-dark font-normal border-b border-blue-900/50 text-lg px-1 py-1" name="password"
              onChange={handleChange} value={formValues.password} placeholder="Contraseña"
            />
          </div>

          <ButtonRegister type="submit" text="Crear Cuenta" />
        </form>
      }
    </div>
  )
}
