import type { ClipboardEvent, KeyboardEvent, RefObject } from "react"

type VerificationCodeInputProps = {
    index: number
    value: string
    handleChangeVerification: (value: string, index: number) => void
    handleKeyDown: (e: KeyboardEvent<HTMLInputElement>, index: number) => void
    handlePaste: (e: ClipboardEvent<HTMLInputElement>) => void
    inputsRef: RefObject<(HTMLInputElement | null)[]>
}

export const VerificationCodeInput = ({
    index,
    value,
    handleChangeVerification,
    handleKeyDown,
    handlePaste,
    inputsRef
}: VerificationCodeInputProps) => (
    <input
        key={index}
        ref={(el) => { inputsRef.current[index] = el }}
        type="text"
        inputMode="numeric"
        maxLength={1}
        value={value}
        onChange={(e) => handleChangeVerification(e.target.value, index)}
        onKeyDown={(e) => handleKeyDown(e, index)}
        onPaste={handlePaste}
        className="bg-white w-12 h-12 text-2xl text-center rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
    />
)
