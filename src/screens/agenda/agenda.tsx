import { useEffect } from "react";
import AñadirEditarNota from "../../components/AñadirEditarNota";
import NotesList from "../../components/NotesList";
import useAgendaModals from "../../hooks/useAgendaModals";
import useNoteStore from "../../store/useNoteStore";
import { useNotes } from "../../hooks/useNotes";

export interface IFormValues {
  title: string,
  description: string,
  assignature: string,
  limitDate: string,
  color: string
}

export interface INote extends IFormValues {
  id: number;
  createdAt: string
  textColor: string;
}

export const Agenda = () => {
  const { orderedNotes } = useNoteStore(state => state)
  const { modal, openCreate, closeModal } = useAgendaModals()
  const { createNote, orderNotesByDate } = useNotes()

  const initialValues: IFormValues = {
    title: "",
    description: "",
    assignature: "",
    limitDate: "",
    color: ""
  }

  const handleCreate = async (formValues: IFormValues) => {
    const isCreated = await createNote(formValues)

    if (!isCreated) return

    closeModal()
  }

  useEffect(() => {
    orderNotesByDate()
    if (orderedNotes) {
      console.log("Error fetching notes")
    }
  }, [])

  return (
    <div className="max-h-full py-10 flex flex-col items-center gap-24">
      <NotesList notes={orderedNotes} />

      {modal === null &&
        <button
          className="cursor-pointer w-48 h-12 text-lg bg-primary font-medium text-white rounded-full text-center"
          onClick={openCreate}
        >
          AÑADIR NOTA
        </button>
      }

      {modal === "create" && 
        <div className="w-full h-full fixed inset-0 z-10 bg-black/50 flex flex-col items-center justify-center gap-12">
          <AñadirEditarNota initialValues={initialValues} onSubmit={handleCreate} closeModal={closeModal} />
        </div>
      }
    </div>
  )
}
