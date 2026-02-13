import { useRef, useState, type Dispatch, type MouseEvent, type SetStateAction } from "react"
import type { ICreateNote } from "../interfaces/notes"; 
import useClickFuera from "../hooks/useClickFuera";

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

type SeleccionarColorProps = {
    setFormValues: Dispatch<SetStateAction<ICreateNote>>,
}

export default function SeleccionarColor({ setFormValues }: SeleccionarColorProps) {
    const [buttonColor, setButtonColor] = useState<string | null>(null);
    const [openSelectColor, setOpenSelectColor] = useState<boolean>(false);
    const componentRef = useRef<HTMLDivElement>(null);

    const handleSelectColor = (col: { code: string, name: string }) => {
        setButtonColor(col.code)
        setFormValues(prev => ({
            ...prev,
            color: col.code
        }))

        setOpenSelectColor(false)
    }

    const toggleSelectColor = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        setOpenSelectColor(!openSelectColor)
    }

    useClickFuera(componentRef, () => setOpenSelectColor(false))

    return (
        <div ref={componentRef}>
            <button
                type="button"
                className="w-12 h-12 rounded-full cursor-pointer"
                style={buttonColor ? { backgroundColor: buttonColor } : { backgroundColor: "#3686FF" }}
                onClick={(e) => toggleSelectColor(e)}
            >
            </button>

            {openSelectColor &&
                <div className="absolute mt-2 right-0 top-22 z-10 h-26 w-fit p-2 rounded-xl bg-white">
                    <ul className="h-full overflow-y-auto flex flex-col gap-2">{colors.map(c => (
                        <li
                            key={c.name}
                            onClick={() => handleSelectColor(c)}
                            className="px-2 mr-1 rounded-lg flex items-center gap-2 cursor-pointer hover:bg-neutral-100"
                        >
                            <div className="h-3 w-3 rounded-full" style={{backgroundColor: c.code}}></div>
                            {c.name}
                        </li>
                    ))}</ul>
                </div>
            }
        </div>
    )
}
