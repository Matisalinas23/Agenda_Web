import { useRef, useState, type ClipboardEvent, type KeyboardEvent } from "react";
import api from "../data/http/axios";
import { ButtonAcceptMedium } from "../components/Buttons/ButtonAccept";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AccountVerification() {
  const CODE_LENGTH = 6;
  const [code, setCode] = useState<string[]>(Array(CODE_LENGTH).fill(""));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([])
  const navigate = useNavigate()

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
    const verificationToken = localStorage.getItem("verificationToken");
    const API_URL = import.meta.env.VITE_LOCAL_API_URL

    const res = await axios.post(`${API_URL}/auth/verify-email?token=${verificationToken}`);

    if (res.status !== 200) throw new Error("Verification token is invalid")

    alert(res.data.message)
    localStorage.removeItem("verificationToken")
    navigate("/login")
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
