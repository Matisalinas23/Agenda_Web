import { useState } from "react"
import { useNotes } from "../hooks/useNotes"

export default function OrderNotes() {
  const [isOrder, setIsOrder] = useState<boolean>(false)
  const { orderNotesByAssignature } = useNotes()

  const handleOrderNotesByAssignature = () => {
    orderNotesByAssignature()
    setIsOrder(false)
  }

  return (
    <div className="relative w-fit">
      <button
        type="button"
        className="w-38 py-1 rounded-xl text-white font-normal cursor-pointer bg-primary"
        onClick={() => setIsOrder(!isOrder)}
      >
        Filtrar por
      </button>

      {isOrder &&
        <ul className="absolute w-full py-2 px-2 mt-2 z-10 bg-primary text-white rounded-xl">
          <li
            className="px-4 py-1 hover:bg-white/20 rounded-xl cursor-pointer"
          >
            Por fecha
          </li>
          <li
            className="px-4 py-1 hover:bg-white/20 rounded-xl cursor-pointer"
            onClick={handleOrderNotesByAssignature}  
          >
            Por asignatura
          </li>
        </ul>
      }
    </div>
  )
}
