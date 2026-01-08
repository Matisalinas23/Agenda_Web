import { useRef, useState, type Dispatch, type SetStateAction } from "react"
import useClickFuera from "../hooks/useClickFuera";
import type { IFormValues } from "./FormularioAñadirNota";

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
    const [selectedColor, setSelectedColor] = useState<{ code: string, color: string }>(null)
    const componentRef = useRef<HTMLDivElement>(null);

    const handleOpenList = () => {
        setOpenList(!openList)
    }

    const handleSelectColor = (col: { code: string, color: string }) => {
        setFormValues(prev => ({
            ...prev,
            color: col.code
        }))

        setSelectedColor({ code: col.code, color: col.color })
        setOpenList(false)
    }

    useClickFuera(componentRef, () => { setOpenList(false) })

    return (
        <div className="relative" ref={componentRef}>
            <div
                onClick={handleOpenList} className="bg-neutral-500 cursor-pointer py-2 pl-2"
                style={openList ? {borderRadius: "12px 12px 0px 0px"} : {borderRadius: "12px"}}
            >
                {selectedColor === null
                    ? <p>Seleccionar color</p>
                    : <div className="flex items-center gap-2">
                        <div style={{ backgroundColor: selectedColor.code }} className="h-4 w-4 rounded-full"></div>
                        {selectedColor.color}
                    </div>
                }
            </div>

            {openList &&
                <div className="absolute w-full h-60 p-2 rounded-b-xl bg-neutral-500">
                    <ul id="color" className="w-full h-full overflow-y-auto border-neutral-400 pr-2 flex flex-col gap-2">
                        {colors.map((col, index) => (
                            <li
                                className="cursor-pointer duration-300 hover:bg-neutral-400 rounded-xl px-3 py-1 flex items-center gap-2"
                                key={index} value={`option${index+1}`} onClick={() => handleSelectColor(col)}
                            >
                                <div className="h-4 w-4 rounded-full" style={{ backgroundColor: col.code }}></div>
                                {col.color}
                            </li>
                        ))}
                    </ul>
                </div>
            }
        </div>
    )
}
