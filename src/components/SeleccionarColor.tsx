import { useRef, useState, type Dispatch, type SetStateAction } from "react"
import type { IFormValues } from "../screens/agenda/agenda"
import useClickFuera from "../hooks/useClickFuera";

const colors: { code: string, color: string }[] = [
    { code: "#E54444", color: "Rojo" },
    { code: "#F38A48", color: "Naranja intenso" },
    { code: "#F4B146", color: "Naranja" },
    { code: "#F0DE51", color: "Amarillo" },
    { code: "#BAEB5E", color: "Verde manzana" },
    { code: "#56EB83", color: "Verde esmeralda" },
    { code: "#6CEDED", color: "Azul turquesa" },
    { code: "#5F62F2", color: "Azul francia" },
    { code: "#AF78EA", color: "Morado" },
    { code: "#E171E6", color: "Fucsia" },
    { code: "#FF86DB", color: "Rosado" },
    { code: "#828282", color: "Gris claro" },
    { code: "#323232", color: "Gris oscuro" },
]

export default function SeleccionarColor({ setFormValues }: { setFormValues: Dispatch<SetStateAction<IFormValues>> }) {
    const [openList, setOpenList] = useState<boolean>(false)
    const componentRef = useRef<HTMLDivElement>(null);

    const handleOpenList = () => {
        setOpenList(!openList)
    }

    const handleSelectColor = (color: string) => {
        setFormValues(prev => ({
            ...prev,
            color: color
        }))

        setOpenList(false)
    }

    useClickFuera(componentRef, () => { setOpenList(false) })

    return (
        <div className="relative" ref={componentRef}>
            <div onClick={handleOpenList} className="bg-neutral-600 cursor-pointer py-2 pl-2">
                Seleccionar color
            </div>

            {openList &&
                <ul id="color" className="absolute w-full h-60 overflow-y-auto border-t border-neutral-400 p-2 bg-neutral-600 flex flex-col gap-2">
                    {colors.map((col, index) => (
                        <li
                            className="cursor-pointer hover:bg-neutral-500 rounded-xl px-3 py-1 flex items-center gap-2"
                            key={index} value={`option${index+1}`} onClick={() => handleSelectColor(col.color)}
                        >
                            <div className={`h-4 w-4 rounded-full`} style={{ backgroundColor: col.code }}></div>
                            {col.color}
                        </li>
                    ))}
                </ul>
            }
        </div>
    )
}
