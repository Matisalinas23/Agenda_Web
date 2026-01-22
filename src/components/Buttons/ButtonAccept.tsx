import "./buttonAccept.css"

interface IAcceptButtonProps {
    onClick?: () => void
    text?: string
    type: "button" | "reset" | "submit"
}

interface IAcceptButtonBase extends IAcceptButtonProps {
    classExtension?: string
    classname?: string
}

const ButtonAccept = ({ onClick, text, type, classname, classExtension }: IAcceptButtonBase) => (
  <button onClick={onClick} type={type ?? "button"}
    className={classname + " cursor-pointer py-2 bg-primary text-neutral-100/90 font-bold rounded-full duration-200 " + classExtension}
  >
    <span className="relative">
      {text ?? "ACEPTAR"}
    </span>
  </button>
) // space at start and end off className is very important

export const ButtonAcceptBig = ({ onClick, text, type }: IAcceptButtonProps) => (
  <ButtonAccept onClick={onClick} text={text} type={type} classExtension="text-xl w-full" />
)

export const ButtonAcceptMedium = ({ onClick, text, type }: IAcceptButtonProps) => (
  <ButtonAccept classExtension="text-lg w-48" onClick={onClick} type={type ?? "button"} text={text} />
)

export const ButtonAcceptSmall = ({ onClick, text, type }: IAcceptButtonProps) => (
  <ButtonAccept classExtension="text-md w-24" onClick={onClick} type={type ?? "button"} text={text} />
)

export const ButtonRegister = ({ onClick, text, type }: IAcceptButtonProps) => (
  <ButtonAccept classname="button-register" onClick={onClick} text={text} type={type} classExtension="relative overflow-hidden text-xl w-full" />
)
