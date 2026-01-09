import { useEffect } from "react";
import Nota from "../../components/Nota";
import useNoteStore from "../../store/useNoteStore";
import AñadirEditarNota from "../../components/AñadirEditarNota";

export interface INote {
  id: number;
  title: string;
  description: string;
  limitDate: string;
  assignature: string;
  completed: boolean;
  color: string;
  textColor: string;
}

export interface IFormValues {
  title: string,
  description: string,
  assignature: string,
  limitDate: string,
  color: string
}

export const Agenda = () => {
  const { notes, addNote, setNotes } = useNoteStore(state => state);
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
  }

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  return (
    <div className="flex flex-col items-center gap-24">
      {notes.length === 0
        ? 'No hay agendas creadas'
        : <ul className="w-1/2">
            { notes.map((note, index) => (<Nota key={index + 1} note={note}/>)) }
        </ul>
      }

      <AñadirEditarNota initialValues={initialValues} onSubmit={handleCreate} />
    </div>
  )
}
