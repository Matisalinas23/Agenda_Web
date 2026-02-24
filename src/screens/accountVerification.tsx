import { ButtonAcceptMedium } from "../components/Buttons/ButtonAccept";
import { useNavigate } from "react-router-dom";

import useVerificationCode from "../hooks/useVerificationCode";
import { verifyAccountHttp } from "../data/http/auth";
import { VerificationCodeInput } from "../components/VerificationCodeInput";
import type { FormEvent } from "react";

export default function AccountVerification() {
  const { code, inputsRef, handleChangeVerification, handleKeyDown, handlePaste } = useVerificationCode(6);
  const navigate = useNavigate();

  const handleSubmitVerification = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const verificationToken = localStorage.getItem("verificationToken");
    if (!verificationToken) {
      console.log("Verification token is required in local storage")
      return
    }

    try {
      const message = await verifyAccountHttp(verificationToken!);
      alert(message);
      localStorage.removeItem("verificationToken");
      navigate("/login");
    } catch (error) {
      alert("Codigo invalido o expierado\nPor favor, solicita un nuevo codigo de verificación.");
    }
  }

  return (
    <div className="h-full bg-background dark:bg-background-dark flex flex-col justify-center items-center">
      <form onSubmit={handleSubmitVerification} className="w-fit py-16 px-24 rounded-3xl bg-secondary flex flex-col justify-center items-center gap-8">
        <h2 className="text-2xl text-primary dark:text-primary-dark font-medium">Introduce el código de verificación</h2>
        <div className="w-full my-8 flex justify-center gap-2">
          {code.map((value, index) => (
            <VerificationCodeInput
              index={index}
              value={value}
              handleChangeVerification={handleChangeVerification}
              handleKeyDown={handleKeyDown}
              handlePaste={handlePaste}
              inputsRef={inputsRef}
            />
          ))}
        </div>

        <ButtonAcceptMedium type="submit" text="Confirmar" isDisabled={!code.every(Boolean)} />

        <div className="flex gap-4">
          <p>¿ No recibiste ningún codigo ?</p>
          <button className="text-primary dark:text-primary-dark cursor-pointer hover:text-blue-400" onClick={() => { }}>
            REENVIAR CÓDIGO
          </button>
        </div>
      </form>
    </div>
  )
}
