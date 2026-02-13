import { useEffect } from "react";
import NotesList from "../../components/NotesList";
import useAgendaModals from "../../hooks/useAgendaModals";
import useNoteStore from "../../store/useNoteStore";
import { useNotes } from "../../hooks/useNotes";
import AñadirNota from "../../components/AnadirNota";

export const Agenda = () => {
  const { notes } = useNoteStore(state => state)
  const { modal, openCreate, closeModal } = useAgendaModals()
  const { orderNotesByDate } = useNotes()

  useEffect(() => {
    orderNotesByDate()
    if (!notes) {
      console.log("Error fetching notes")
    }
  }, [])

  return (
    <div className="max-h-full py-10 flex flex-col items-center gap-16">
      <NotesList notes={notes} />

      {modal === null ?
        <button
          className="cursor-pointer w-48 h-12 text-lg bg-primary font-medium text-white rounded-full text-center"
          onClick={openCreate}
        >
          AÑADIR NOTA
        </button>

        :

        <AñadirNota closeModal={closeModal} />
      }
    </div>
  )
}
