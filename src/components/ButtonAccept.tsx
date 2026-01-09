interface ICancelButtonProps {
    onClick: () => void
}

export const ButtonAcceptBig = ({ onClick }: ICancelButtonProps) => {
  return (
    <button
        onClick={onClick}
        className="cursor-pointer text-xl py-2 w-full bg-blue-300 text-blue-900 font-bold rounded-xl duration-200 hover:bg-blue-200"
    >
        ACEPTAR
    </button>
  )
}

export const ButtonAcceptMedium = ({ onClick }: ICancelButtonProps) => {
  return (
    <button
        onClick={onClick}
        className="cursor-pointer py-2 w-48 bg-blue-300 text-blue-900 font-bold rounded-xl duration-200 hover:bg-blue-200"
    >
        ACEPTAR
    </button>
  )
}

export const ButtonAcceptSmall = ({ onClick }: ICancelButtonProps) => {
  return (
    <button
        onClick={onClick}
        className="cursor-pointer text-sm py-2 w-24 bg-blue-300 text-blue-900 font-bold rounded-xl duration-200 hover:bg-blue-200"
    >
        ACEPTAR
    </button>
  )
}

