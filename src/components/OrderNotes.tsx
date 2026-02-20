import { useRef, useState } from "react"
import { useNotes } from "../hooks/useNotes"
import useClickFuera from "../hooks/useClickFuera"
import { useAuth } from "../hooks/useAuth";

export default function OrderNotes() {
  const [isOrder, setIsOrder] = useState<boolean>(false);
  const { orderNotesByAssignature, orderNotesByDate } = useNotes();
  const componentRef = useRef<HTMLDivElement>(null);
  const { getDecodedId } = useAuth()
  const userId = getDecodedId()

  const handleOrderNotesByAssignature = () => {
    if (!userId) {
      console.log("User id is required")
      return
    }
    orderNotesByAssignature(userId)
    setIsOrder(false)
  }

  const handleOrderNotesByDate = () => {
    if (!userId) {
      console.log("User id is required")
      return
    }
    orderNotesByDate(userId)
    setIsOrder(false)
  }

  useClickFuera(componentRef, () => { setIsOrder(false) })

  return (
    <div className="relative w-50 ml-4" ref={componentRef}>
      <button
        type="button"
        className="w-full h-8 p-1 rounded-xl text-white font-normal cursor-pointer duration-200 shadow-lg bg-primary dark:bg-primary-dark"
        onClick={() => setIsOrder(!isOrder)}
      >
        Ordenar por
      </button>

      {isOrder &&
        <ul className="absolute w-full mt-2 p-2 z-20 text-white shadow-lg bg-primary dark:bg-primary-dark rounded-xl">
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
