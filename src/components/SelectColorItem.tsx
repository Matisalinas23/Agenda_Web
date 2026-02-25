import type { Dispatch, SetStateAction } from "react"
import type { ICreateNote } from "../interfaces/notes"
import type { IColor } from "./SeleccionarColor"

type SelectColorItemProps = {
    setButtonColor: Dispatch<SetStateAction<string>>,
    setFormValues: Dispatch<SetStateAction<ICreateNote>>,
    setOpenSelectColor: Dispatch<SetStateAction<boolean>>,
    color: IColor,
}

export default function SelectColorItem({ setButtonColor, setFormValues, setOpenSelectColor, color }: SelectColorItemProps) {
    const handleSelectColor = (color: IColor) => {
        setButtonColor(color.code)
        setFormValues(prev => ({
            ...prev,
            color: color.code
        }))

        setOpenSelectColor(false)
    }

    return (
        <li
            key={color.name}
            onClick={() => handleSelectColor(color)}
            className="px-2 mr-1 rounded-lg flex items-center gap-2 cursor-pointer hover:bg-neutral-100"
        >
            <div className="h-3 w-3 rounded-full" style={{ backgroundColor: color.code }}></div>
            <p>{color.name}</p>
        </li>
    )
}
