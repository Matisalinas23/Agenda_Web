import { useState } from "react"
import { useNotes } from "../hooks/useNotes"

export default function OrderNotes() {
  const [isOrder, setIsOrder] = useState<boolean>(false)
  const { orderNotesByAssignature, orderNotesByDate } = useNotes()

  const handleOrderNotesByAssignature = () => {
    orderNotesByAssignature()
    setIsOrder(false)
  }

  const handleOrderNotesByDate = () => {
    orderNotesByDate()
    setIsOrder(false)
  }

  return (
    <div className="relative w-50 ml-4">
      <button
        type="button"
        className="w-full py-1 rounded-xl text-white font-normal cursor-pointer bg-primary"
        onClick={() => setIsOrder(!isOrder)}
      >
        Ordenar por
      </button>

      {isOrder &&
        <ul className="absolute w-full mt-2 p-2 z-20 bg-primary text-white rounded-xl">
            <li
              className="px-3 py-1 hover:bg-white/20 rounded-xl cursor-pointer"
              onClick={handleOrderNotesByDate}
            >
              Por fecha
            </li>
            <li
              className="px-3 py-1 hover:bg-white/20 rounded-xl cursor-pointer"
              onClick={handleOrderNotesByAssignature}  
            >
              Por asignatura
            </li>
          </ul>
      }
    </div>
  )
}
