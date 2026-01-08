import { useEffect, useState } from "react";
import FormularioAñadirNota from "../../components/FormularioAñadirNota";
import Nota from "../../components/Nota";

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

export const Agenda = () => {
  const [notes, setNotes] = useState<INote[]>(() => {
    const saved = localStorage.getItem("notes");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  return (
    <div className="flex flex-col items-center gap-24">
      {notes.length === 0
        ? 'No hay agendas creadas'
        : <ul className="w-1/2">
            { notes.map((nota, index) => (<Nota key={index + 1} nota={nota} />)) }
        </ul>
      }

      <FormularioAñadirNota notes={notes} setNotes={setNotes} />
    </div>
  )
}
