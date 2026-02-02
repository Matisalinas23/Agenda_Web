import { useRef, useState, type Dispatch, type SetStateAction } from "react"
import useClickFuera from "../hooks/useClickFuera"; 
import type { IFormValues } from "../screens/agenda/agenda";

const colors: { code: string, name: string }[] = [
    { code: "#FF8989", name: "Rojo" },
    { code: "#FFAA74", name: "Naranja intenso" },
    { code: "#FFCF81", name: "Naranja" },
    { code: "#F6E878", name: "Amarillo" },
    { code: "#D1F392", name: "Verde manzana" },
    { code: "#87EEA6", name: "Verde esmeralda" },
    { code: "#95F5F5", name: "Azul turquesa" },
    { code: "#8CADFE", name: "Azul francia" },
    { code: "#C79EF3", name: "Morado" },
    { code: "#E7A1EA", name: "Fucsia" },
    { code: "#FFB8E9", name: "Rosado" },
    { code: "#B8B8B8", name: "Gris claro" },
    { code: "#6B6B6B", name: "Gris oscuro" },
]

export default function SeleccionarColor({ setFormValues, color}: { setFormValues: Dispatch<SetStateAction<IFormValues>>, color: string }) {
    const [openList, setOpenList] = useState<boolean>(false)
    const componentRef = useRef<HTMLDivElement>(null);

    const handleOpenList = () => {
        setOpenList(!openList)
    }

    const handleSelectColor = (col: { code: string, name: string }) => {
        setFormValues(prev => ({
            ...prev,
            color: col.code
        }))

        setOpenList(false)
    }

    useClickFuera(componentRef, () => { setOpenList(false) })

    return (
        <div className="relative" ref={componentRef}>
            <div
                onClick={handleOpenList} className="bg-neutral-500 cursor-pointer py-2 pl-2"
                style={openList ? {borderRadius: "12px 12px 0px 0px"} : {borderRadius: "12px"}}
            >
                {!color
                    ? <p>Seleccionar color</p>
                    : <div className="flex items-center gap-2">
                        <div style={{ backgroundColor: color }} className="h-4 w-4 rounded-full"></div>
                        {colors.map((c) => c.code === color && (<p>{c.name}</p>))}
                    </div>
                }
            </div>

            {openList &&
                <div className="absolute w-full h-60 p-2 rounded-b-xl bg-neutral-500">
                    <ul id="color" className="w-full h-full overflow-y-auto border-neutral-400 pr-2 flex flex-col gap-2">
                        {colors.map((c, index) => (
                            <li
                                className="cursor-pointer duration-300 hover:bg-neutral-400 rounded-xl px-3 py-1 flex items-center gap-2"
                                key={index} value={`option${index+1}`} onClick={() => handleSelectColor(c)}
                            >
                                <div className="h-4 w-4 rounded-full" style={{ backgroundColor: c.code }}></div>
                                {c.name}
                            </li>
                        ))}
                    </ul>
                </div>
            }
        </div>
    )
}
