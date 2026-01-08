import { useEffect, useState } from "react";
import FormularioAñadirNota from "../../components/FormularioAñadirNota";

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
        : <ul>
          {notes.map((nota, index) => (
            <li key={index + 1} className="p-4 mb-4 rounded-lg text-white flex gap-4" style={{ backgroundColor: nota.color, color: nota.textColor }}>
              <p>{index + 1}</p>
              <h2>{nota.title}</h2>
            </li>
          ))}
        </ul>
      }

      <FormularioAñadirNota notes={notes} setNotes={setNotes} />
    </div>
  )
}
