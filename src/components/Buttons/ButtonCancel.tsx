interface ICancelButtonProps {
    onClick: () => void
    text?: string
}

interface ICancelButtonBase extends ICancelButtonProps{
  classname: string
}

const ButtonCancel = ({ onClick, text, classname }: ICancelButtonBase) => (
  <button onClick={onClick}
    className={"cursor-pointer py-2 bg-neutral-700 text-white rounded-full font-bold duration-200 hover:bg-neutral-600 " + classname}
  >
    {text ?? "CANCELAR"}
  </button>
)

export const ButtonCancelBig = ({ onClick, text }: ICancelButtonProps) => (
  <ButtonCancel onClick={onClick} text={text} classname="text-xl w-full" />
)

export const ButtonCancelMedium = ({ onClick, text }: ICancelButtonProps) => (
  <ButtonCancel onClick={onClick} text={text} classname="w-48" />
)


export const ButtonCancelSmall = ({ onClick, text }: ICancelButtonProps) => (
  <ButtonCancel onClick={onClick} text={text} classname="text-sm w-24" />
)
