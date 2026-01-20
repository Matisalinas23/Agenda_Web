interface ICancelButtonProps {
    onClick?: () => void
    text?: string
    type?: "button" | "reset" | "submit"
}

export const ButtonAcceptBig = ({ onClick, text, type }: ICancelButtonProps) => {
  return (
    <button
        onClick={onClick} type={type ?? "button"}
        className="cursor-pointer text-xl py-2 w-full bg-blue-300 text-blue-900 font-bold rounded-xl duration-200 hover:bg-blue-200"
    >
        {text ?? "ACEPTAR"}
    </button>
  )
}

export const ButtonAcceptMedium = ({ onClick, text, type }: ICancelButtonProps) => {
  return (
    <button
        onClick={onClick} type={type ?? "button"}
        className="cursor-pointer py-2 w-48 bg-blue-300 text-blue-900 font-bold rounded-xl duration-200 hover:bg-blue-200"
    >
        {text ?? "ACEPTAR"}
    </button>
  )
}

export const ButtonAcceptSmall = ({ onClick, text, type }: ICancelButtonProps) => {
  return (
    <button
        onClick={onClick} type={type ?? "button"}
        className="cursor-pointer text-sm py-2 w-24 bg-blue-300 text-blue-900 font-bold rounded-xl duration-200 hover:bg-blue-200"
    >
        {text ?? "ACEPTAR"}
    </button>
  )
}

