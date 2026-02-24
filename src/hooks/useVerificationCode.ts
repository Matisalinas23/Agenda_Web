import { useRef, useState, type ClipboardEvent, type KeyboardEvent } from "react";

export default function useVerificationCode(length: number) {
    const [code, setCode] = useState<string[]>(Array(length).fill(""));

    const inputsRef = useRef<(HTMLInputElement | null)[]>([])

    const handleChangeVerification = (value: string, index: number) => {
        if (!/^\d$/.test(value)) return;

        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        if (value && index < length - 1) {
            inputsRef.current[index + 1]?.focus();
        }
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key !== "Backspace") return;
    
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
        const pasted = e.clipboardData.getData("text").slice(0, length);
    
        if (!/^\d+$/.test(pasted)) return;
    
        const newCode = pasted.split("");
        setCode(newCode)
    
        newCode.forEach((char, i) => {
          if(inputsRef.current[i]) {
            inputsRef.current[i]!.value = char;
          }
        });
    }
    
    return {
        code,
        inputsRef,
        handleChangeVerification,
        handleKeyDown,
        handlePaste,
        isComplete: code.every(Boolean),
    }
}
