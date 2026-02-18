interface ICancelButtonProps {
    onClick: () => void
    text?: string
}

interface ICancelButtonBase extends ICancelButtonProps{
  classname: string
}

const ButtonCancel = ({ onClick, text, classname }: ICancelButtonBase) => (
  <button
    className={"cursor-pointer py-2 bg-neutral-700 dark:bg-neutral-800 text-white rounded-full font-bold duration-200 hover:bg-neutral-600  " + classname}
    onClick={onClick}
  >
    {text ?? "CANCELAR"}
  </button>
)

export const ButtonCancelBig = ({ onClick, text }: ICancelButtonProps) => (
  <ButtonCancel classname="text-xl w-full" onClick={onClick} text={text} />
)

export const ButtonCancelMedium = ({ onClick, text }: ICancelButtonProps) => (
  <ButtonCancel classname="w-48" onClick={onClick} text={text} />
)

export const ButtonCancelSmall = ({ onClick, text }: ICancelButtonProps) => (
  <ButtonCancel classname="text-sm w-24" onClick={onClick} text={text} />
)
