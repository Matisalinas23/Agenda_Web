import { useRef, type Dispatch, type SetStateAction } from "react"
import useClickFuera from "../hooks/useClickFuera"; 
import type { ICreateNote } from "../interfaces/notes"; 

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
    setButtonColor: (el: string) => void,
    closeModal: () => void,
}

export default function SeleccionarColor({ setFormValues, setButtonColor, closeModal }: SeleccionarColorProps) {
    const componentRef = useRef<HTMLDivElement>(null);

    const handleSelectColor = (col: { code: string, name: string }) => {
        setButtonColor(col.code)
        setFormValues(prev => ({
            ...prev,
            color: col.code
        }))

        closeModal()
    }

    useClickFuera(componentRef, () => { closeModal() })

    return (
        <div className="absolute right-0 top-22 z-10 h-26 w-fit p-2 rounded-xl bg-white" ref={componentRef}>
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
    )
}
