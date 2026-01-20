interface ICancelButtonProps {
    onClick: () => void
    text?: string
}

export const ButtonCancelBig = ({ onClick, text }: ICancelButtonProps) => {
  return (
    <button
        onClick={onClick}
        className="cursor-pointer text-xl py-2 w-full bg-neutral-800 text-white font-semibold rounded-xl duration-200 hover:bg-neutral-600"
    >
        {text ?? "CANCELAR"}
    </button>
  )
}

export const ButtonCancelMedium = ({ onClick, text }: ICancelButtonProps) => {
  return (
    <button
        onClick={onClick}
        className="cursor-pointer py-2 w-48 bg-neutral-800 text-white font-semibold rounded-xl duration-200 hover:bg-neutral-600"
    >
        {text ?? "CANCELAR"}
    </button>
  )
}

export const ButtonCancelSmall = ({ onClick, text }: ICancelButtonProps) => {
  return (
    <button
        onClick={onClick}
        className="cursor-pointer text-sm py-2 w-24 bg-neutral-800 text-white font-semibold rounded-xl duration-200 hover:bg-neutral-600"
    >
        {text ?? "CANCELAR"}
    </button>
  )
}