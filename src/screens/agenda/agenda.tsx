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
  limitDate: Date | string,
  color: string
}

export interface INote extends IFormValues {
  id: number;
  createdAt: string
  textColor: string;
}

export const Agenda = () => {
  const { notes } = useNoteStore(state => state)
  const { modal, openCreate, closeModal } = useAgendaModals()
  const { getAllNotes, createNote } = useNotes()

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
    const isFetched = getAllNotes()
    if (!isFetched) {
      console.log("Error fetching notes")
    }
  }, [])

  return (
    <div className="flex flex-col items-center gap-24">
      <NotesList notes={notes} />

      {modal === null &&
        <button
          className="cursor-pointer w-48 h-12 text-xl bg-blue-900 text-white rounded-xl text-center"
          onClick={openCreate}
        >
          AÑADIR NOTA
        </button>
      }

      {modal === "create" && <AñadirEditarNota initialValues={initialValues} onSubmit={handleCreate} closeModal={closeModal} />}
    </div>
  )
}
