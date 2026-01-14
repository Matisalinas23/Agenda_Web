import AñadirEditarNota from "../../components/AñadirEditarNota";
import NotesList from "../../components/NotesList";
import useAgendaModals from "../../hooks/useAgendaModals";
import useNoteStore from "../../store/useNoteStore";

export interface IFormValues {
  title: string,
  description: string,
  assignature: string,
  limitDate: string,
  color: string
}

export interface INote extends IFormValues {
  id: number;
  completed: boolean;
  textColor: string;
}

export const Agenda = () => {
  const { notes, addNote } = useNoteStore()
  const { modal, openCreate, closeModal } = useAgendaModals()

  const initialValues: IFormValues = {
    title: "",
    description: "",
    assignature: "",
    limitDate: "",
    color: ""
  }

  const handleCreate = (formValues: IFormValues) => {
    const darkColors = ["#E54444", "#F38A48", "#56EB83", "#5F62F2", "#AF78EA", "#E171E6", "#535353"];

    const newNote = {
      id: notes.length + 1,
      title: formValues.title,
      description: formValues.description,
      limitDate: formValues.limitDate,
      completed: false,
      assignature: formValues.assignature,
      color: formValues.color,
      textColor: darkColors.includes(formValues.color) ? "#ffffff" : "#222222",
    }

    addNote(newNote)
    closeModal()
  }

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
