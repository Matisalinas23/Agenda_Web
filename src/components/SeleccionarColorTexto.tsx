import { useState } from "react"

export default function SeleccionarColorTexto() {
    const [openList, setOpenList] = useState<boolean>(false)

    const handleOpenList = () => {
        setOpenList(!openList)
    }
  return (
    <div className="relative">
        <div className="bg-neutral-600 cursor-pointer py-2 px-2" onClick={handleOpenList}>
            Seleccionar color del texto
        </div>
        {openList &&
            <ul className="absolute w-full bg-neutral-600 border-t border-neutral-400 p-2">
                <li className="cursor-pointer hover:bg-neutral-500 rounded-xl px-3 py-1 flex items-center gap-2">
                    <div className="h-4 w-4 rounded-full bg-white"></div>
                    Blanco
                </li>
                <li className="cursor-pointer hover:bg-neutral-500 rounded-xl px-3 py-1 flex items-center gap-2">
                    <div className="h-4 w-4 rounded-full bg-neutral-900"></div>
                    Negro
                </li>
            </ul>
        }
    </div>
  )
}
