import { useRef, useState, type Dispatch, type MouseEvent, type SetStateAction } from "react"
import type { ICreateNote } from "../interfaces/notes.interface"; 
import useClickFuera from "../hooks/useClickFuera";
import SelectColorItem from "./SelectColorItem";

export interface IColor {
    code: string,
    name: string,
}

const colors: IColor[] = [
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
                        <SelectColorItem
                            key={c.code}
                            setButtonColor={setButtonColor}
                            setFormValues={setFormValues}
                            setOpenSelectColor={setOpenSelectColor}
                            color={c}
                        />
                    ))}</ul>
                </div>
            }
        </div>
    )
}
