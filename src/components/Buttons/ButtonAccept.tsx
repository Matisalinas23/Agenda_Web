import "./buttonAccept.css"

interface IAcceptButtonProps {
    onClick?: () => void
    text?: string
    type: "button" | "reset" | "submit"
    isDisabled?: boolean
}

interface IAcceptButtonBase extends IAcceptButtonProps {
    classExtension?: string
    classname?: string
}

const ButtonAccept = ({ onClick, text, type, classname, classExtension, isDisabled }: IAcceptButtonBase) => (
  <button
    type={type ?? "button"}
    className={classname + " cursor-pointer py-2 bg-primary dark:bg-primary-dark text-neutral-100/90 font-bold rounded-full duration-200 hover:bg-blue-400 " + classExtension}
    onClick={onClick}
    disabled={isDisabled}
  >
    <p className="relative">
      {text ?? "ACEPTAR"}
    </p>
  </button>
) // space at start and end of the className is very important

export const ButtonAcceptBig = ({ onClick, text, type, isDisabled }: IAcceptButtonProps) => (
  <ButtonAccept type={type ?? "button"} onClick={onClick} text={text} isDisabled={isDisabled} classExtension="text-xl w-full" />
)

export const ButtonAcceptMedium = ({ onClick, text, type, isDisabled }: IAcceptButtonProps) => (
  <ButtonAccept type={type ?? "button"} classExtension="text-lg w-48" onClick={onClick} text={text} isDisabled={isDisabled} />
)

export const ButtonAcceptSmall = ({ onClick, text, type, isDisabled }: IAcceptButtonProps) => (
  <ButtonAccept type={type ?? "button"} classExtension="text-md w-24" onClick={onClick} text={text} isDisabled={isDisabled} />
)

export const ButtonRegister = ({ onClick, text, isDisabled }: IAcceptButtonProps) => (
  <ButtonAccept type="submit" classname="button-register" onClick={onClick} text={text} isDisabled={isDisabled} classExtension="relative overflow-hidden text-xl w-full" />
)
